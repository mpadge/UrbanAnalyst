
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {Map} from "react-map-gl";
import Control from '@/components/control';
import UTAMap from '@/components/map';

import { paletteInferno } from "@/components/palettes";
import { CITY_DATA, DEFAULT_MAP_CONFIG } from '@/components/citydata';
import { CityDataProps, CitiesDataProps, Viewport } from "@/components/interfaces";

const Page: NextPage<CitiesDataProps> = (props: CitiesDataProps) => {

    const [idx, setIdx] = useState(0);
    const [cityData, setCityData] = useState(props.citiesArray[idx]);
    const [viewport, setViewport] = useState({...props.citiesArray[idx].initialViewport,
        pitch: 0,
        bearing: 0 });

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
    }
    const handleViewportChange = (pViewport: any) => {
        //setViewport((prevViewport) => { return { ...prevViewport, ...pViewport }; });
        setViewport(pViewport);
    }

    console.log('In index: viewport lon = ' + viewport.longitude);

    return (
        <>
        <UTAMap
            idx = {idx}
            citiesArray = {props.citiesArray}
            viewport = {viewport}
            handleViewportChange = {handleViewportChange}
        />
        <Control
            idx = {idx}
            citiesArray = {props.citiesArray}
            viewport = {viewport}
            handleIdxChange = {handleIdxChange}
            handleViewportChange = {handleViewportChange}
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
