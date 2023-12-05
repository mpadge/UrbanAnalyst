"use client"

import Head from 'next/head'
import Image from 'next/image'
import { useState } from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { DeckGL } from "@deck.gl/react/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import { Map } from "react-map-gl";
import Control from '@/components/maps/control';
import Legend from '@/components/maps/legend';
import UTAMap from '@/components/maps/map';
import Buttons from '@/components/buttons2';
import { HeadingTextOneLayer, HeadingText } from "@/components/heading_text";
import styles from '@/styles/maps.module.css';

import { CITY_DATA, DEFAULT_MAP_CONFIG } from '@/data/citydata';
import { ViewState } from "@/data/interfaces";

const buttonProps = {
    first: "home",
    second: "stats"
}

export default function Home() {

    const [idx, setIdx] = useState(0);
    const [cityData, setCityData] = useState(CITY_DATA.citiesArray[idx]);
    const [viewState, setViewState] = useState({
        ...CITY_DATA.citiesArray[idx].initialViewState,
        pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
    });
    const [layer, setLayer] = useState("social_index");
    const [layer2, setLayer2] = useState("");
    const [alpha, setAlpha] = useState(0.5);
    const [explain, setExplain] = useState(false);
    const [numLayers, setNumLayers] = useState("Single");
    const numLayersOptions = ["Single", "Paired"];

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
    }
    const handleAlphaChange = (alpha: number) => {
        setAlpha(alpha);
    }
    const handleViewStateChange = (pViewState: any) => {
        setViewState((prevViewState) => { return { ...prevViewState, ...pViewState }; });
        //setViewState(pViewState);
    }
    const handleLayerChange = (layer: string) => {
        setLayer(layer);
    }
    const handleLayer2Change = (layer2: string) => {
        setLayer2(layer2);
    }
    const handleExplainChange = (e: any) => {
        setExplain(!explain);
    }
    const handleNumLayersChange = (numLayers: string) => {
        setNumLayers(numLayers);
    }

    // Mutation variables
    const [mutate, setMutate] = useState(false);
    const handleMutateChange = (mutate: boolean) => {
        setMutate(mutate);
    }
    const [mutateTargetCity, setMutateTargetCity] = useState<string | null>(null);
    const handleMutateTargetCityChange = (mutateTargetCity: string) => {
        setMutateTargetCity(mutateTargetCity);
    }

    const heading: string = HeadingText(layer, layer2, numLayers, CITY_DATA.citiesArray);

    return (
        <>
        <Head>
            <title>UA Maps</title>
            <meta name="description" content="Maps for Urban Analyst" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="viewport"
                content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <link rel="icon" href="/ua.ico" />
        </Head>
        <div id="divinfo" style={{display: explain?"none":""}} >
            <div id="maps-heading" className={styles.mapsheading}>
                <p> {heading} </p>
            </div>
        </div>
        <UTAMap
            idx = {idx}
            layer = {layer}
            layer2 = {layer2}
            numLayers = {numLayers}
            alpha = {alpha}
            citiesArray = {CITY_DATA.citiesArray}
            viewState = {viewState}
            mutate = {mutate}
            mutateTargetCity = {mutateTargetCity}
            handleAlphaChange = {handleAlphaChange}
            handleViewStateChange = {handleViewStateChange}
            handleLayerChange = {handleLayerChange}
            handleLayer2Change = {handleLayer2Change}
            handleMutateChange = {handleMutateChange}
            handleMutateTargetCityChange = {handleMutateTargetCityChange}
        />
        <Control
            idx = {idx}
            layer = {layer}
            layer2 = {layer2}
            numLayers = {numLayers}
            numLayersOptions = {numLayersOptions}
            alpha = {alpha}
            explain = {explain}
            citiesArray = {CITY_DATA.citiesArray}
            viewState = {viewState}
            handleIdxChange = {handleIdxChange}
            handleNumLayersChange = {handleNumLayersChange}
            handleAlphaChange = {handleAlphaChange}
            handleViewStateChange = {handleViewStateChange}
            handleLayerChange = {handleLayerChange}
            handleLayer2Change = {handleLayer2Change}
            handleExplainChange = {handleExplainChange}
        />
        <Legend
            idx = {idx}
            layer = {layer}
            layer2 = {layer2}
            numLayers = {numLayers}
            alpha = {alpha}
            citiesArray = {CITY_DATA.citiesArray}
        />
        <Buttons buttons={buttonProps} />
        </>
    )
}
