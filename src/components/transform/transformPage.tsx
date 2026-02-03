"use client"

import { useEffect, useState, useCallback, useMemo, lazy, Suspense} from 'react';
import { FlyToInterpolator } from "@deck.gl/core/typed";

import { TransformSkeleton, TransformControlSkeleton, TransformLegendSkeleton } from '@/components/utils/loadingSkeletons';

const Control = lazy(() => import('@/components/transform/control'));
const Legend = lazy(() => import('@/components/transform/legend'));
const MapTransformDynamic = lazy(() => import('@/components/transform/transformPageDynamic'));
const Tour = lazy(() => import('@/components/transform/tour/tour'));

import { CityDataProps } from "@/data/interfaces";
import { getTourConfig } from '@/components/transform/tour/tourConfig';
import { CITY_DATA } from '@/data/citydata';
import { DataRangeKeys, Data2RangeKeys, ViewState } from '@/data/interfaces';
import { localStorageHelpers, sessionStorageHelpers } from '@/components/utils/localStorageUtils';
import { useTransformTourLogic } from '@/components/utils/transformTourUtils';
import { LAYER_CONSTANTS, OUTPUT_LAYER_TYPES } from '@/components/utils/pageConstants';
import type { OutputLayerType } from '@/components/utils/pageConstants';


/**
 * Definition of interface for `TransformProps`. These are constructed in
 * {@link TransformPage} and passed through to `TransformDynamic`, which
 * passes straight through to `TransformComponent`. Individual props are:
 *
 * - `idx`: The integer defining the city from the full `CITY_DATA.citiesArray`.
 * - `idx2`: The equivalent integer defining the *target* city.
 * - `layer`: The string defining the single layer to be transformed.
 * - `varnames`: Array of variable names also passed to the transform algorith,
 *   so transformation of `layer` also minimises the multi-variate distance to
 *   all variables defined here.
 * - `citiesArray`: Static array of all data for all cities, read from main
 *   `/data` directory.
 * - `city`: String representing name of city, read from `citiesArray[idx]`.
 * - `targetCity`: Equivalent string for target city.
 * - `alpha`: Opacity for visual plotting of DeckGL layer.
 * - `layerRange`: Not yet fully implemented.
 * - `outputLayer`: Control for which layer should appear on main `transform`
 *   page: "Original", "Transformed", "Absolute", or "Relative".
 */
export interface TransformProps {
    idx: number
    idx2: number
    layer: DataRangeKeys
    varnames: string[]
    citiesArray: CityDataProps[],
    city: string
    targetCity: string
    viewState: ViewState
    alpha: number
    layerRange: [number, number]
    layerStartStop: [number, number]
    outputLayer: OutputLayerType
    setLayerRange: (layerRange: [number, number]) => void
    setLayerStartStop: (layerStartStop: [number, number]) => void
    handleOutputLayerChange: (outputLayer: OutputLayerType) => void
}

/**
 * Main Transform Page component
 *
 * @remark This uses the {@link TransformProps} interface to construct all
 * props and pass on to both `transformComponent` and `control`.
 */
