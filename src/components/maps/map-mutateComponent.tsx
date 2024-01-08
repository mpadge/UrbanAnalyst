import { useEffect, useState} from 'react';
import * as d3 from 'd3';
import 'd3-scale-chromatic';
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { DeckGL } from "@deck.gl/react/typed";
import { Map } from "react-map-gl";

import * as wasm_js from '@/../pkg/uamutations.js';
import styles from '@/styles/maps.module.css';
import { ViewState, CityDataProps } from "@/data/interfaces";

interface MutateProps {
    idx: number
    varnames: string[]
    nentries: number
    mapPath: string
    citiesArray: CityDataProps[]
    viewState: ViewState
    alpha: number
    layerMin: number
    layerMax: number
    handleLayerMinChange: (layerMin: number) => void
    handleLayerMaxChange: (layerMin: number) => void
}

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

// Function used to extract size of JSON object returned from WASM calls. this
// is always a simple length = first of the two options, and is used just to
// assert that that length matches value expected from map data.
const JSONObjectSize = (obj: any) => {
    let numItems: number = 0;
    if (Array.isArray(obj)) {
        numItems = obj.length;
    } else if (typeof obj === 'object' && obj !== null) {
        numItems = Object.keys(obj).length;
    }
    return numItems;
}

const MapMutateComponent = (props: MutateProps) => {
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);

    const [result, setResult] = useState<number[] | null>(null);
    const [geoJSONcontent, setGeoJSONcontent] = useState<any>(null)
    const [layer, setLayer] = useState<any>(null)

    const mapPath1 = props.citiesArray[props.idx].path.replace("data\.json", "dataraw.json");
    const mapPath2 = mapPath1.replace(/(\/[^\/]*\/)[^\/]*(\/.*)/, "$1paris$2");

    // Effect to load 'dataraw' point-based data for source and target cities,
    // and store as 'data1', 'data2':
    useEffect(() => {
        const loadData = async () => {
            const response1 = await fetch(mapPath1);
            const json1 = await response1.json();
            setData1(json1);

            const response2 = await fetch(mapPath2);
            const json2 = await response2.json();
            setData2(json2);
        };

        loadData();
        }, [mapPath1, mapPath2]);


    // Effect to pass 'data1', 'data2' to WASM mutation algorithm, and return
    // vector of aggregaed mean differences in each polygon of source city.
    useEffect(() => {
        fetch('@/../pkg/uamutations_bg.wasm')
        .then(response => {
            return response.arrayBuffer();
            })
        .then(bytes => {
            if (data1 && data2) {
                const wasm_binary = wasm_js.initSync(bytes);
                const varname = props.varnames.join(",");
                const data1js = JSON.stringify(data1);
                const data2js = JSON.stringify(data2);
                const resultJson = wasm_js.uamutate(data1js, data2js, varname, props.nentries);
                const resultObj = JSON.parse(resultJson);

                const numItems = JSONObjectSize(resultObj);

                setResult(resultObj);
            }
            })
        .catch(error => {
            console.error('Error fetching wasm module:', error);
            });
        }, [data1, data2, props.varnames, props.nentries]);

    // Effect to load map data for source city, and replace specified column
    // with 'result' from previous effect:
    useEffect(() => {
        fetch(props.mapPath)
        .then(response => response.json())
        .then(data => {
            data.features.forEach((feature: any, index: number) => {
                if (result) {
                    feature.properties.column_to_replace = result[index];
                }
            });
            setGeoJSONcontent(data);
        })
        .catch((error) => console.error('Error:', error));
    }, [result, props.mapPath]);

    // Effect to get min + max values of 'result' and store as 'layerMin',
    // 'layerMax':
    const { handleLayerMinChange, handleLayerMaxChange } = props;
    useEffect(() => {
        const min = Math.min(...result);
        const max = Math.max(...result);
        handleLayerMinChange(min);
        handleLayerMaxChange(max);
    }, [result, handleLayerMinChange, handleLayerMaxChange]);

    const varname = props.varnames[0];

    useEffect(() => {
        let Color = d3
            .scaleSequential()
            .domain([props.layerMin, props.layerMax])
            .interpolator(d3.interpolateViridis);

        const this_layer = [
            new GeoJsonLayer({
                id: 'polygon-layer',
                data: geoJSONcontent,
                filled: true,
                stroked: true,
                getLineWidth: 10,
                getLineColor: [122, 122, 122],
                getFillColor: d => {
                    var layerval = Math.max (props.layerMin, Math.min (props.layerMax, d.properties?.[varname]));
                    if (isNaN(layerval)) {
                        layerval = props.layerMin;
                    }
                    // Invert the palette:
                    layerval = props.layerMin + (props.layerMax - layerval);
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
                    getFillColor: [varname]
                }
                })
            ]

        setLayer(this_layer)
    }, [props.layerMin, props.layerMax, varname, props.alpha, geoJSONcontent]);

    return (
        <>
        <DeckGL
            width={"100vw"}
            height={"100vh"}
            controller={true}
            layers={layer}
            initialViewState={props.viewState}
        >
        <Map
            mapStyle={MAP_STYLE}
            mapboxAccessToken={MapboxAccessToken}
        >
        </Map>
        </DeckGL>
        </>
    )
}

export default MapMutateComponent;
