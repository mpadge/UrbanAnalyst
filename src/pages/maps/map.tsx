
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {Map} from "react-map-gl";
import Control from './control'

import {paletteInferno} from "./palettes.tsx"

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

const data = require('../../data/berlin.json')

export default function UTAMap () {

    const data = require('../../data/berlin.json')

    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 52.5,
        longitude: 13.4,
        zoom: 10
    });

    const layers = [
        new GeoJsonLayer({
            id: 'polygon-layer',
            data,
            filled: true,
            stroked: true,
            getLineWidth: 10,
            getLineColor: [122, 122, 122],
            getFillColor: d => {
                const rand = Math.floor (100 * d.properties.var / 6)
                const red = paletteInferno.red [rand]
                const blue = paletteInferno.blue [rand]
                const green = paletteInferno.green [rand]
                return [red, blue, green, 150]
                }
            })
        ]

    // console.log("TOKEN = " + MapboxAccessToken)

    return (
        <>
        {(
        <DeckGL
            width={"100vw"}
            height={"100vh"}
            controller={true}
            layers={layers}
            viewState={viewport}
            onViewStateChange={(viewState) => setViewport(viewState.viewState)}
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
