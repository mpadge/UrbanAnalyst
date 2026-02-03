"use client"

import { NextPage } from "next";
import { useState, lazy, Suspense, useMemo, useCallback } from "react";
import { ChartSkeleton, ControlSkeleton } from '@/components/utils/loadingSkeletons';

const Control = lazy(() => import('@/components/compare/control'));
const BarChart = lazy(() => import('@/components/compare/statsBarChart'));
const Tour = lazy(() => import('@/components/compare/tour/tour'));

import styles from '@/styles/Home.module.css';

import { CITY_DATA } from '@/data/citydata';
import { DataRangeKeys } from '@/data/interfaces';
import { useCompareState } from '@/components/utils/localStorageUtils';
import { useTourLogic } from '@/components/utils/tourUtils';
import { LAYER_CONSTANTS, NUM_LAYERS_OPTIONS } from '@/components/utils/pageConstants';
import type { NumLayersMode, SortOption } from '@/components/utils/pageConstants';

export default function Home() {

    // cityData only used to obtain generic info not specific to any city, so
    // default index of [0] can be used. Memoize to prevent unnecessary re-renders.
    const [cityData, setCityData] = useState(CITY_DATA.citiesArray[0]);
    const cityDataMemoized = useMemo(() => cityData, [cityData]);

    const numLayersOptions: NumLayersMode[] = useMemo(() => [...NUM_LAYERS_OPTIONS], []);

    const { state, actions } = useCompareState();
    const { layer, layer2, numLayers, sortOpt, meanVals } = state;

    const { tourProps, handleTourOpen } = useTourLogic();

    const processedCitiesData = useMemo(() => {
        return {
            citiesArray: CITY_DATA.citiesArray,
            citiesCount: CITY_DATA.citiesArray.length,
            // Pre-compute city names for potential filters
            cityNames: CITY_DATA.citiesArray.map(city => city.name)
        };
    }, [CITY_DATA.citiesArray]);

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
        <>
            <main className={styles.main}>

                <div id="compare-page-bar-chart">
                    <Suspense fallback={<ChartSkeleton />}>
                        <BarChart
                            {...chartConfig}
                            citiesArray={processedCitiesData.citiesArray}
                        />
                    </Suspense>
                </div>
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
            </main>
            {tourProps.isOpen && (
                <Suspense fallback={null}>
                    <Tour {...tourProps} />
                </Suspense>
            )}
        </>
    )
}
