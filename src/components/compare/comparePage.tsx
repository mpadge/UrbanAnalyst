"use client"

import { NextPage } from "next";
import { useEffect, useState } from "react";
import Control from '@/components/compare/control';
import Buttons from '@/components/buttons3';
import BarChart from '@/components/compare/statsBarChart';
import Tour from '@/components/compare/tour/tour';
import useWindowSize from '@/components/window-size';

import { getTourConfig } from '@/components/compare/tour/tourConfig';

import styles from '@/styles/Home.module.css'
import tourStyles from '@/styles/tour.module.css';

import { CITY_DATA } from '@/data/citydata';

const buttonProps = {
    first: "home",
    second: "map",
    third: "transform"
}

export default function Home() {

    const [idx, setIdx] = useState(0);
    const [cityData, setCityData] = useState(CITY_DATA.citiesArray[idx]);

    const [layer, setLayer] = useState("social_index"); // options[0] in layerlist.tsx
    const [layer2, setLayer2] = useState("");
    const [numLayers, setNumLayers] = useState("Single");
    const numLayersOptions = ["Single", "Paired"];

    const [explain, setExplain] = useState(false);
    const [sortOpt, setSortOpt] = useState("increasing");
    const [meanVals, setMeanVals] = useState(true);

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
    }
    const handleLayerChange = (layer: string) => {
        setLayer(layer);
    }
    const handleLayer2Change = (layer2: string) => {
        setLayer2(layer2);
    }
    const handleNumLayersChange = (numLayers: string) => {
        setNumLayers(numLayers);
    }
    const handleExplainChange = (e: any) => {
        setExplain(!explain);
    }
    const handleSortChange = (sortOpt: string) => {
        setSortOpt (sortOpt)
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
    const [isTourOpen, setTourOpen] = useState(true);

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
                idx = {idx}
                layer1 = {layer}
                layer2 = {layer2}
                numLayers = {numLayers}
                meanVals = {meanVals}
                sortOpt = {sortOpt}
                citiesArray = {CITY_DATA.citiesArray}
            />
            <Control
                idx = {idx}
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
            />
            <Buttons buttons={buttonProps} />
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
        </main>
        </>
    )
}
