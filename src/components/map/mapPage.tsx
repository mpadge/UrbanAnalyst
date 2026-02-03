"use client"

import { useEffect, useState, useCallback, useMemo, lazy, Suspense } from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { DeckGL } from "@deck.gl/react/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import { Map } from "react-map-gl";

import { MapSkeleton, MapControlSkeleton, MapLegendSkeleton } from '@/components/utils/loadingSkeletons';

const Control = lazy(() => import('@/components/map/control'));
const Legend = lazy(() => import('@/components/map/legend'));
const UTAMap = lazy(() => import('@/components/map/map'));
const Tour = lazy(() => import('@/components/map/tour/tour'));

import { CITY_DATA, DEFAULT_MAP_CONFIG } from '@/data/citydata';
import { CityDataProps, DataRangeKeys, Data2RangeKeys, ViewState } from '@/data/interfaces';
import { calculateLayerRanges } from '@/components/utils/layerUtils';
import { localStorageHelpers, sessionStorageHelpers, loadInitialState } from '@/components/utils/localStorageUtils';
import { useMapTourLogic } from '@/components/utils/mapTourUtils';

const DEFAULT_LAYER = "social_index";

const validateAndSetDefaultLayer = (
    layer: string,
    availableLayers: string[],
    localStorageKey: string,
    defaultLayer: string = DEFAULT_LAYER
): string => {
    if (!availableLayers.includes(layer)) {
        localStorageHelpers.removeItem(localStorageKey);
        return defaultLayer;
    }
    return layer;
};

/**
 * Definition of interface for `MapProps`. These are constructed in
 * here and passed through to {@link map}. Individual props are:
 *
 * - `idx`: The integer defining the city from the full `CITY_DATA.citiesArray`.
 * - `layer`: The string defining the single layer to be diplayed.
 * - `layer2`: The string defining the optional paired layer to be used to
 *    display pairwise relationship.
 * - `numLayers`: String equal to either "single" or "paired".
 * - `alpha`: Opacity of rendered map (0 - 1).
 * - `layerRange`: Range of values to be plotted on map; obtained from the
 *   `rangeSlider` input.
 * - `layerStartStop`: Range of values spanned by `layerRange` slider. These are
 *   defined on page load, and fixed from then on.
 */
export interface MapProps {
    idx: number,
    layer: DataRangeKeys,
    layer2: DataRangeKeys,
    numLayers: "Single" | "Paired",
    alpha: number,
    layerRange: [number, number],
    layerStartStop: [number, number],
    viewState: ViewState,
    citiesArray: CityDataProps[],
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: Partial<ViewState>) => void,
    handleLayerChange: (layer: DataRangeKeys) => void,
    handleLayer2Change: (layer2: DataRangeKeys) => void,
    handleLayerRangeChange: (layerRange: [number, number]) => void,
}

/**
 * Main Map Page component
 *
 * This constructs all state variables passed on as `MapProps` to the actual
 * `map.tsx` which renders to DeckGL and underlying map components.
 *
 * The only additional state variables not defined as part of `MapProps`
 * are those related to the ReactTour components.
 */
