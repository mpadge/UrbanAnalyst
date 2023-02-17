
import Head from 'next/head'
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {FlyToInterpolator} from "@deck.gl/core/typed";
import {Map} from "react-map-gl";
import Control from '@/components/control';
import UTAMap from '@/components/map';

import { paletteInferno } from "@/components/palettes";
import { CITY_DATA, DEFAULT_MAP_CONFIG } from '@/components/citydata';
import { CityDataProps, CitiesDataProps, ViewState } from "@/components/interfaces";

const Page: NextPage<CitiesDataProps> = (props: CitiesDataProps) => {

    const [idx, setIdx] = useState(0);
    const [cityData, setCityData] = useState(props.citiesArray[idx]);
    const [viewState, setViewState] = useState({
        ...props.citiesArray[idx].initialViewState,
        pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
    });
    const [layerState, setLayerState] = useState([]);

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
    }
    const handleViewStateChange = (pViewState: any) => {
        setViewState((prevViewState) => { return { ...prevViewState, ...pViewState }; });
        //setViewState(pViewState);
    }
    const handleLayerChange = (layer: any) => {
        setLayerState(layer);
    }

    console.log('In index: ViewState lon = ' + viewState.longitude);

    return (
        <>
        <Head>
            <title>UTA Maps</title>
            <meta name="description" content="Maps for Urban Transport Analyst" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <UTAMap
            idx = {idx}
            citiesArray = {props.citiesArray}
            viewState = {viewState}
            handleViewStateChange = {handleViewStateChange}
        />
        <Control
            idx = {idx}
            citiesArray = {props.citiesArray}
            viewState = {viewState}
            handleIdxChange = {handleIdxChange}
            handleViewStateChange = {handleViewStateChange}
            handleLayerChange = {handleLayerChange}
        />
        </>
        )
};
export default Page;

export async function getStaticProps() {

    const city_data = CITY_DATA;

    return {
        props: {
            citiesArray: city_data.citiesArray
        }
    }
}
