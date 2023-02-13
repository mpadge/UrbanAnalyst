
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {Map} from "react-map-gl";
import Control from './control';
import UTAMap from './map';

import {paletteInferno} from "./palettes.tsx";

const Page: NextPage = ({ citiesData }) => {

    const [idx, setIdx] = useState(0);
    const [cityData, setCityData] = useState(citiesData[idx]);

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
    }

    return (
        <>
        <UTAMap
            idx = {idx}
            citiesData = {citiesData}
        />
        <Control
            idx = {idx}
            citiesData = {citiesData}
            handleIdxChange = {handleIdxChange}
        />
        </>
        )
};
export default Page;

import fs from 'fs';
import path from 'path';
export async function getStaticProps() {

    const dataDir = path.join(process.cwd(), 'public', 'data');
    const cityNames = fs.readdirSync(dataDir, { withFileTypes: true })
        .filter((item) => item.isDirectory())
            .map((item) => item.name);

    const viewports = xy;

    const citiesData = cityNames.map((item, index) => ({
        name: item,
        nameformatted: item.charAt(0).toUpperCase() + item.slice(1),
        path: '/data/' + item + '/data.json',
        lat: xy.ViewPorts[index].initialViewport.latitude,
        lon: xy.ViewPorts[index].initialViewport.longitude,
        zoom: xy.ViewPorts[index].initialViewport.zoom
    }));


    return {
        props: {
            citiesData: citiesData
        }
    }
}


const xy = {
    "ViewPorts": [
        { 
            "name": "berlin", 
            "initialViewport": {
                "latitude": 52.5,
                "longitude": 13.4,
                "zoom": 10
            }
        },
        { 
            "name": "hamburg", 
            "initialViewport": {
                "latitude": 54.5,
                "longitude": 12.4,
                "zoom": 11
            }
        },
        { 
            "name": "paris", 
            "initialViewport": {
                "latitude": 52.5,
                "longitude": 11.4,
                "zoom": 11
            }
        }
    ]
};
