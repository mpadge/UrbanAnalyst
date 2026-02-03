"use client"

import { NextPage } from "next";
import { useState } from "react";
import Control from '@/components/compare/control';
import BarChart from '@/components/compare/statsBarChart';
import Tour from '@/components/compare/tour/tour';

import styles from '@/styles/Home.module.css';

import { CITY_DATA } from '@/data/citydata';
import { DataRangeKeys } from '@/data/interfaces';
import { useCompareState } from '@/components/utils/localStorageUtils';
import { useTourLogic } from '@/components/utils/tourUtils';

export default function Home() {

    // cityData only used to obtain generic info not specific to any city, so
    // default index of [0] can be used.
    const [cityData, setCityData] = useState(CITY_DATA.citiesArray[0]);

    const numLayersOptions: ("Single" | "Paired")[] = ["Single", "Paired"];

    const { state, actions } = useCompareState();
    const { layer, layer2, numLayers, sortOpt, meanVals } = state;

    const { tourProps, handleTourOpen } = useTourLogic();

    const handleLayerChange = (layer: DataRangeKeys) => {
        actions.setLayer(layer);
    };
    
    const handleLayer2Change = (layer2: DataRangeKeys) => {
        actions.setLayer2(layer2);
    };
    
    const handleNumLayersChange = (numLayers: "Single" | "Paired") => {
        actions.setNumLayers(numLayers);
    };
    
    const handleSortChange = (sortOpt: string) => {
        actions.setSortOpt(sortOpt);
    };
    
    const handleMeanChange = () => {
        actions.toggleMeanVals();
    };

    

    return (
        <>
            <main className={styles.main}>

                <div id="compare-page-bar-chart">
                    <BarChart
                        layer1 = {layer}
                        layer2 = {layer2}
                        numLayers = {numLayers}
                        meanVals = {meanVals}
                        sortOpt = {sortOpt}
                        citiesArray = {CITY_DATA.citiesArray}
                    />
                </div>
                <Control
                    layer = {layer}
                    layer2 = {layer2}
                    numLayers = {numLayers}
                    numLayersOptions = {numLayersOptions}
                    meanVals = {meanVals}
                    sortOpt = {sortOpt}
                    citiesArray = {CITY_DATA.citiesArray}
                    handleLayerChange = {handleLayerChange}
                    handleLayer2Change = {handleLayer2Change}
                    handleNumLayersChange = {handleNumLayersChange}
                    handleMeanChange = {handleMeanChange}
                    handleSortChange = {handleSortChange}
                    handleTourOpen = {handleTourOpen}
                />
            </main>
            <Tour {...tourProps} />
        </>
    )
}
