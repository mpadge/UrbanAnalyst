"use client"

import { useEffect, useState, useCallback, useMemo, lazy, Suspense } from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { DeckGL } from "@deck.gl/react/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import { Map } from "react-map-gl";
import { ReactourProps } from 'reactour';

import { MapSkeleton, MapControlSkeleton, MapLegendSkeleton } from '@/components/utils/loadingSkeletons';
import { ErrorBoundary, ComponentErrorSkeleton } from '@/components/utils/errorBoundary';

const Control = lazy(() => import('@/components/map/control'));
const Legend = lazy(() => import('@/components/map/legend'));
const UTAMap = lazy(() => import('@/components/map/map'));
const Tour = lazy(() => import('@/components/map/tour/tour'));

import { CITY_DATA, DEFAULT_MAP_CONFIG } from '@/data/citydata';
import { CityDataProps, DataRangeKeys, Data2RangeKeys, ViewState } from '@/data/interfaces';
import { calculateLayerRanges } from '@/components/utils/layerUtils';
import { localStorageHelpers, sessionStorageHelpers, loadInitialState } from '@/components/utils/localStorageUtils';
import { useMapTourLogic } from '@/components/utils/mapTourUtils';
import { LAYER_CONSTANTS, NUM_LAYERS_OPTIONS } from '@/components/utils/pageConstants';
import type { NumLayersMode } from '@/components/utils/pageConstants';

const DEFAULT_LAYER = LAYER_CONSTANTS.DEFAULT_LAYER;

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

export interface MapProps {
    idx: number;
    layer: DataRangeKeys;
    layer2: DataRangeKeys;
    numLayers: "Single" | "Paired";
    alpha: number;
    layerRange: [number, number];
    layerStartStop: [number, number];
    viewState: ViewState;
    citiesArray: CityDataProps[];
    handleAlphaChange: (pAlpha: number) => void;
    handleViewStateChange: (pViewState: Partial<ViewState>) => void;
    handleLayerChange: (layer: DataRangeKeys) => void;
    handleLayer2Change: (layer2: DataRangeKeys) => void;
    handleLayerRangeChange: (layerRange: [number, number]) => void;
}

interface MapPagePresentationProps {
    mapConfig: {
        idx: number;
        layer: DataRangeKeys;
        layer2: DataRangeKeys;
        numLayers: "Single" | "Paired";
        alpha: number;
        layerRange: [number, number];
        layerStartStop: [number, number];
        citiesArray: CityDataProps[];
        viewState: ViewState & {
            transitionDuration: number;
            transitionInterpolator: any;
        };
    };
    controlConfig: {
        idx: number;
        layer: DataRangeKeys;
        layer2: DataRangeKeys;
        numLayers: "Single" | "Paired";
        numLayersOptions: NumLayersMode[];
        alpha: number;
        layerRange: [number, number];
        layerStartStop: [number, number];
        citiesArray: CityDataProps[];
        cityLayers: string[];
        viewState: ViewState & {
            transitionDuration: number;
            transitionInterpolator: any;
        };
    };
    legendConfig: {
        idx: number;
        layerRange: [number, number];
        layer: DataRangeKeys;
        layer2: DataRangeKeys;
        numLayers: "Single" | "Paired";
        alpha: number;
        citiesArray: CityDataProps[];
    };
    handleAlphaChange: (alpha: number) => void;
    handleViewStateChange: (pViewState: Partial<ViewState>) => void;
    handleLayerChange: (layer: DataRangeKeys) => void;
    handleLayer2Change: (layer2: DataRangeKeys) => void;
    handleLayerRangeChange: (layerRange: [number, number]) => void;
    handleIdxChange: (idx: number) => void;
    handleNumLayersChange: (numLayers: "Single" | "Paired") => void;
    tourProps: ReactourProps;
    handleTourOpen: () => void;
}

function MapPagePresentation({
    mapConfig,
    controlConfig,
    legendConfig,
    handleAlphaChange,
    handleViewStateChange,
    handleLayerChange,
    handleLayer2Change,
    handleLayerRangeChange,
    handleIdxChange,
    handleNumLayersChange,
    tourProps,
    handleTourOpen
}: MapPagePresentationProps) {
    return (
        <>
            <ErrorBoundary fallback={<ComponentErrorSkeleton />}>
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
            </ErrorBoundary>
            <ErrorBoundary fallback={<MapControlSkeleton />}>
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
            </ErrorBoundary>
            <ErrorBoundary fallback={<MapLegendSkeleton />}>
                <Suspense fallback={<MapLegendSkeleton />}>
                    <Legend
                        {...legendConfig}
                    />
                </Suspense>
            </ErrorBoundary>
            {tourProps.isOpen && (
                <ErrorBoundary fallback={null}>
                    <Suspense fallback={null}>
                        <Tour {...tourProps} />
                    </Suspense>
                </ErrorBoundary>
            )}
        </>
    );
}

export default function MapPage() {

    const [idx, setIdx] = useState(0);

    const cityData = useMemo(() => CITY_DATA.citiesArray[idx], [idx]);

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

    const [layer, setLayer] = useState<DataRangeKeys>(DEFAULT_LAYER);
    const [layer2, setLayer2] = useState<DataRangeKeys>("" as DataRangeKeys);
    const [alpha, setAlpha] = useState<number>(LAYER_CONSTANTS.DEFAULT_ALPHA);
    const [numLayers, setNumLayers] = useState<"Single" | "Paired">(LAYER_CONSTANTS.MODE_SINGLE);

    const numLayersOptions: NumLayersMode[] = useMemo(() => [...NUM_LAYERS_OPTIONS], []);

    const [cityLayers, setCityLayers] = useState<string[]>([]);
    const [layerStartStop, setLayerStartStop] = useState<[number, number]>(LAYER_CONSTANTS.DEFAULT_LAYER_START_STOP);
    const [layerRange, setLayerRange] = useState<[number, number]>(LAYER_CONSTANTS.DEFAULT_LAYER_RANGE);

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
            pitch: LAYER_CONSTANTS.DEFAULT_PITCH,
            bearing: LAYER_CONSTANTS.DEFAULT_BEARING,
            transitionDuration: LAYER_CONSTANTS.DEFAULT_TRANSITION_DURATION,
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

    const createViewStateForCity = useCallback((cityIdx: number) => ({
        ...CITY_DATA.citiesArray[cityIdx].initialViewState,
        pitch: LAYER_CONSTANTS.DEFAULT_PITCH,
        bearing: LAYER_CONSTANTS.DEFAULT_BEARING,
        transitionDuration: LAYER_CONSTANTS.DEFAULT_TRANSITION_DURATION,
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
        <MapPagePresentation
            mapConfig={mapConfig}
            controlConfig={controlConfig}
            legendConfig={legendConfig}
            handleAlphaChange={handleAlphaChange}
            handleViewStateChange={handleViewStateChange}
            handleLayerChange={handleLayerChange}
            handleLayer2Change={handleLayer2Change}
            handleLayerRangeChange={handleLayerRangeChange}
            handleIdxChange={handleIdxChange}
            handleNumLayersChange={handleNumLayersChange}
            tourProps={tourProps}
            handleTourOpen={handleTourOpen}
        />
    );
}
