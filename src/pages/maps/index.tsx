
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {Map} from "react-map-gl";
import Control from './control';
import UTAMap from './map';

import {paletteInferno} from "./palettes.tsx"

const Page: NextPage = ({ citiesData }) => {

    const [idx, setIdx] = useState(0);
    const [cityData, setCityData] = useState(citiesData[idx]);

    return (
        <>
        <UTAMap
            idx = {idx}
            citiesData = {citiesData}
        />
        <Control
            idx = {idx}
            citiesData = {citiesData}
        />
        </>
        )
};
export default Page;

import fs from 'fs';
import path from 'path';
export async function getStaticProps() {
    const dataDir = path.join(process.cwd(), 'data');
    const cityNames = fs.readdirSync(dataDir, { withFileTypes: true })
        .filter((item) => item.isDirectory())
            .map((item) => item.name);

    const citiesData = cityNames.map((item) => ({
        name: item,
        nameformatted: item.charAt(0).toUpperCase() + item.slice(1),
        path: '/data/' + item + '/data.json'
    }));

    return {
        props: {
            citiesData: citiesData
        }
    }
}
