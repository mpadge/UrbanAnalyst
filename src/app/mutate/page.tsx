"use client"

import Head from 'next/head'
import Image from 'next/image'
import { useState} from 'react';
import { FlyToInterpolator } from "@deck.gl/core/typed";
import Control from '@/components/maps/control';
import Legend from '@/components/maps/legend';

// import UTAMap from '@/components/maps/map';
import MapMutateCalculate from '@/components/maps/map-mutate';
import styles from '@/styles/maps.module.css';
import { CITY_DATA } from '@/data/citydata';
import { ViewState } from "@/data/interfaces";

export default function Home() {

    const idx = 0;
    const varnames = ["bike_index", "social_index"];
    const nentries = 1000;
    const mapPath = "/data/berlin/data.json";
    const alpha = 0.7;

    const [viewState, setViewState] = useState({
        ...CITY_DATA.citiesArray[idx].initialViewState,
        pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
    });

    const [layerMin, setLayerMin] = useState<number>(0);
    const [layerMax, setLayerMax] = useState<number>(0);
    const handleLayerMinChange = (layerMin: number) => {
        setLayerMin(layerMin);
    }
    const handleLayerMaxChange = (layerMax: number) => {
        setLayerMax(layerMax);
    }

    return (
        <>
        <MapMutateCalculate
            idx={idx}
            varnames={varnames}
            nentries={nentries}
            mapPath={mapPath}
            citiesArray = {CITY_DATA.citiesArray}
            viewState = {viewState}
            alpha = {alpha}
            layerMin={layerMin}
            layerMax={layerMax}
            handleLayerMinChange={handleLayerMinChange}
            handleLayerMaxChange={handleLayerMaxChange}
        />
        </>
    )
}