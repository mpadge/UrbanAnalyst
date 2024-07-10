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
    const { layer, varnames, outputLayer, handleCalculateChange } = props;
    useMemo(() => {
        const uniqueVarNames = Object.keys(
            varnames.reduce((acc: StringAcc, name) => {
                acc[name] = true;
                return acc;
            }, {})
        ).sort();
        const filteredVarNames = varnames.filter(name => name!== layer);
        const varnamesArr: string[] = [layer, ...filteredVarNames];
        transformDataFunction(data1, data2, varnamesArr, outputLayer, setResult);
        handleCalculateChange(false);
    }, [data1, data2, layer, varnames, outputLayer, setResult, handleCalculateChange]);

    // Effect to load map data for source city, and replace specified column
    // with 'result' from previous effect:
    const { handleStoreGeoJsonResultChange } = props;
    useMemo(() => {
        if (result) {
            fetch(mapPathSource)
                .then(response => response.json())
                .then(data => {
                    data.features.forEach((feature: any, index: number) => {
                        if (result) { // needed here because 'result' can still be null
                            feature.properties[layer] = result[index];
                        }
                    });
                    setGeoJSONcontent(data);
                })
                .catch((error) => console.error('Error:', error));
            handleStoreGeoJsonResultChange(false);
        }
    }, [mapPathSource, result, layer, handleStoreGeoJsonResultChange]);

    const { handleLayerRangeChange, handleStoreRangeLimitsChange } = props;
    useMemo(() => {
        if (geoJSONcontent) {
            const rangeLimits = getRangeLimits(geoJSONcontent, layer);
            handleLayerRangeChange(rangeLimits);
            handleStoreRangeLimitsChange(false)
        }
    }, [layer, geoJSONcontent, handleLayerRangeChange, handleStoreRangeLimitsChange]);

    const { layerMin, layerMax, alpha } = props;
    useMemo(() => {
        if (geoJSONcontent) {
            getGeoJsonLayer(geoJSONcontent, [layerMin, layerMax], layer, alpha, setGeoJsonLayer);
        }
    }, [layerMin, layerMax, layer, alpha, geoJSONcontent]);

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
