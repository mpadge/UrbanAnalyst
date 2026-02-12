import { useEffect, useState, Suspense } from "react";
import { DeckGL } from "@deck.gl/react/typed";
import { Map } from "react-map-gl";

import mapLayer from '@/components/map/mapLayer'

import { MapProps } from "@/components/map/mapPage";

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

/**
 * Map function to load DeckGL overlap and base map.
 *
 * The only state variable constructed here is `layer`, which is necessary
 * because this is returned from the `mapLayer` function defined in
 * `mapLayer.tsx`. That function must first be called to obtain the layer before
 * passing to final DOM elements in return body of this function.
 */
export default function UTAMap(props: MapProps): JSX.Element {

    const this_layer = mapLayer(props);
    const [layer, setLayer] = useState(this_layer);
    useEffect(() => {
        setLayer(mapLayer(props));
    }, [props]);


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