export default function TransformPage() {

    // -------- state variables --------
    const [idx, setIdx] = useState<number>(LAYER_CONSTANTS.DEFAULT_CITY_INDEX);
    const [idx2, setIdx2] = useState<number>(LAYER_CONSTANTS.DEFAULT_TARGET_CITY_INDEX); // Target City

const [viewState, setViewState] = useState<ViewState & {
        transitionDuration: number;
        transitionInterpolator: any;
    }>(() => ({
        ...CITY_DATA.citiesArray[0].initialViewState,
        pitch: LAYER_CONSTANTS.DEFAULT_PITCH,
        bearing: LAYER_CONSTANTS.DEFAULT_BEARING,
        transitionDuration: LAYER_CONSTANTS.DEFAULT_TRANSITION_DURATION,
        transitionInterpolator: new FlyToInterpolator()
    }));
    const [layer, setLayer] = useState<DataRangeKeys>(LAYER_CONSTANTS.DEFAULT_BIKE_INDEX_LAYER);
    const [alpha, setAlpha] = useState<number>(LAYER_CONSTANTS.DEFAULT_ALPHA);

    const [layerStartStop, setLayerStartStop] = useState<[number, number]>(LAYER_CONSTANTS.DEFAULT_LAYER_START_STOP);
    const [layerRange, setLayerRange] = useState<[number, number]>(LAYER_CONSTANTS.DEFAULT_LAYER_RANGE);

    const [varnames, setVarnames] = useState<string[]>([]);
    const [outputLayer, setOutputLayer] = useState<OutputLayerType>(OUTPUT_LAYER_TYPES.RELATIVE);
    const [cityLayers, setCityLayers] = useState<string[]>([]);

    useEffect(() => {
        var idxLocal: number = LAYER_CONSTANTS.DEFAULT_CITY_INDEX;
        var idx2Local: number = LAYER_CONSTANTS.DEFAULT_TARGET_CITY_INDEX;
        var layerLocal: string = LAYER_CONSTANTS.DEFAULT_TRANSPORT_LAYER;
        var alphaLocal: number = LAYER_CONSTANTS.DEFAULT_ALPHA;

        const storedIdx = localStorageHelpers.getItem('uaCityIdx');
        if(storedIdx) { // convert to int
            idxLocal = parseInt(storedIdx, 10);
            if (isNaN(idxLocal)) {
                idxLocal = 0;
            }
        }
        const storedIdx2 = localStorageHelpers.getItem('uaCityIdx2');
        if(storedIdx2) { // convert to int
            idx2Local = parseInt(storedIdx2, 10);
            if (isNaN(idx2Local)) {
                idx2Local = 0;
            }
        }
        const storedLayer = localStorageHelpers.getItem('uaLayer');
        if(storedLayer) {
            layerLocal = storedLayer;
        }
        const storedAlpha = localStorageHelpers.getItem('uaAlpha');
        if(storedAlpha) {
            alphaLocal = parseFloat(storedAlpha);
            if (isNaN(alphaLocal)) {
                alphaLocal = 0.5;
            }
        }

        setIdx(idxLocal);
        setIdx2(idx2Local);
        setViewState({
            ...CITY_DATA.citiesArray[idxLocal].initialViewState,
            pitch: 0,
            bearing: 0,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator()
        })
        setLayer(layerLocal as DataRangeKeys);
        setAlpha(alphaLocal);

        // Names of all layers; only effect of `idxLocal` is to include
        // additional layers such as those in US data, but otherwise has no
        // effect here:
        const theseLayers = Object.keys(CITY_DATA.citiesArray[idxLocal].dataRanges);
        setCityLayers(theseLayers);
        if (!theseLayers.includes(layerLocal)) {
            layerLocal = LAYER_CONSTANTS.DEFAULT_TRANSPORT_LAYER;
            setLayer(layerLocal as DataRangeKeys);
            localStorageHelpers.removeItem('uaLayer');
        }
    }, [])

    useEffect(() => {
        // layer_min/max values which can be adjusted with range slider. This
        // code is also repeated in mapPage.tsx and mapLayer.tsx.
        const layer_start = CITY_DATA.citiesArray[idx].dataRanges[layer as DataRangeKeys][0];
        const layer_min = CITY_DATA.citiesArray[idx].dataRanges[layer as DataRangeKeys][1];
        const layer_max = CITY_DATA.citiesArray[idx].dataRanges[layer as DataRangeKeys][2];
        const layer_stop = CITY_DATA.citiesArray[idx].dataRanges[layer as DataRangeKeys][3];

        setLayerRange([layer_min, layer_max]);
        setLayerStartStop([layer_start, layer_stop]);
    }, [idx, layer]);

    const createViewStateForCity = useCallback((cityIdx: number) => ({
        ...CITY_DATA.citiesArray[cityIdx].initialViewState,
        pitch: LAYER_CONSTANTS.DEFAULT_PITCH,
        bearing: LAYER_CONSTANTS.DEFAULT_BEARING,
        transitionDuration: LAYER_CONSTANTS.DEFAULT_TRANSITION_DURATION,
        transitionInterpolator: new FlyToInterpolator()
    }), []);

    const citiesData = useMemo(() => ({
        citiesArray: CITY_DATA.citiesArray,
        citiesCount: CITY_DATA.citiesArray.length,
        cityNames: CITY_DATA.citiesArray.map(city => city.name)
    }), [CITY_DATA.citiesArray]);

    // -------- handlers for state variables --------
    const handleIdxChange = useCallback((idx: number) => {
        setIdx(idx);
        setViewState(createViewStateForCity(idx));
        localStorageHelpers.setItem("uaCityIdx", idx.toString());
        const theseLayers = Object.keys(CITY_DATA.citiesArray[idx].dataRanges);
        if (!theseLayers.includes(layer)) {
            setLayer(LAYER_CONSTANTS.DEFAULT_TRANSPORT_LAYER);
            localStorageHelpers.removeItem('uaLayer');
        }
    }, [layer, createViewStateForCity]);

    const handleIdx2Change = useCallback((idx2: number) => {
        setIdx2(idx2);
        localStorageHelpers.setItem("uaCityIdx2", idx2.toString());
    }, []);

    const handleViewStateChange = useCallback((pViewState: Partial<ViewState>) => {
        setViewState((prevViewState) => { return { ...prevViewState, ...pViewState }; });
    }, []);

    const handleLayerChange = useCallback((layer: DataRangeKeys) => {
        setLayer(layer);
        localStorageHelpers.setItem("uaLayer", layer);
    }, []);

    const handleAlphaChange = useCallback((alpha: number) => {
        setAlpha(alpha);
        localStorageHelpers.setItem("uaAlpha", alpha.toString());
    }, []);

    const handleOutputLayerChange = useCallback((outputLayer: OutputLayerType) => {
        setOutputLayer(outputLayer);
    }, []);

    const { tourProps, handleTourOpen } = useTransformTourLogic();

    const transformConfig = useMemo(() => ({
        idx,
        idx2,
        layer,
        varnames,
        citiesArray: citiesData.citiesArray,
        city: citiesData.citiesArray[idx].name,
        targetCity: citiesData.citiesArray[idx2].name,
        viewState,
        alpha,
        layerRange,
        layerStartStop,
        outputLayer,
        setLayerRange,
        setLayerStartStop,
        handleOutputLayerChange
    }), [idx, idx2, layer, varnames, citiesData, viewState, alpha, layerRange, layerStartStop, outputLayer, setLayerRange, setLayerStartStop, handleOutputLayerChange]);

    const controlConfig = useMemo(() => ({
        idx,
        idx2,
        layer,
        varnames,
        alpha,
        layerRange,
        layerStartStop,
        citiesArray: citiesData.citiesArray,
        cityLayers,
        viewState,
        outputLayer
    }), [idx, idx2, layer, varnames, citiesData, cityLayers, viewState, alpha, layerRange, layerStartStop, outputLayer]);

    const legendConfig = useMemo(() => ({
        layerRange,
        alpha,
        layer_name: layer
    }), [layerRange, alpha, layer]);

    return (
        <>
            <Suspense fallback={<TransformSkeleton />}>
                <MapTransformDynamic {...transformConfig} />
            </Suspense>
            <Suspense fallback={<TransformControlSkeleton />}>
                <Control
                    {...controlConfig}
                    handleIdxChange={handleIdxChange}
                    handleIdx2Change={handleIdx2Change}
                    handleAlphaChange={handleAlphaChange}
                    handleViewStateChange={handleViewStateChange}
                    handleLayerChange={handleLayerChange}
                    setLayerRange={setLayerRange}
                    setVarnames={setVarnames}
                    handleOutputLayerChange={handleOutputLayerChange}
                    handleTourOpen={handleTourOpen}
                />
            </Suspense>
            <Suspense fallback={<TransformLegendSkeleton />}>
                <Legend {...legendConfig} />
            </Suspense>
            {tourProps.isOpen && (
                <Suspense fallback={null}>
                    <Tour {...tourProps} />
                </Suspense>
            )}
        </>
    )
}
