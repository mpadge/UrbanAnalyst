"use client"

import { useEffect, useState } from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { DeckGL } from "@deck.gl/react/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import { Map } from "react-map-gl";

import Control from '@/components/map/control';
import Legend from '@/components/map/legend';
import UTAMap from '@/components/map/map';
import Buttons from '@/components/buttons4';
import Tour from '@/components/map/tour/tour';
import useWindowSize from '@/components/window-size';
import { getTourConfig } from '@/components/map/tour/tourConfig';
import { HeadingTextOneLayer, HeadingText } from "@/components/heading_text";
import styles from '@/styles/map.module.css';
import tourStyles from '@/styles/tour.module.css';

import { CITY_DATA, DEFAULT_MAP_CONFIG } from '@/data/citydata';
import { ViewState } from "@/data/interfaces";

const buttonProps = {
    first: "home",
    second: "summarise",
    third: "compare",
    fourth: "transform"
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

    useEffect(() => {
        var idxLocal = 0;
        var layerLocal = "social_index";
        var layer2Local = "";
        var numLayersLocal = "Single";
        if (typeof window != "undefined") {
            const storedIdx = localStorage.getItem('uaCityIdx');
            if(storedIdx) { // convert to int
                idxLocal = parseInt(storedIdx, 10);
                if (isNaN(idxLocal)) {
                    idxLocal = 0;
                }
            }
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
        }
        setIdx(idxLocal);
        setCityData(CITY_DATA.citiesArray[idxLocal]);
        setViewState({
            ...CITY_DATA.citiesArray[idxLocal].initialViewState,
            pitch: 0,
            bearing: 0,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator()
        })
        setLayer(layerLocal);
        setLayer2(layer2Local);
        setNumLayers(numLayersLocal);
    }, [])

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
        setCityData(CITY_DATA.citiesArray[idx]);
        setViewState({
            ...CITY_DATA.citiesArray[idx].initialViewState,
            pitch: 0,
            bearing: 0,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator()
        })
        if (typeof window != "undefined") {
            localStorage.setItem("uaCityIdx", idx.toString());
        }
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
    const handleExplainChange = (e: any) => {
        setExplain(!explain);
    }
    const handleNumLayersChange = (numLayers: string) => {
        setNumLayers(numLayers);
        if (typeof window != "undefined") {
            localStorage.setItem("uaNumLayers", numLayers);
        }
    }

    const heading: string = HeadingText(layer, layer2, numLayers, CITY_DATA.citiesArray);

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
            sessionStorage.setItem("uamaptour", "done");
        }
    };

    useEffect(() => {
        if(!sessionStorage.getItem('uamaptour')) {
            setTourOpen(true)
        }
    }, [])
    // ----- TOUR end-----

    return (
        <>
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
            handleTourOpen = {handleTourOpen}
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
            maskClassName={tourStyles.tourmask}
            className={tourStyles.tourhelper}
            rounded={5}
            accentColor={accentColor}
        />
        </>
    )
}
