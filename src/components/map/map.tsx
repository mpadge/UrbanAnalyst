import { NextPage } from "next";
import { useEffect, useState, Suspense } from "react";
import { DeckGL } from "@deck.gl/react/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import { Map } from "react-map-gl";

import mapLayer from '@/components/map/mapLayer'

import { ViewState, CityDataProps } from "@/data/interfaces";
import { MapProps } from "@/components/map/mapPage";

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

export default function UTAMap (props: MapProps) {

    const this_layer = mapLayer(props);
    const [layer, setLayer] = useState(this_layer);
    useEffect(() => {
        const this_layer = mapLayer(props);
        setLayer(mapLayer(props));
    }, [props]);

    const [viewState, setViewState] = useState({
        ...props.viewState,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
    });


    return (
        <>
            {(
                <Suspense fallback={<p>Loading map ...</p>}>

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
                </Suspense>
            )}
        </>
    )
};
