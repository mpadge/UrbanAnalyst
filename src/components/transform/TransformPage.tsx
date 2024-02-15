"use client"

import { useState} from 'react';
import { FlyToInterpolator } from "@deck.gl/core/typed";

import Control from '@/components/transform/control';
import Legend from '@/components/transform/legend';
import Buttons from '@/components/buttons3';

// import UTAMap from '@/components/map/map';
import MapTransformDynamic from '@/components/transform/TransformPageDynamic';
import { CITY_DATA } from '@/data/citydata';
import { ViewState } from "@/data/interfaces";

const buttonProps = {
    first: "home",
    second: "map",
    third: "compare"
}

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
    const [calculate, setCalculate] = useState<boolean>(true);
    const [varnames, setVarnames] = useState<string[]>([]);
    const [outputLayer, setOutputLayer] = useState<string>("relative");

    // -------- handlers for state variables --------
    const handleIdxChange = (idx: number) => {
        setIdx(idx);
    }
    const handleIdx2Change = (idx2: number) => {
        setIdx2(idx2);
    }
    const handleViewStateChange = (pViewState: any) => {
        setViewState((prevViewState) => { return { ...prevViewState, ...pViewState }; });
    }
    const handleLayerChange = (layer: string) => {
        setLayer(layer);
    }
    const handleAlphaChange = (alpha: number) => {
        setAlpha(alpha);
    }
    const handleLayerMinChange = (layerMin: number) => {
        setLayerMin(layerMin);
    }
    const handleLayerMaxChange = (layerMax: number) => {
        setLayerMax(layerMax);
    }
    const handleCalculateChange = (calculate: boolean) => {
        setCalculate(calculate);
    }
    const handleVarnamesChange = (varnames: string[]) => {
        setVarnames(varnames);
    }
    const handleOutputLayerChange = (outputLayer: string) => {
        setOutputLayer(outputLayer);
    }

    return (
        <>
        <Buttons buttons={buttonProps} />
        <MapTransformDynamic
            idx={idx}
            idx2={idx2}
            layer={layer}
            varnames={varnames}
            calculate={calculate}
            citiesArray = {CITY_DATA.citiesArray}
            city = {CITY_DATA.citiesArray[idx].name}
            targetCity = {CITY_DATA.citiesArray[idx2].name}
            viewState = {viewState}
            alpha = {alpha}
            layerMin={layerMin}
            layerMax={layerMax}
            outputLayer={outputLayer}
            handleLayerMinChange={handleLayerMinChange}
            handleLayerMaxChange={handleLayerMaxChange}
            handleCalculateChange={handleCalculateChange}
            handleOutputLayerChange={handleOutputLayerChange}
        />
        <Control
            idx={idx}
            idx2={idx2}
            layer={layer}
            varnames={varnames}
            calculate={calculate}
            alpha={alpha}
            citiesArray={CITY_DATA.citiesArray}
            viewState={viewState}
            outputLayer={outputLayer}
            handleIdxChange={handleIdxChange}
            handleIdx2Change={handleIdx2Change}
            handleAlphaChange={handleAlphaChange}
            handleViewStateChange={handleViewStateChange}
            handleLayerChange={handleLayerChange}
            handleCalculateChange={handleCalculateChange}
            handleVarnamesChange={handleVarnamesChange}
            handleOutputLayerChange={handleOutputLayerChange}
        />
        <Legend
            layerMin={layerMin}
            layerMax={layerMax}
            alpha={alpha}
            layer_name={layer}
        />
        </>
    )
}