export default function MapPage() {

    const [idx, setIdx] = useState(0);

    const cityData = useMemo(() => CITY_DATA.citiesArray[idx], [idx]);

    const [viewState, setViewState] = useState(() => ({
        ...CITY_DATA.citiesArray[0].initialViewState,
        pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
    }));

    const [layer, setLayer] = useState<DataRangeKeys>(DEFAULT_LAYER as DataRangeKeys);
    const [layer2, setLayer2] = useState<DataRangeKeys>("" as DataRangeKeys);
    const [alpha, setAlpha] = useState(0.5);
    const [numLayers, setNumLayers] = useState<"Single" | "Paired">("Single");

    const numLayersOptions: ("Single" | "Paired")[] = useMemo(() => ["Single", "Paired"], []);

    const [cityLayers, setCityLayers] = useState<string[]>([]);
    const [layerStartStop, setLayerStartStop] = useState<[number, number]>([0, 1]);
    const [layerRange, setLayerRange] = useState<[number, number]>([0, 1]);

    useEffect(() => {
        const initialState = loadInitialState();
        const {
            idx: idxLocal,
            layer: layerLocal,
            layer2: layer2Local,
            numLayers: numLayersLocal,
            alpha: alphaLocal
        } = initialState;

        setIdx(idxLocal);
        setViewState({
            ...CITY_DATA.citiesArray[idxLocal].initialViewState,
            pitch: 0,
            bearing: 0,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator()
        })
        setLayer(layerLocal as DataRangeKeys);
        setLayer2(layer2Local as DataRangeKeys);
        setNumLayers(numLayersLocal as "Single" | "Paired");
        setAlpha(alphaLocal);

        const theseLayers = Object.keys(CITY_DATA.citiesArray[idxLocal].dataRanges);
        setCityLayers(theseLayers);

        const validatedLayer = validateAndSetDefaultLayer(layerLocal, theseLayers, 'uaLayer');
        const validatedLayer2 = validateAndSetDefaultLayer(layer2Local, theseLayers, 'uaLayer2');

        if (validatedLayer !== layerLocal) setLayer(validatedLayer as DataRangeKeys);
        if (validatedLayer2 !== layer2Local) setLayer2(validatedLayer2 as DataRangeKeys);

        // layer_min/max values which can be adjusted with range slider.
        const rangeData = calculateLayerRanges(
            idxLocal,
            validatedLayer,
            validatedLayer2,
            numLayersLocal,
            CITY_DATA.citiesArray
        );

        setLayerRange([rangeData.layer_min, rangeData.layer_max]);
        setLayerStartStop([rangeData.layer_start, rangeData.layer_stop]);
    }, [])

    useEffect(() => {
        // Only run this effect after initialization is complete
        if (cityLayers.length > 0) {
            const rangeData = calculateLayerRanges(
                idx,
                layer,
                layer2,
                numLayers,
                CITY_DATA.citiesArray
            );

            setLayerRange([rangeData.layer_min, rangeData.layer_max]);
            setLayerStartStop([rangeData.layer_start, rangeData.layer_stop]);
        }
    }, [idx, layer, layer2, numLayers, cityLayers.length])

    // Memoize expensive calculations for city changes
    const createViewStateForCity = useCallback((cityIdx: number) => ({
        ...CITY_DATA.citiesArray[cityIdx].initialViewState,
        pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
    }), []);

    const handleIdxChange = useCallback((idx: number) => {
        setIdx(idx);
        setViewState(createViewStateForCity(idx));
        localStorageHelpers.setItem("uaCityIdx", idx.toString());
        const theseLayers = Object.keys(CITY_DATA.citiesArray[idx].dataRanges);

        const validatedLayer = validateAndSetDefaultLayer(layer, theseLayers, 'uaLayer');
        const validatedLayer2 = validateAndSetDefaultLayer(layer2, theseLayers, 'uaLayer2');

        if (validatedLayer !== layer) setLayer(validatedLayer as DataRangeKeys);
        if (validatedLayer2 !== layer2) setLayer2(validatedLayer2 as DataRangeKeys);
    }, [layer, layer2, createViewStateForCity]);

    const handleAlphaChange = useCallback((alpha: number) => {
        setAlpha(alpha);
        localStorageHelpers.setItem("uaAlpha", alpha.toString());
    }, []);

    const handleViewStateChange = useCallback((pViewState: Partial<ViewState>) => {
        setViewState((prevViewState) => { return { ...prevViewState, ...pViewState }; });
    }, []);

    const handleLayerChange = useCallback((layer: DataRangeKeys) => {
        setLayer(layer);
        localStorageHelpers.setItem("uaLayer", layer);
    }, []);

    const handleLayer2Change = useCallback((layer2: DataRangeKeys) => {
        setLayer2(layer2);
        localStorageHelpers.setItem("uaLayer2", layer2);
    }, []);

    const handleNumLayersChange = useCallback((numLayers: "Single" | "Paired") => {
        setNumLayers(numLayers);
        localStorageHelpers.setItem("uaNumLayers", numLayers);
    }, []);

    const handleLayerRangeChange = useCallback((layerRange: [number, number]) => {
        setLayerRange(layerRange);
    }, []);

    const { tourProps, handleTourOpen } = useMapTourLogic();

    const mapConfig = useMemo(() => ({
        idx,
        layer,
        layer2,
        numLayers,
        alpha,
        layerRange,
        layerStartStop,
        citiesArray: CITY_DATA.citiesArray,
        viewState
    }), [idx, layer, layer2, numLayers, alpha, layerRange, layerStartStop, viewState]);

    const controlConfig = useMemo(() => ({
        idx,
        layer,
        layer2,
        numLayers,
        numLayersOptions,
        alpha,
        layerRange,
        layerStartStop,
        citiesArray: CITY_DATA.citiesArray,
        cityLayers,
        viewState
    }), [idx, layer, layer2, numLayers, numLayersOptions, alpha, layerRange, layerStartStop, cityLayers, viewState]);

    const legendConfig = useMemo(() => ({
        idx,
        layerRange,
        layer,
        layer2,
        numLayers,
        alpha,
        citiesArray: CITY_DATA.citiesArray
    }), [idx, layerRange, layer, layer2, numLayers, alpha]);

    return (
        <>
            <Suspense fallback={<MapSkeleton />}>
                <UTAMap
                    {...mapConfig}
                    handleAlphaChange={handleAlphaChange}
                    handleViewStateChange={handleViewStateChange}
                    handleLayerChange={handleLayerChange}
                    handleLayer2Change={handleLayer2Change}
                    handleLayerRangeChange={handleLayerRangeChange}
                />
            </Suspense>
            <Suspense fallback={<MapControlSkeleton />}>
                <Control
                    {...controlConfig}
                    handleIdxChange={handleIdxChange}
                    handleNumLayersChange={handleNumLayersChange}
                    handleAlphaChange={handleAlphaChange}
                    handleViewStateChange={handleViewStateChange}
                    handleLayerChange={handleLayerChange}
                    handleLayer2Change={handleLayer2Change}
                    handleLayerRangeChange={handleLayerRangeChange}
                    handleTourOpen={handleTourOpen}
                />
            </Suspense>
            <Suspense fallback={<MapLegendSkeleton />}>
                <Legend
                    {...legendConfig}
                />
            </Suspense>
            {tourProps.isOpen && (
                <Suspense fallback={null}>
                    <Tour {...tourProps} />
                </Suspense>
            )}
        </>
    )
}
