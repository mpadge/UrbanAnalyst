
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {Map} from "react-map-gl";
import Control from './control';
import UTAMap from './map';

import { paletteInferno } from "./palettes";
import { CITY_DATA, DEFAULT_MAP_CONFIG } from './citydata';
import { CityDataProps, CitiesDataProps } from "./interfaces";

const Page: NextPage<CitiesDataProps> = (props: CitiesDataProps) => {

    const [idx, setIdx] = useState(0);
    const [cityData, setCityData] = useState(props.citiesArray[idx]);
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
            citiesData = {props.citiesArray}
            initialViewport = {viewport}
        />
        <Control
            idx = {idx}
            citiesData = {props.citiesArray}
            handleIdxChange = {handleIdxChange}
        />
        </>
        )
};
export default Page;

export async function getStaticProps() {

    const citiesArray = CITY_DATA;

    return {
        props: {
            citiesArray: citiesArray
        }
    }
}
