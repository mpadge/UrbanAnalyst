
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {Map} from "react-map-gl";
import Control from '@/components/control'

import {paletteInferno} from "@/components/palettes"
import { MapProps } from "@/components/interfaces";

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

export default function UTAMap (props: MapProps) {

    const mapPath = props.citiesArray[props.idx].path;
    const [viewport, setViewport] = useState(props.viewport);

    console.log('UTAMap: idx = ' + props.idx)
    console.log('UTAMap: path = ' + mapPath)
    // console.log('initialViewport lon = ' + initialViewport.longitude)
    console.log('In Map: viewport lon = ' + viewport.longitude)
    console.log('In Map: props.viewport lon = ' + props.viewport.longitude)

    // const handleViewportChange = (pViewport: any) => {
    //     setViewport((prevViewport) => { return { ...prevViewport, ...pViewport }; });
    // }

    const layers = [
        new GeoJsonLayer({
            id: 'polygon-layer',
            data: mapPath,
            filled: true,
            stroked: true,
            getLineWidth: 10,
            getLineColor: [122, 122, 122],
            getFillColor: d => {
                const rand = Math.floor (100 * d.properties?.social_index / 6)
                const red = paletteInferno.red [rand]
                const blue = paletteInferno.blue [rand]
                const green = paletteInferno.green [rand]
                return [red, blue, green, 150]
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
            initialViewState={props.viewport}
            onViewStateChange={(viewState) => setViewport(viewState.viewState)}
            onViewportChange={props.handleViewportChange}
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