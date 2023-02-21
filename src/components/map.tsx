
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {FlyToInterpolator} from "@deck.gl/core/typed";
import {Map} from "react-map-gl";
import Control from '@/components/control'

import {paletteInferno} from "@/components/palettes"
import { MapProps } from "@/components/interfaces";

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

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
    } else if (this_layer == "transport_abs") {
        layer_min = props.citiesArray[props.idx].dataRanges.transport_abs[0];
        layer_max = props.citiesArray[props.idx].dataRanges.transport_abs[1];
    } else if (this_layer == "transport_rel") {
        layer_min = props.citiesArray[props.idx].dataRanges.transport_rel[0];
        layer_max = props.citiesArray[props.idx].dataRanges.transport_rel[1];
    } else if (this_layer == "uta_abs") {
        layer_min = props.citiesArray[props.idx].dataRanges.uta_abs[0];
        layer_max = props.citiesArray[props.idx].dataRanges.uta_abs[1];
    } else if (this_layer == "uta_rel") {
        layer_min = props.citiesArray[props.idx].dataRanges.uta_rel[0];
        layer_max = props.citiesArray[props.idx].dataRanges.uta_rel[1];
    }
    //console.log("In MAP: layer = " + this_layer + " [" + layer_min + ", " + layer_max + "]")

    const layers = [
        new GeoJsonLayer({
            id: 'polygon-layer',
            data: mapPath,
            filled: true,
            stroked: true,
            getLineWidth: 10,
            getLineColor: [122, 122, 122],
            getFillColor: d => {
                const layer_val = Math.floor (100 * (d.properties?.[this_layer] - layer_min) / (layer_max - layer_min));
                const val = Math.max (0, Math.min (100, layer_val));
                const red = paletteInferno.red [val]
                const blue = paletteInferno.blue [val]
                const green = paletteInferno.green [val]
                return [red, blue, green, 150]
                },
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
