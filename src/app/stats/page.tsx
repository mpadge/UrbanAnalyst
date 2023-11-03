"use client"

import Head from 'next/head'
import {NextPage} from "next";
import {useState} from "react";
import Control from '@/components/stats/control';
import Buttons from '@/components/buttons2';
import BarChart from '@/components/stats/stats';
import styles from '@/styles/Home.module.css'

import { CITY_DATA } from '@/data/citydata';

const buttonProps = {
    first: "home",
    second: "maps"
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

    const buttons = {
        first: "home",
        second: "maps"
    }
    
    return (
        <>
        <Head>
            <title>UA Stats</title>
            <meta name="description" content="Stats for Urban Analyst" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/ua.ico" />
        </Head>
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
            <Buttons buttons={buttons} />
        </main>
        </>
    )
}
