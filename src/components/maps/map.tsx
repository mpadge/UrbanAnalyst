
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {FlyToInterpolator} from "@deck.gl/core/typed";
import {Map} from "react-map-gl";
import * as d3 from 'd3';
import 'd3-scale-chromatic';

import Control from '@/components/maps/control'

import { ViewState, CityDataProps } from "@/data/interfaces";

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

interface MapProps {
    idx: number,
    layer: string,
    alpha: number,
    viewState: ViewState,
    citiesArray: CityDataProps[],
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void,
    handleLayerChange: (layer: string) => void
}


export default function UTAMap (props: MapProps) {

    const mapPath = props.citiesArray[props.idx].path;
    const [viewState, setViewState] = useState({
        ...props.viewState,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
    });

    const this_layer: string = props.layer;
    var layer_min: number = 0;
    var layer_max: number = 100;
    if (this_layer == "social_index") {
        layer_min = props.citiesArray[props.idx].dataRanges.social_index[0];
        layer_max = props.citiesArray[props.idx].dataRanges.social_index[1];
    } else if (this_layer == "times_abs") {
        layer_min = props.citiesArray[props.idx].dataRanges.times_abs[0];
        layer_max = props.citiesArray[props.idx].dataRanges.times_abs[1];
    } else if (this_layer == "times_rel") {
        layer_min = props.citiesArray[props.idx].dataRanges.times_rel[0];
        layer_max = props.citiesArray[props.idx].dataRanges.times_rel[1];
    } else if (this_layer == "transfers") {
        layer_min = props.citiesArray[props.idx].dataRanges.transfers[0];
        layer_max = props.citiesArray[props.idx].dataRanges.transfers[1];
    } else if (this_layer == "intervals") {
        layer_min = props.citiesArray[props.idx].dataRanges.intervals[0];
        layer_max = props.citiesArray[props.idx].dataRanges.intervals[1];
    } else if (this_layer == "transport") {
        layer_min = props.citiesArray[props.idx].dataRanges.transport[0];
        layer_max = props.citiesArray[props.idx].dataRanges.transport[1];
    } else if (this_layer == "popdens") {
        layer_min = props.citiesArray[props.idx].dataRanges.popdens[0];
        layer_max = props.citiesArray[props.idx].dataRanges.popdens[1];
    } else if (this_layer == "school_dist") {
        layer_min = props.citiesArray[props.idx].dataRanges.school_dist[0];
        layer_max = props.citiesArray[props.idx].dataRanges.school_dist[1];
    } else if (this_layer == "bike_index") {
        layer_min = props.citiesArray[props.idx].dataRanges.bike_index[0];
        layer_max = props.citiesArray[props.idx].dataRanges.bike_index[1];
    } else if (this_layer == "natural") {
        layer_min = props.citiesArray[props.idx].dataRanges.natural[0];
        layer_max = props.citiesArray[props.idx].dataRanges.natural[1];
    } else if (this_layer == "parking") {
        layer_min = props.citiesArray[props.idx].dataRanges.parking[0];
        layer_max = props.citiesArray[props.idx].dataRanges.parking[1];
    }

    // palettes:
    // https://github.com/d3/d3-scale-chromatic
    var Color = d3.scaleSequential().domain([ layer_min, layer_max ])
        //.interpolator(d3.interpolateMagma)
        //.interpolator(d3.interpolateCividis)
        .interpolator(d3.interpolateViridis)

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
        )}
        </>
        )
};
