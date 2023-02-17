
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
    console.log("In MAP: layer = " + this_layer)

    const layers = [
        new GeoJsonLayer({
            id: 'polygon-layer',
            data: mapPath,
            filled: true,
            stroked: true,
            getLineWidth: 10,
            getLineColor: [122, 122, 122],
            getFillColor: d => {
                const rand = Math.floor (100 * d.properties?.[this_layer] / 6)
                const red = paletteInferno.red [rand]
                const blue = paletteInferno.blue [rand]
                const green = paletteInferno.green [rand]
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
