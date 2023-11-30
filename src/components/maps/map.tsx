
import {NextPage} from "next";
import {useState, Suspense} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {FlyToInterpolator} from "@deck.gl/core/typed";
import {Map} from "react-map-gl";
import * as d3 from 'd3';
import 'd3-scale-chromatic';

import Control from '@/components/maps/control'

import { ViewState, CityDataProps } from "@/data/interfaces";

import type { InitOutput } from '@/../pkg/uamutations.d.ts';
import { initSync } from '@/../pkg/uamutations.js';
import { uamutate } from '@/../pkg/uamutations_bg.wasm';

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

interface MapProps {
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    alpha: number,
    viewState: ViewState,
    citiesArray: CityDataProps[],
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void,
    handleLayerChange: (layer: string) => void
    handleLayer2Change: (layer2: string) => void
}


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

    // dummy extra vars for mutation algorithm #49:
    const mapPath_source = "/data/berlin/dataraw.json";
    const mapPath_target = "/data/paris/dataraw.json";
    const extra_var = "social_index";
    const varsall = ["bike_index", extra_var].join(" ");
    const nentries = 1000;

    let wasmModule: InitOutput;

    fetch('../../../pkg/uamutations_bg.wasm')
      .then(response => response.arrayBuffer())
      .then(bytes => {
        const wasmBinary = new Uint8Array(bytes);
        wasmModule = initSync(wasmBinary);

        const textEncoder = new TextEncoder();
        const encodedString1 = textEncoder.encode(varsall);
        const ptr1: number = (wasmModule as any).__wbindgen_malloc(encodedString1.length);
        const memory1 = new Uint8Array(wasmModule.memory.buffer);
        memory1.set(encodedString1, ptr1);

        return Promise.all([
          fetch(mapPath).then(response => response.json()),
          fetch(mapPath_target).then(response => response.json()),
          Promise.resolve({ ptr1, encodedString1 })
        ]);
      })
      .then(([data1, data2, { ptr1, encodedString1 }]) => {
        const result = wasmModule.uamutate(data1, data2, ptr1, encodedString1.length, nentries);
      })
      .catch(error => console.error('Error:', error));

    const layers = [
        new GeoJsonLayer({
            id: 'polygon-layer',
            data: mapPath,
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
