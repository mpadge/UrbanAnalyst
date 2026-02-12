"use client"

import { useState, lazy, Suspense, useMemo, useCallback } from "react";
import { ChartSkeleton, ControlSkeleton } from '@/components/utils/loadingSkeletons';
import { ErrorBoundary, ErrorSkeleton } from '@/components/utils/errorBoundary';

const Control = lazy(() => import('@/components/compare/control'));
const BarChart = lazy(() => import('@/components/compare/statsBarChart'));
const Tour = lazy(() => import('@/components/compare/tour/tour'));

import styles from '@/styles/Home.module.css';

import { CITY_DATA } from '@/data/citydata';
import { DataRangeKeys } from '@/data/interfaces';
import { useCompareState } from '@/components/utils/localStorageUtils';
import { useTourLogic } from '@/components/utils/tourUtils';
import { NUM_LAYERS_OPTIONS } from '@/components/utils/pageConstants';
import type { NumLayersMode } from '@/components/utils/pageConstants';

import type { ReactourProps } from 'reactour';

interface ComparePagePresentationProps {
    chartConfig: {
        layer1: DataRangeKeys;
        layer2: DataRangeKeys;
        numLayers: "Single" | "Paired";
        meanVals: boolean;
        sortOpt: string;
    };
    controlConfig: {
        layer: DataRangeKeys;
        layer2: DataRangeKeys;
        numLayers: "Single" | "Paired";
        numLayersOptions: NumLayersMode[];
        meanVals: boolean;
        sortOpt: string;
        citiesArray: typeof CITY_DATA.citiesArray;
    };
    handleLayerChange: (layer: DataRangeKeys) => void;
    handleLayer2Change: (layer2: DataRangeKeys) => void;
    handleNumLayersChange: (numLayers: "Single" | "Paired") => void;
    handleMeanChange: () => void;
    handleSortChange: (sortOpt: string) => void;
    tourProps: ReactourProps;
    handleTourOpen: () => void;
}

function ComparePagePresentation({
    chartConfig,
    controlConfig,
    handleLayerChange,
    handleLayer2Change,
    handleNumLayersChange,
    handleMeanChange,
    handleSortChange,
    tourProps,
    handleTourOpen
}: ComparePagePresentationProps): JSX.Element {
    return (
        <>
            <main className={styles.main}>
                <div id="compare-page-bar-chart">
                    <ErrorBoundary fallback={<ErrorSkeleton />}>
                        <Suspense fallback={<ChartSkeleton />}>
                            <BarChart
                                {...chartConfig}
                                citiesArray={CITY_DATA.citiesArray}
                            />
                        </Suspense>
                    </ErrorBoundary>
                </div>
                <ErrorBoundary fallback={<ControlSkeleton />}>
                    <Suspense fallback={<ControlSkeleton />}>
                        <Control
                            {...controlConfig}
                            handleLayerChange={handleLayerChange}
                            handleLayer2Change={handleLayer2Change}
                            handleNumLayersChange={handleNumLayersChange}
                            handleMeanChange={handleMeanChange}
                            handleSortChange={handleSortChange}
                            handleTourOpen={handleTourOpen}
                        />
                    </Suspense>
                </ErrorBoundary>
            </main>
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

export default function ComparePage(): JSX.Element {

    const [_cityData] = useState(CITY_DATA.citiesArray[0]);

    const numLayersOptions: NumLayersMode[] = useMemo(() => [...NUM_LAYERS_OPTIONS], []);

    const { state, actions } = useCompareState();
    const { layer, layer2, numLayers, sortOpt, meanVals } = state;

    const { tourProps, handleTourOpen } = useTourLogic();

    const processedCitiesData = useMemo(() => {
        return {
            citiesArray: CITY_DATA.citiesArray,
            citiesCount: CITY_DATA.citiesArray.length,
            cityNames: CITY_DATA.citiesArray.map(city => city.name)
        };
    }, []);

    const handleLayerChange = useCallback((layer: DataRangeKeys) => {
        actions.setLayer(layer);
    }, [actions]);

    const handleLayer2Change = useCallback((layer2: DataRangeKeys) => {
        actions.setLayer2(layer2);
    }, [actions]);

    const handleNumLayersChange = useCallback((numLayers: "Single" | "Paired") => {
        actions.setNumLayers(numLayers);
    }, [actions]);

    const handleSortChange = useCallback((sortOpt: string) => {
        actions.setSortOpt(sortOpt);
    }, [actions]);

    const handleMeanChange = useCallback(() => {
        actions.toggleMeanVals();
    }, [actions]);

    const chartConfig = useMemo(() => ({
        layer1: layer,
        layer2: layer2,
        numLayers: numLayers,
        meanVals: meanVals,
        sortOpt: sortOpt
    }), [layer, layer2, numLayers, meanVals, sortOpt]);

    const controlConfig = useMemo(() => ({
        layer: layer,
        layer2: layer2,
        numLayers: numLayers,
        numLayersOptions: numLayersOptions,
        meanVals: meanVals,
        sortOpt: sortOpt,
        citiesArray: processedCitiesData.citiesArray
    }), [layer, layer2, numLayers, meanVals, sortOpt, numLayersOptions, processedCitiesData.citiesArray]);

    return (
        <ComparePagePresentation
            chartConfig={chartConfig}
            controlConfig={controlConfig}
            handleLayerChange={handleLayerChange}
            handleLayer2Change={handleLayer2Change}
            handleNumLayersChange={handleNumLayersChange}
            handleMeanChange={handleMeanChange}
            handleSortChange={handleSortChange}
            tourProps={tourProps}
            handleTourOpen={handleTourOpen}
        />
    );
}
