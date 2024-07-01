import { NextPage } from "next";
import { useState, Suspense } from "react";
import { DeckGL } from "@deck.gl/react/typed";
import { Map } from "react-map-gl";

import mapLayer from '@/components/map/mapLayer'

import { ViewState, CityDataProps } from "@/data/interfaces";

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

export interface MapProps {
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    alpha: number,
    layerRange: number[],
    layerStartStop: number[],
    viewState: ViewState,
    citiesArray: CityDataProps[],
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void,
    handleLayerChange: (layer: string) => void
    handleLayer2Change: (layer2: string) => void
    handleLayerRangeChange: (layerRange: number[]) => void,
}

export default function UTAMap (props: MapProps) {

    const layer = mapLayer(props);

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
