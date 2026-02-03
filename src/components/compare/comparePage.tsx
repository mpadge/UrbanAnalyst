"use client"

import { NextPage } from "next";
import { useEffect, useState } from "react";
import Control from '@/components/compare/control';
import BarChart from '@/components/compare/statsBarChart';
import Tour from '@/components/compare/tour/tour';
import useWindowSize from '@/components/windowSize';

import { getTourConfig } from '@/components/compare/tour/tourConfig';

import styles from '@/styles/Home.module.css'
import tourStyles from '@/styles/tour.module.css';
import getPreferredTourClass from '@/components/tourClass';

import { CITY_DATA } from '@/data/citydata';
import { localStorageHelpers, sessionStorageHelpers } from '@/components/utils/localStorageUtils';

export default function Home() {

    // cityData only used to obtain generic info not specific to any city, so
    // default index of [0] can be used.
    const [cityData, setCityData] = useState(CITY_DATA.citiesArray[0]);

    const [layer, setLayer] = useState("transport"); // options[0] in layerlist.tsx
    const [layer2, setLayer2] = useState("");
    const [numLayers, setNumLayers] = useState("Single");
    const numLayersOptions = ["Single", "Paired"];

    const [sortOpt, setSortOpt] = useState("increasing");
    const [meanVals, setMeanVals] = useState(true);

    useEffect(() => {
        var layerLocal = "transport";
        var layer2Local = "";
        var numLayersLocal = "Single";
        var sortOptLocal = "increasing";

        const storedLayer = localStorageHelpers.getItem('uaLayer');
        if(storedLayer) {
            layerLocal = storedLayer;
        }
        const storedLayer2 = localStorageHelpers.getItem('uaLayer2');
        if(storedLayer2) {
            layer2Local = storedLayer2;
        }
        const storedNumLayers = localStorageHelpers.getItem('uaNumLayers');
        if(storedNumLayers) {
            numLayersLocal = storedNumLayers;
        }
        const storedSortOpt = localStorageHelpers.getItem('uaCompareSortOpt');
        if(storedSortOpt) {
            sortOptLocal = storedSortOpt;
        }

        setLayer(layerLocal);
        setLayer2(layer2Local);
        setNumLayers(numLayersLocal);
        setSortOpt(sortOptLocal);
    }, [])

    const handleLayerChange = (layer: string) => {
        setLayer(layer);
        localStorageHelpers.setItem("uaLayer", layer);
    }
    const handleLayer2Change = (layer2: string) => {
        setLayer2(layer2);
        localStorageHelpers.setItem("uaLayer2", layer2);
    }
    const handleNumLayersChange = (numLayers: string) => {
        setNumLayers(numLayers);
        localStorageHelpers.setItem("uaNumLayers", numLayers);
    }
    const handleSortChange = (sortOpt: string) => {
        setSortOpt (sortOpt)
        localStorageHelpers.setItem("uaCompareSortOpt", sortOpt);
    }
    const handleMeanChange = (e: any) => {
        setMeanVals(!meanVals);
    }

    // ----- TOUR start-----
    const [tourClass, setTourClass] = useState(tourStyles.tourhelperLight);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTourClass(getPreferredTourClass());
        }
    }, []);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const size = useWindowSize();
    useEffect(() => {
        const w = size?.width || 0;
        setWidth(w);
        const h = size?.height || 0;
        setHeight(h);
    }, [size])
    const tourConfig = getTourConfig(width, height);

    const accentColor = "#5cb7b7";
    const [isTourOpen, setTourOpen] = useState(false);

    const handleTourOpen = () => {
        setTourOpen(true);
    };

    // Use sessionStorage to only show tour once per session.
    const closeTour = () => {
        setTourOpen(false);
        sessionStorageHelpers.setItem("uacomparetour", "done");
    };

    useEffect(() => {
        if(!sessionStorageHelpers.getItem('uacomparetour')) {
            setTourOpen(true)
        }
    }, [])
    // ----- TOUR end-----

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
            <Tour
                onRequestClose={closeTour}
                disableInteraction={false}
                steps={tourConfig}
                isOpen={isTourOpen}
                maskClassName={tourStyles.tourmask}
                className={tourClass}
                rounded={5}
                accentColor={accentColor}
            />
        </>
    )
}
