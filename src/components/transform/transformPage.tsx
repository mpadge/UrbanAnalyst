"use client"

import { useEffect, useState} from 'react';
import { FlyToInterpolator } from "@deck.gl/core/typed";

import Control from '@/components/transform/control';
import Legend from '@/components/transform/legend';
import Buttons from '@/components/buttons4';
import Tour from '@/components/transform/tour/tour';
import useWindowSize from '@/components/windowSize';

import { CityDataProps } from "@/data/interfaces";
import MapTransformDynamic from '@/components/transform/transformPageDynamic';
import { getTourConfig } from '@/components/transform/tour/tourConfig';
import { CITY_DATA } from '@/data/citydata';
import { ViewState } from "@/data/interfaces";

import tourStyles from '@/styles/tour.module.css';

const buttonProps = {
    first: "home",
    second: "summarise",
    third: "map",
    fourth: "compare"
}

/**
 * Definition of interface for `TransformProps`. These are constructed in
 * {@link TransformPage} and passed through to `TransformDynamic`, which
 * passes straight through to `TransformComponent`. Individual props are:
 *
 * - `idx`: The integer defining the city from the full `CITY_DATA.citiesArray`.
 * - `idx2`: The equivalent integer defining the *target* city.
 * - `layer`: The string defining the single layer to be transformed.
 * - `varnames`: Array of variable names also passed to the transform algorith,
 *   so transformation of `layer` also minimises the multi-variate distance to
 *   all variables defined here.
 * - `calculate`: A boolean flag used to trigger calculations (will be
 *   removed).
 * - `citiesArray`: Static array of all data for all cities, read from main
 *   `/data` directory.
 * - `city`: String representing name of city, read from `citiesArray[idx]`.
 * - `targetCity`: Equivalent string for target city.
 * - `alpha`: Opacity for visual plotting of DeckGL layer.
 * - `layerMin`: Minimum value to be plotted on DeckGL layer.
 * - `layerMax`: Maximum value to be plotted on DeckGL layer.
 * - `layerRange`: Not yet fully implemented.
 * - `outputLayer`: Control for which layer should appear on main `transform`
 *   page: "Original", "Transformed", "Absolute", or "Relative".
 */
export interface TransformProps {
    idx: number
    idx2: number
    layer: string
    varnames: string[]
    calculate: boolean,
    storeGeoJsonResult: boolean,
    citiesArray: CityDataProps[],
    city: string
    targetCity: string
    viewState: ViewState
    alpha: number
    layerMin: number
    layerMax: number
    layerRange: number[],
    outputLayer: string
    handleLayerRangeChange: (layerRange: number[]) => void
    handleCalculateChange: (calculate: boolean) => void
    handleStoreGeoJsonResultChange: (storeGeoJsonResult: boolean) => void
    handleOutputLayerChange: (outputLayer: string) => void
}

/**
 * Main Transform Page component
 *
 * @remark This uses the {@link TransformProps} interface to construct all
 * props and pass on to both `transformComponent` and `control`.
 */
