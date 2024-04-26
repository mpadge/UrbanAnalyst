"use client"

import { NextPage } from "next";
import { useEffect, useState } from "react";
import Control from '@/components/compare/control';
import Buttons from '@/components/buttons4';
import BarChart from '@/components/compare/statsBarChart';
import Tour from '@/components/compare/tour/tour';
import useWindowSize from '@/components/windowSize';

import { getTourConfig } from '@/components/compare/tour/tourConfig';

import styles from '@/styles/Home.module.css'
import tourStyles from '@/styles/tour.module.css';

import { CITY_DATA } from '@/data/citydata';

const buttonProps = {
    first: "home",
    second: "summarise",
    third: "map",
    fourth: "transform"
}

export default function Home() {

    // cityData only used to obtain generic info not specific to any city, so
    // default index of [0] can be used.
    const [cityData, setCityData] = useState(CITY_DATA.citiesArray[0]);

    const [layer, setLayer] = useState("social_index"); // options[0] in layerlist.tsx
    const [layer2, setLayer2] = useState("");
    const [numLayers, setNumLayers] = useState("Single");
    const numLayersOptions = ["Single", "Paired"];

    const [explain, setExplain] = useState(false);
    const [sortOpt, setSortOpt] = useState("increasing");
    const [meanVals, setMeanVals] = useState(true);

    useEffect(() => {
        var layerLocal = "social_index";
        var layer2Local = "";
        var numLayersLocal = "Single";
        var sortOptLocal = "increasing";
        if (typeof window != "undefined") {
            const storedLayer = localStorage.getItem('uaLayer');
            if(storedLayer) {
                layerLocal = storedLayer;
            }
            const storedLayer2 = localStorage.getItem('uaLayer2');
            if(storedLayer2) {
                layer2Local = storedLayer2;
            }
            const storedNumLayers = localStorage.getItem('uaNumLayers');
            if(storedNumLayers) {
                numLayersLocal = storedNumLayers;
            }
            const storedSortOpt = localStorage.getItem('uaCompareSortOpt');
            if(storedSortOpt) {
                sortOptLocal = storedSortOpt;
            }
        }
        setLayer(layerLocal);
        setLayer2(layer2Local);
        setNumLayers(numLayersLocal);
        setSortOpt(sortOptLocal);
    }, [])

    const handleLayerChange = (layer: string) => {
        setLayer(layer);
        if (typeof window != "undefined") {
            localStorage.setItem("uaLayer", layer);
        }
    }
    const handleLayer2Change = (layer2: string) => {
        setLayer2(layer2);
        if (typeof window != "undefined") {
            localStorage.setItem("uaLayer2", layer2);
        }
    }
    const handleNumLayersChange = (numLayers: string) => {
        setNumLayers(numLayers);
        if (typeof window != "undefined") {
            localStorage.setItem("uaNumLayers", numLayers);
        }
    }
    const handleExplainChange = (e: any) => {
        setExplain(!explain);
    }
    const handleSortChange = (sortOpt: string) => {
        setSortOpt (sortOpt)
        if (typeof window != "undefined") {
            localStorage.setItem("uaCompareSortOpt", sortOpt);
        }
    }
    const handleMeanChange = (e: any) => {
        setMeanVals(!meanVals);
    }

    // ----- TOUR start-----
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
        if (typeof window != "undefined") {
            sessionStorage.setItem("uacomparetour", "done");
        }
    };

    useEffect(() => {
        if(!sessionStorage.getItem('uacomparetour')) {
            setTourOpen(true)
        }
    }, [])
    // ----- TOUR end-----

    return (
        <>
        <main className={styles.main}>

            <BarChart
                layer1 = {layer}
                layer2 = {layer2}
                numLayers = {numLayers}
                meanVals = {meanVals}
                sortOpt = {sortOpt}
                citiesArray = {CITY_DATA.citiesArray}
            />
            <Control
                layer = {layer}
                layer2 = {layer2}
                numLayers = {numLayers}
                numLayersOptions = {numLayersOptions}
                meanVals = {meanVals}
                explain = {explain}
                sortOpt = {sortOpt}
                citiesArray = {CITY_DATA.citiesArray}
                handleLayerChange = {handleLayerChange}
                handleLayer2Change = {handleLayer2Change}
                handleNumLayersChange = {handleNumLayersChange}
                handleMeanChange = {handleMeanChange}
                handleSortChange = {handleSortChange}
                handleExplainChange = {handleExplainChange}
                handleTourOpen = {handleTourOpen}
            />
            <Buttons buttons={buttonProps} />
        </main>
        <Tour
            onRequestClose={closeTour}
            disableInteraction={false}
            steps={tourConfig}
            isOpen={isTourOpen}
            maskClassName={tourStyles.tourmask}
            className={tourStyles.tourhelper}
            rounded={5}
            accentColor={accentColor}
        />
        </>
    )
}
