import { NextPage } from "next";
import { useState, Suspense } from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import * as d3 from 'd3';
import 'd3-scale-chromatic';

import { ViewState, CityDataProps } from "@/data/interfaces";

interface MapProps {
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    alpha: number,
    layerMin: number,
    layerMax: number,
    viewState: ViewState,
    citiesArray: CityDataProps[],
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void,
    handleLayerChange: (layer: string) => void
    handleLayer2Change: (layer2: string) => void
    handleLayerMinChange: (layerMin: number) => void,
    handleLayerMaxChange: (layerMax: number) => void,
}


export default function UTAMapLayer (props: MapProps) {

    const mapPath1 = props.citiesArray[props.idx].path;
    const mapPath2 = mapPath1.replace("data\.json", "data2.json");

    const [viewState, setViewState] = useState({
        ...props.viewState,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
    });

    // This code also repeated in mapPage.tsx to calculate [layerMin, layerMax] props.
    const layer1: string = props.layer.replace("\_", "").replace("index", "");
    const layer2: string = props.layer2.replace("\_", "").replace("index", "");
    const paired_keys = Object.keys(props.citiesArray[props.idx].dataRangesPaired);

    const these_layers =
        paired_keys.includes(layer1 + "_" + layer2) ?
            layer1 + "_" + layer2 : layer2 + "_" + layer1;
    const dual_layers: boolean = paired_keys.includes(these_layers);

    const this_layer: string = props.numLayers == "Paired" && dual_layers ?
        these_layers : props.layer;

    // palettes:
    // https://github.com/d3/d3-scale-chromatic
    var Color = d3.scaleSequential().domain([ props.layerMin, props.layerMax ])
    //.interpolator(d3.interpolateMagma)
    //.interpolator(d3.interpolateCividis)
    .interpolator(d3.interpolateViridis)

    const mapPath: string = props.numLayers == "Paired" && dual_layers ? mapPath2 : mapPath1;

    const layers = [
        new GeoJsonLayer({
            id: 'polygon-layer',
            data: mapPath,
            filled: true,
            stroked: true,
            getLineWidth: 10,
            getLineColor: [122, 122, 122],
            getFillColor: d => {
                var layerval = Math.max (props.layerMin, Math.min (props.layerMax, d.properties?.[this_layer]));
                const layerIsNaN = isNaN(layerval)
                if (layerIsNaN) {
                    layerval = props.layerMin;
                }
                // Invert the palette:
                layerval = props.layerMin + (props.layerMax - layerval);
                const layerarr: any = d3.color(Color(layerval));
                var red = 0, green = 0, blue = 0;
                const layerAlpha = layerIsNaN ? 0 : 255;
                if (layerarr) {
                    red = layerarr.r;
                    green = layerarr.g;
                    blue = layerarr.b;
                }
                return [red, green, blue, layerAlpha]
            },
            opacity: 1 - props.alpha,
            updateTriggers: {
                getFillColor: [this_layer]
            }
        })
    ]

    return layers
};
