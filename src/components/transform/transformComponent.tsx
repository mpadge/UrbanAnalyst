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
 *      - props: `props.city`, `setData1`
 *
 *      Called on every update to `props.city`.
 *  2. Load data for the main city (from external, private GitHub repo).
 *      - props: `props.city`, `setData1`
 *      - refs:  `dataLoadingComplete`, `initialCalculate`
 *
 *      Called on every update to `props.city`; also sets
 *      `dataLoadingComplete(true)` and `initialCalculate(true)`.
 *  3. Load data for the target city.
 *      - props: `props.targetCity`, `setData2`.
 *      - refs:  `dataLoadingComplete`, `initialCalculate`
 *
 *      Called on every update to `props.targetCity`; also sets
 *      `dataLoadingComplete(true)` and `initialCalculate(true)`.
 *  4. An effect to reset the `dataLoadingComplete` and `initialCalculate` refs
 *     in response to any changes to extra layers, so that the following effect
 *     can be re-triggered.
 *  5. The "main" Effect to call `transformDataFunction`.
 *      - props: `data1`, `data2`, `props.layer`, `props.varnames`.
 *      - refs: `initialCalculate`, `dataLoadingComplete`.
 *
 *      Called on every update to any of [data1, data2, layer, varnames1]; also
 *      resets `initialCalculate(false)`, `dataLoadingComplete(false)`.
 *  6. Effect to select `outputLayer` column of transform data to be used in
 *     map.
 *      - props: `outputLayer`, `transformDataAll`, `setTransformDataOneCol`,
 *      `isTransformationComplete`.
 *
 *      Called on every update to `outputLayer` or `transformDataAll`.
 *  7. Effect to load geoJSON data, append `trasformDataOneCol`, and store
 *     result.
 *      - props: `mapPathSource`, `transformDataOneCol`, `props.layer`
 *
 *      Called on every change to `mapPathSource` or `layer`.
 *  8. Effect to calculate range limits to be plotted.
 *      - props: `props.layer`, `geoJSONcontent`, `handleLayerRangeChange`
 *
 *      Called on every change to [layer, geoJSONcontent].
 *  9. Effect to get and store the final geoJSON layer to be passed to
 *     `DeckGL`.
 *      - props: `props.layerRange`, `props.layer`, `props.alpha`,
 *      `geoJSONcontent`
 *
 *      Called on every change to [layerRange, layer, alpha, geoJSONcontent].
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

    /**
     * ------ Effect #1 ------
     */
    useEffect(() => {
        const mapPathSource = "/data/" + props.city + "/data.json";
        setMapPathSource(mapPathSource);
        setData1(null);
    }, [props.city, setData1]);

    /**
     * Effect to load 'dataraw' point-based data for source and target cities.
     */
    const dataLoadingComplete = useRef(false);
    const initialCalculate = useRef(false);
    /**
     * ------ Effect #2 ------
     */
    useEffect(() => {
        setData1(null);
        loadDataFunction(props.city, setData1);
        dataLoadingComplete.current = true;
        initialCalculate.current = true;
    }, [props.city, setData1]);
    /**
     * ------ Effect #3 ------
     */
    useEffect(() => {
        setData2(null);
        loadDataFunction(props.targetCity, setData2);
        dataLoadingComplete.current = true;
        initialCalculate.current = true;
    }, [props.targetCity, setData2]);

    /** Effect to pass 'data1', 'data2' to WASM mutation algorithm, and returnvector
     * vector of aggregaed mean differences in each polygon of source city. This
     * vector is stored in the column of 'transformDataOneCol' corresponding to
     * 'varnames[0]'.
     */
    const { layer, varnames, outputLayer } = props;
    const [isTransformationComplete, setIsTransformationComplete] = useState(false);
    /**
     * ------ Effect #4 to reset refs when 'varnames' change, to trigger
     * ------ re-calculation:
     */
    useEffect(() => {
        initialCalculate.current = true;
        dataLoadingComplete.current = true;
    }, [varnames]);
    /**
     * ------ Effect #5: The main effect ------
     */
    useEffect(() => {
        if (initialCalculate.current && dataLoadingComplete.current && data1 !== null && data2 !== null) {
            const uniqueVarNames = Object.keys(
                varnames.reduce((acc: StringAcc, name) => {
                    acc[name] = true;
                    return acc;
                }, {})
            ).sort();
            const filteredVarNames = varnames.filter(name => name!== layer);
            const varnamesArr: string[] = [layer, ...filteredVarNames];
            transformDataFunction(data1, data2, varnamesArr, setTransformDataAll, () => setIsTransformationComplete(true));;
            initialCalculate.current = false;
            dataLoadingComplete.current = false;
        }
    }, [data1, data2, layer, varnames]);

    /**
     * ------ Effect #6 ------
     */
    useEffect(() => {
        if (transformDataAll && isTransformationComplete) {
            transformDataSelectCol(transformDataAll, outputLayer, setTransformDataOneCol);
        }
    }, [outputLayer, transformDataAll, setTransformDataOneCol, isTransformationComplete]);

    /**
     * ------ Effect #7 to load map data for source city, and replace specified
     * ------ column with 'transformDataOneCol' from previous effect:
     */
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
        }
    }, [mapPathSource, transformDataOneCol, layer]);

    /**
     * ------ Effect #8 ------
     */
    const { setLayerRange, setLayerStartStop } = props;
    useEffect(() => {
        if (geoJSONcontent !== null) {
            const rangeLimits = getRangeLimits(geoJSONcontent, layer);
            const rangeSdLims = [rangeLimits[1], rangeLimits[2]];
            const rangeMinMax = [rangeLimits[0], rangeLimits[3]];
            setLayerRange(rangeSdLims);
            setLayerStartStop(rangeMinMax);;
        }
    }, [layer, geoJSONcontent, setLayerRange, setLayerStartStop]);

    /**
     * ------ Effect #9 ------
     */
    useEffect(() => {
        if (geoJSONcontent !== null) {
            const this_layer = getGeoJsonLayer(geoJSONcontent, props.layerRange, layer, props.alpha);
            setGeoJsonLayer(this_layer);
        }
    }, [props.layerRange, layer, props.alpha, geoJSONcontent]);

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
