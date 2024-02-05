"use client"

import Image from 'next/image'

import { useEffect, useState } from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { DeckGL } from "@deck.gl/react/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import { Map } from "react-map-gl";

import Control from '@/components/maps/control';
import Legend from '@/components/maps/legend';
import UTAMap from '@/components/maps/map';
import Buttons from '@/components/buttons3';
import Tour from '@/components/maps/tour';
import useWindowSize from '@/components/window-size';
import { getTourConfig } from '@/components/maps/tourConfig';
import { HeadingTextOneLayer, HeadingText } from "@/components/heading_text";
import { GlobalStateProvider, useGlobalState } from '@/context/GlobalStateContext';
import styles from '@/styles/maps.module.css';

import { CITY_DATA, DEFAULT_MAP_CONFIG } from '@/data/citydata';
import { ViewState } from "@/data/interfaces";

const buttonProps = {
    first: "home",
    second: "stats",
    third: "transform"
}

export default function MapPage() {

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

    const heading: string = HeadingText(layer, layer2, numLayers, CITY_DATA.citiesArray);

    // ----- TOUR -----
    const size = useWindowSize();
    const width = size?.width || 1000;
    const tourConfig = getTourConfig(width);

    const accentColor = "#5cb7b7";
    const [isTourOpen, setTourOpen] = useState(false);

    const handleClickOpen = () => {
        setTourOpen(true);
    };

    const { globalState, setMapTour, setExampleVariable } = useGlobalState();
    const closeTour = () => {
        const mt = globalState.mapTour;
        console.log('-----MAP: Current context value:', { mt, setMapTour });
        console.log("   Calling setMapTour: ", globalState.mapTour);
        setMapTour(false);
        console.log("   Immediately after setMapTour: ", globalState.mapTour);
        setTourOpen(false);
        console.log("------ STATE TOUR UPDATED ON CLOSE: ", globalState.mapTour);
    };

    const openTour = () => {
        handleClickOpen();
        setTourOpen(true);
    };

    // console.log("------ STATE VAR: ", globalState.exampleVariable);
    console.log("------ STATE TOUR: ", globalState.mapTour);
    useEffect(() => {
        if (globalState.mapTour) {
            setTourOpen(true);
            setMapTour(false);
            console.log("------ STATE TOUR UPDATE: ", globalState.mapTour);
        }
    }, [globalState.mapTour, setMapTour]);

    useEffect(() => {
            console.log('mapTour state has changed:', globalState.mapTour);
    }, [globalState.mapTour]);

    return (
        <GlobalStateProvider>
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
            handleAlphaChange = {handleAlphaChange}
            handleViewStateChange = {handleViewStateChange}
            handleLayerChange = {handleLayerChange}
            handleLayer2Change = {handleLayer2Change}
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
        <Tour
            onRequestClose={closeTour}
            disableInteraction={false}
            steps={tourConfig}
            isOpen={isTourOpen}
            maskClassName={styles.tourmask}
            className={styles.tourhelper}
            rounded={5}
            accentColor={accentColor}
        />
        </GlobalStateProvider>
    )
}
