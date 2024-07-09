import { useMemo, useEffect, useState} from 'react';
import { DeckGL } from "@deck.gl/react/typed";
import { Map } from "react-map-gl";

import { ViewState } from "@/data/interfaces";
import { loadDataFunction } from '@/components/transform/loadData';
import { transformDataFunction } from '@/components/transform/callTransform';
import { getGeoJsonLayer } from '@/components/transform/geoJsonLayer';
import { getRangeLimits } from '@/components/utils/trimRange';
import { TransformProps } from '@/components/transform/transformPage';

interface StringAcc {
    [key: string]: boolean;
}

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

const TransformComponent = (props: TransformProps) => {
    // -------- state variables --------
    const [mapPathSource, setMapPathSource] = useState<string>("");
    const [data1, setData1] = useState<number | null>(null);
    const [data2, setData2] = useState<number | null>(null);
    const [result, setResult] = useState<number[] | null>(null);
    const [geoJSONcontent, setGeoJSONcontent] = useState<any>(null)
    const [geoJsonLayer, setGeoJsonLayer] = useState<any>(null)

    useEffect(() => {
        const mapPathSource = "/data/" + props.city + "/data.json";
        setMapPathSource(mapPathSource);
    }, [props.city]);

    // Effect to load 'dataraw' point-based data for source and target cities.
    useEffect(() => {
        loadDataFunction(props.city, setData1);
    }, [props.city, setData1]);
    useEffect(() => {
        loadDataFunction(props.targetCity, setData2);
    }, [props.targetCity, setData2]);

    // Effect to pass 'data1', 'data2' to WASM mutation algorithm, and return
    // vector of aggregaed mean differences in each polygon of source city. This
    // vector is stored in the column of 'result' corresponding to
    // 'varnames[0]'.
    const { handleCalculateChange } = props;
    useMemo(() => {
        const uniqueVarNames = Object.keys(
            props.varnames.reduce((acc: StringAcc, name) => {
                acc[name] = true;
                return acc;
            }, {})
        ).sort();
        const filteredVarNames = props.varnames.filter(name => name!== props.layer);
        const varnames: string[] = [props.layer, ...filteredVarNames];
        transformDataFunction(data1, data2, varnames, props.outputLayer, setResult);
        handleCalculateChange(false);
    }, [data1, data2, props.layer, props.varnames, props.outputLayer, setResult, handleCalculateChange]);

    // Effect to load map data for source city, and replace specified column
    // with 'result' from previous effect:
    useMemo(() => {
        if (result) {
            fetch(mapPathSource)
                .then(response => response.json())
                .then(data => {
                    data.features.forEach((feature: any, index: number) => {
                        if (result) { // needed here because 'result' can still be null
                            feature.properties[props.layer] = result[index];
                        }
                    });
                    setGeoJSONcontent(data);
                })
                .catch((error) => console.error('Error:', error));
        }
    }, [mapPathSource, result, props.layer]);

    const { handleLayerRangeChange } = props;
    useMemo(() => {
        if (result) {
            const rangeLimits = getRangeLimits(geoJSONcontent, props.layer);
            handleLayerRangeChange(rangeLimits);
        }
    }, [result, props.layer, geoJSONcontent, handleLayerRangeChange]);

    useMemo(() => {
        getGeoJsonLayer(geoJSONcontent, [props.layerMin, props.layerMax], props.layer, props.alpha, setGeoJsonLayer);
    }, [props.layerMin, props.layerMax, props.layer, props.alpha, geoJSONcontent]);

    return (
        <>
            <DeckGL
                width={"100vw"}
                height={"100vh"}
                controller={true}
                layers={geoJsonLayer}
                initialViewState={props.viewState}
            >
                <Map
                    mapStyle={MAP_STYLE}
                    mapboxAccessToken={MapboxAccessToken}
                >
                </Map>
            </DeckGL>
        </>
    )
}

export default TransformComponent;
