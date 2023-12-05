import { NextPage } from "next";
import { useEffect, useState, Suspense } from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { DeckGL } from "@deck.gl/react/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import { Map } from "react-map-gl";
import * as d3 from 'd3';
import 'd3-scale-chromatic';
import dynamic from 'next/dynamic'

import * as wasm_js from '@/../pkg/uamutations.js';
import Control from '@/components/maps/control'

import { ViewState, CityDataProps } from "@/data/interfaces";

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

interface MapProps {
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    alpha: number,
    citiesArray: CityDataProps[],
    viewState: ViewState,
    mutate: boolean,
    mutateTargetCity: string | null,
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void,
    handleLayerChange: (layer: string) => void
    handleLayer2Change: (layer2: string) => void
    handleMutateChange: (mutate: boolean) => void
    handleMutateTargetCityChange: (mutateTargetCity: string) => void
}

interface MutateProps {
    filename1: string
    filename2: string
    varnames: string[]
    nentries: number
    bindgenResult: Object | null
    handleResultChange: (Object: any) => void
}

const CalcMutation = dynamic({
    loader: async () => {
        const Component = ({ filename1, filename2, varnames, nentries, bindgenResult, handleResultChange }: MutateProps) => {
            const [data1, setData1] = useState(null);
            const [data2, setData2] = useState(null);

            useEffect(() => {
                const loadData = async () => {
                    const response1 = await fetch(filename1);
                    const json1 = await response1.json();
                    setData1(json1);

                    const response2 = await fetch(filename2);
                    const json2 = await response2.json();
                    setData2(json2);
                };

                loadData();
                }, [filename1, filename2]);

            useEffect(() => {
                fetch('@/../pkg/uamutations_bg.wasm')
                .then(response => {
                    return response.arrayBuffer();
                    })
                .then(bytes => {
                    if (data1 && data2) {
                        const wasm_binary = wasm_js.initSync(bytes);
                        const varname = varnames.join(",");
                        const resultJson = wasm_js.uamutate(JSON.stringify(data1), JSON.stringify(data2), varname, nentries);
                        const resultObj = JSON.parse(resultJson);
                        handleResultChange(resultObj);
                    }
                    })
                .catch(error => {
                    console.error('Error fetching wasm module:', error);
                    });
                }, [data1, data2, varnames, nentries, bindgenResult, handleResultChange]);

            return <div></div>
        }

        return Component
    },
    ssr: false
});

export default function UTAMap (props: MapProps) {

    const mapPath1 = props.citiesArray[props.idx].path;
    const mapPath2 = mapPath1.replace("data\.json", "data2.json");

    const [viewState, setViewState] = useState({
        ...props.viewState,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
    });

    const layer1: string = props.layer.replace("\_", "").replace("index", "");
    const layer2: string = props.layer2.replace("\_", "").replace("index", "");
    const paired_keys = Object.keys(props.citiesArray[props.idx].dataRangesPaired);

    const these_layers =
        paired_keys.includes(layer1 + "_" + layer2) ?
        layer1 + "_" + layer2 : layer2 + "_" + layer1;
    const dual_layers: boolean = paired_keys.includes(these_layers);

    const this_layer: string = props.numLayers == "Paired" && dual_layers ?
        these_layers : props.layer;

    const layer_min = props.numLayers == "Paired" && dual_layers ?
            props.citiesArray[props.idx].dataRangesPaired[these_layers as string][0] :
        props.citiesArray[props.idx].dataRanges[this_layer as string][0];
    const layer_max = props.numLayers == "Paired" && dual_layers ?
            props.citiesArray[props.idx].dataRangesPaired[these_layers as string][1] :
        props.citiesArray[props.idx].dataRanges[this_layer as string][1];

    // palettes:
    // https://github.com/d3/d3-scale-chromatic
    var Color = d3.scaleSequential().domain([ layer_min, layer_max ])
        //.interpolator(d3.interpolateMagma)
        //.interpolator(d3.interpolateCividis)
        .interpolator(d3.interpolateViridis)

    const mapPath: string = props.numLayers == "Paired" && dual_layers ? mapPath2 : mapPath1;

    const [geoJSONcontent, setGeoJSONcontent] = useState<any>(null);
    useEffect(() => {
        fetch(mapPath)
            .then(response => response.json())
            .then(data => {
                    setGeoJSONcontent(data);
                    })
            .catch((error) => console.error('Error:', error));
        }, [mapPath]);

    const [mutationResult, setMutationResult] = useState<any>(null);
    useEffect(() => {
        if (mutationResult) {
            setGeoJSONcontent(mutationResult);
        }
    }, [mutationResult]);


    const layers = [
        new GeoJsonLayer({
            id: 'polygon-layer',
            data: geoJSONcontent,
            filled: true,
            stroked: true,
            getLineWidth: 10,
            getLineColor: [122, 122, 122],
            getFillColor: d => {
                var layerval = Math.max (layer_min, Math.min (layer_max, d.properties?.[this_layer]));
                if (isNaN(layerval)) {
                    layerval = layer_min;
                }
                // Invert the palette:
                layerval = layer_min + (layer_max - layerval);
                const layerarr: any = d3.color(Color(layerval));
                var red = 0, green = 0, blue = 0;
                if (layerarr) {
                    red = layerarr.r;
                    green = layerarr.g;
                    blue = layerarr.b;
                }
                return [red, green, blue]
                },
            opacity: 1 - props.alpha,
            updateTriggers: {
                getFillColor: [this_layer]
            }
            })
        ]

    return (
        <>
        {(
        <Suspense fallback={<p>Loading map ...</p>}>

        <DeckGL
            width={"100vw"}
            height={"100vh"}
            controller={true}
            layers={layers}
            initialViewState={props.viewState}
            // onViewStateChange={(viewState) => setViewState(viewState)}
            // onViewStateChange={props.handleViewStateChange}
        >
        <Map
            mapStyle={MAP_STYLE}
            mapboxAccessToken={MapboxAccessToken}
        >
        </Map>
        </DeckGL>
        </Suspense>
        )}
        </>
        )
};
