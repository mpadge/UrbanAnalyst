import { useMemo, useEffect, useRef, useState} from 'react';
import { DeckGL } from "@deck.gl/react/typed";
import { Map } from "react-map-gl";

import { ViewState } from "@/data/interfaces";
import { loadDataFunction } from '@/components/transform/loadData';
import { transformDataFunction, transformDataSelectCol } from '@/components/transform/callTransform';
import { getGeoJsonLayer } from '@/components/transform/geoJsonLayer';
import { getRangeLimits } from '@/components/utils/trimRange';
import { TransformProps } from '@/components/transform/transformPage';

interface StringAcc {
    [key: string]: boolean;
}

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

/**
 * The main component controlling the transformation algorithm and storing the data.
 *
 * This function pre-generates all data needed to diplay as final
 * `DeckGL` map, and ultimately passes everything through to `setGeoJsonLayer`
 * to set those data as React state variable, `geoJsonLayer`.
 *
 * The following state variables and setter-functions are used here:
 * - `mapPathSource`: Internal path to the map data for specified city, held
 *   within the `./public/data` directory.
 * - `data1`: Raw point data for source city (fetched from private GitHub
 *   repo). These, and `data2`, are the primary input to the transformation
 *   algorithm.
 * - `data2`: Raw point data for target city.
 * - `transformDataAll`: The direct result of the WASM transformation
 *   algorithm, stored as an array of four columns, for (original, transformed,
 *   absolute, and relative) values.
 * - `transformDataOneCol`: The single column of `transformDataAll` selected by
 *   the input prop, `outputLayer`.
 * - `geoJSONcontent`: The raw geoJSON data dervied by binding
 *   `transformDataOneCol` to the geoJSON data.
 * - `geoJsonLayer`:  The final and full layer passed directly to `DeckGL`.
 *
 *  The function uses the following effects, listed along with corresponding
 *  `props` which trigger effects. Props passed through to main function as
 *  part of `TransformProps` are prefixed with `props.<Name>`.
 *
 *  1. Set the path to the internal (`./public`) source of the city-specific data.
 *      - props: `city`
 *  2. Load data for the main city (from external, private GitHub repo).
 *      - props: `city`, `setData1`.
 *  3. Load data for the target city.
 *      - props: `targetCity`, `setData2`.
 *  4. The "main" Effect to call `transformDataFunction`.
 *      - props: `data1`, `data2`, `layer`, `varnames`, `handleCalculateChange`.
 *  5. Effect to select `outputLayer` column of transform data to be used in
 *     map.
 *      - props: `outputLayer`, `transformDataAll`, `setTransformDataOneCol`.
 *  6. Effect to load geoJSON data, append `trasformDataOneCol`, and store
 *     result.
 *      - props: `mapPathSource`, `transformDataOneCol`, `props.layer`,
 *      `handleStoreGeoJsonResultChange`.
 *  7. Effect to calculate range limits to be plotted.
 *      - props: `props.layer`, `geoJSONcontent`, `handleLayerRangeChange`
 *  8. Effect to get and store the final geoJSON layer to be passed to
 *     `DeckGL`.
 *      - props: `props.layerMin`, `props.layerMax`, `props.layer`,
 *      `props.alpha`, `geoJSONcontent`
 *
 * @param props - the props defined in {@link TransformProps}.
 * @return The rendered `DeckGL` page using data from `geoJsonLayer`, and underlying base map.
 *
 */
const TransformComponent = (props: TransformProps) => {
    /**
     * -------- state variables --------
     */
    const [mapPathSource, setMapPathSource] = useState<string>("");
    const [data1, setData1] = useState<number | null>(null);
    const [data2, setData2] = useState<number | null>(null);
    const [transformDataAll, setTransformDataAll] = useState<Array<any> | null>(null);
    const [transformDataOneCol, setTransformDataOneCol] = useState<number[] | null>(null);
    const [geoJSONcontent, setGeoJSONcontent] = useState<any>(null)
    const [geoJsonLayer, setGeoJsonLayer] = useState<any>(null)

    useEffect(() => {
        const mapPathSource = "/data/" + props.city + "/data.json";
        setMapPathSource(mapPathSource);
    }, [props.city]);

    /**
     * Effect to load 'dataraw' point-based data for source and target cities.
     */
    const initialLoadData1 = useRef(false);
    useEffect(() => {
        if (!initialLoadData1.current) {
            loadDataFunction(props.city, setData1);
            initialLoadData1.current = true;
        }
    }, [props.city, setData1]);
    const initialLoadData2 = useRef(false);
    useEffect(() => {
        if (!initialLoadData2.current) {
            loadDataFunction(props.targetCity, setData2);
            initialLoadData2.current = true;
        }
    }, [props.targetCity, setData2]);

    /** Effect to pass 'data1', 'data2' to WASM mutation algorithm, and returnvector
     * vector of aggregaed mean differences in each polygon of source city. This
     * vector is stored in the column of 'transformDataOneCol' corresponding to
     * 'varnames[0]'.
     */
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
        transformDataFunction(data1, data2, varnamesArr, setTransformDataAll);
        handleCalculateChange(false);
    }, [data1, data2, layer, varnames, handleCalculateChange]);

    useEffect(() => {
        if (transformDataAll) {
            transformDataSelectCol(transformDataAll, outputLayer, setTransformDataOneCol);
        }
    }, [outputLayer, transformDataAll, setTransformDataOneCol]);

    /**
     * Effect to load map data for source city, and replace specified column
     * with 'transformDataOneCol' from previous effect:
     */
    const { handleStoreGeoJsonResultChange } = props;
    useMemo(() => {
        if (transformDataOneCol) {
            fetch(mapPathSource)
                .then(response => response.json())
                .then(data => {
                    data.features.forEach((feature: any, index: number) => {
                        if (transformDataOneCol) { // needed here because 'transformDataOneCol' can still be null
                            feature.properties[layer] = transformDataOneCol[index];
                        }
                    });
                    setGeoJSONcontent(data);
                })
                .catch((error) => console.error('Error:', error));
            handleStoreGeoJsonResultChange(false);
        }
    }, [mapPathSource, transformDataOneCol, layer, handleStoreGeoJsonResultChange]);

    const { handleLayerRangeChange } = props;
    useMemo(() => {
        if (geoJSONcontent) {
            const rangeLimits = getRangeLimits(geoJSONcontent, layer);
            handleLayerRangeChange(rangeLimits);
        }
    }, [layer, geoJSONcontent, handleLayerRangeChange]);

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
