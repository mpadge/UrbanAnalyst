"use client"

import Image from 'next/image'

import { useState} from 'react';
import { FlyToInterpolator } from "@deck.gl/core/typed";

import Control from '@/components/maps/control';
import LegendTransform from '@/components/transform/legend-transform';

// import UTAMap from '@/components/maps/map';
import MapTransformCalculate from '@/components/transform/map-transform';
import styles from '@/styles/maps.module.css';
import { CITY_DATA } from '@/data/citydata';
import { ViewState } from "@/data/interfaces";

export default function MapTransformPage() {

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
    const [alpha, setAlpha] = useState(0.5);

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

    const varnames = ["bike_index", "social_index"];
    const nentries = 1000;
    const mapPath = "/data/berlin/data.json";

    const layer_name = varnames[0];

    const [layerMin, setLayerMin] = useState<number>(0);
    const [layerMax, setLayerMax] = useState<number>(0);
    const handleLayerMinChange = (layerMin: number) => {
        setLayerMin(layerMin);
    }
    const handleLayerMaxChange = (layerMax: number) => {
        setLayerMax(layerMax);
    }
    const [layerName, setLayerName] = useState<string>("bike_index");

    return (
        <>
        <MapTransformCalculate
            idx={idx}
            varnames={varnames}
            nentries={nentries}
            city = {CITY_DATA.citiesArray[idx].name}
            viewState = {viewState}
            alpha = {alpha}
            layerMin={layerMin}
            layerMax={layerMax}
            handleLayerMinChange={handleLayerMinChange}
            handleLayerMaxChange={handleLayerMaxChange}
        />
        <LegendTransform
            layerMin={layerMin}
            layerMax={layerMax}
            alpha={alpha}
            layer_name={layer_name}
        />
        </>
    )
}