export default function TransformPage() {

    // -------- state variables --------
    const [idx, setIdx] = useState(0);
    const [idx2, setIdx2] = useState(1); // Target City
    const [viewState, setViewState] = useState({
        ...CITY_DATA.citiesArray[idx].initialViewState,
        pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
    });
    const [layer, setLayer] = useState("bike_index");
    const [alpha, setAlpha] = useState(0.5);
    const [layerMin, setLayerMin] = useState<number>(0);
    const [layerMax, setLayerMax] = useState<number>(0);
    const [layerRange, setLayerRange] = useState<number[]>([0, 1]);

    const [calculate, setCalculate] = useState<boolean>(false);
    const [storeGeoJsonResult, setStoreGeoJsonResult] = useState<boolean>(false);
    const [varnames, setVarnames] = useState<string[]>([]);
    const [outputLayer, setOutputLayer] = useState<string>("relative");
    const [cityLayers, setCityLayers] = useState<string[]>([]);

    useEffect(() => {
        var idxLocal = 0;
        var idx2Local = 1;
        var layerLocal = "social_index";
        var alphaLocal = 0.5;
        if (typeof window != "undefined") {
            const storedIdx = localStorage.getItem('uaCityIdx');
            if(storedIdx) { // convert to int
                idxLocal = parseInt(storedIdx, 10);
                if (isNaN(idxLocal)) {
                    idxLocal = 0;
                }
            }
            const storedIdx2 = localStorage.getItem('uaCityIdx2');
            if(storedIdx2) { // convert to int
                idx2Local = parseInt(storedIdx2, 10);
                if (isNaN(idx2Local)) {
                    idx2Local = 0;
                }
            }
            const storedLayer = localStorage.getItem('uaLayer');
            if(storedLayer) {
                layerLocal = storedLayer;
            }
            const storedAlpha = localStorage.getItem('uaAlpha');
            if(storedAlpha) {
                alphaLocal = parseFloat(storedAlpha);
                if (isNaN(alphaLocal)) {
                    alphaLocal = 0.5;
                }
            }
        }
        setIdx(idxLocal);
        setIdx2(idx2Local);
        setViewState({
            ...CITY_DATA.citiesArray[idxLocal].initialViewState,
            pitch: 0,
            bearing: 0,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator()
        })
        setLayer(layerLocal);
        setAlpha(alphaLocal);

        const theseLayers = Object.keys(CITY_DATA.citiesArray[idxLocal].dataRanges);
        setCityLayers(theseLayers);
        if (!theseLayers.includes(layerLocal)) {
            layerLocal = "social_index";
            setLayer(layerLocal);
            localStorage.removeItem('uaLayer');
        }
    }, [])

    // -------- handlers for state variables --------
    const handleIdxChange = (idx: number) => {
        setIdx(idx);
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
        const theseLayers = Object.keys(CITY_DATA.citiesArray[idx].dataRanges);
        if (!theseLayers.includes(layer)) {
            setLayer("social_index");
            localStorage.removeItem('uaLayer');
        }
    }
    const handleIdx2Change = (idx2: number) => {
        setIdx2(idx2);
        if (typeof window != "undefined") {
            localStorage.setItem("uaCityIdx2", idx2.toString());
        }
    }
    const handleViewStateChange = (pViewState: any) => {
        setViewState((prevViewState) => { return { ...prevViewState, ...pViewState }; });
    }
    const handleLayerChange = (layer: string) => {
        setLayer(layer);
        if (typeof window != "undefined") {
            localStorage.setItem("uaLayer", layer);
        }
    }

    const handleAlphaChange = (alpha: number) => {
        setAlpha(alpha);
        if (typeof window != "undefined") {
            localStorage.setItem("uaAlpha", alpha.toString());
        }
    }
    const handleLayerRangeChange = (layerRange: number[]) => {
        setLayerMin(layerRange[0]);
        setLayerMax(layerRange[1]);
    }
    const handleCalculateChange = (calculate: boolean) => {
        setCalculate(calculate);
    }
    const handleStoreGeoJsonResultChange = (storeGeoJsonResult: boolean) => {
        setStoreGeoJsonResult(storeGeoJsonResult);
    }
    const handleVarnamesChange = (varnames: string[]) => {
        setVarnames(varnames);
    }
    const handleOutputLayerChange = (outputLayer: string) => {
        setOutputLayer(outputLayer);
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
            sessionStorage.setItem("uatransformtour", "done");
        }
    };

    useEffect(() => {
        if(!sessionStorage.getItem('uatransformtour')) {
            setTourOpen(true)
        }
    }, [])
    // ----- TOUR end-----

    return (
        <>
            <Buttons buttons={buttonProps} />
            <MapTransformDynamic
                idx={idx}
                idx2={idx2}
                layer={layer}
                varnames={varnames}
                calculate={calculate}
                storeGeoJsonResult={storeGeoJsonResult}
                citiesArray = {CITY_DATA.citiesArray}
                city = {CITY_DATA.citiesArray[idx].name}
                targetCity = {CITY_DATA.citiesArray[idx2].name}
                viewState = {viewState}
                alpha = {alpha}
                layerMin={layerMin}
                layerMax={layerMax}
                layerRange = {layerRange}
                outputLayer={outputLayer}
                handleLayerRangeChange={handleLayerRangeChange}
                handleCalculateChange={handleCalculateChange}
                handleStoreGeoJsonResultChange={handleStoreGeoJsonResultChange}
                handleOutputLayerChange={handleOutputLayerChange}
            />
            <Control
                idx={idx}
                idx2={idx2}
                layer={layer}
                varnames={varnames}
                alpha={alpha}
                citiesArray={CITY_DATA.citiesArray}
                cityLayers={cityLayers}
                viewState={viewState}
                outputLayer={outputLayer}
                handleIdxChange={handleIdxChange}
                handleIdx2Change={handleIdx2Change}
                handleAlphaChange={handleAlphaChange}
                handleViewStateChange={handleViewStateChange}
                handleLayerChange={handleLayerChange}
                handleVarnamesChange={handleVarnamesChange}
                handleOutputLayerChange={handleOutputLayerChange}
                handleTourOpen = {handleTourOpen}
            />
            <Legend
                layerRange={[layerMin, layerMax]}
                alpha={alpha}
                layer_name={layer}
            />
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
