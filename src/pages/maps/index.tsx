
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {Map} from "react-map-gl";
import Control from './control';
import UTAMap from './map';

import { paletteInferno } from "./palettes";
import { CITY_DATA, DEFAULT_MAP_CONFIG } from './citydata';
import { CityData, CitiesData } from "./interfaces";

const Page: NextPage = (props: { citiesData }) => {

    const [idx, setIdx] = useState(0);
    const [cityData, setCityData] = useState(props.citiesData.Data[idx]);
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: DEFAULT_MAP_CONFIG.initialViewport.latitude,
        longitude: DEFAULT_MAP_CONFIG.initialViewport.longitude,
        zoom: DEFAULT_MAP_CONFIG.initialViewport.zoom
    });

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
    }

    return (
        <>
        <UTAMap
            idx = {idx}
            citiesData = {props.citiesData}
        />
        <Control
            idx = {idx}
            citiesData = {props.citiesData}
            handleIdxChange = {handleIdxChange}
        />
        </>
        )
};
export default Page;

export async function getStaticProps() {

    const citiesData = CITY_DATA;

    return {
        props: {
            citiesData: citiesData
        }
    }
}
