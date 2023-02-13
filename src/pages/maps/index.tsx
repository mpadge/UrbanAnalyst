
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {Map} from "react-map-gl";
import Control from './control';
import UTAMap from './map';

import {paletteInferno} from "./palettes.tsx"

const Page: NextPage = ({ cities, citiesFormatted, cityPaths }) => {

    const [idx, setIdx] = useState(0);
    const [city, setCity] = useState(cities[idx]);
    const [path, setPath] = useState(cityPaths[idx]);

    console.log("city path = ", cityPaths[idx])

    const control = <Control />;

    return (
        <>
        <UTAMap
            idx = {idx}
            cities = {cities}
            cityPaths = {cityPaths}
        />
        {control}
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
    const cityNamesFormatted = cityNames.map((item) =>
        (item.charAt(0).toUpperCase() + item.slice(1)));
    const paths = cityNames.map((item) =>
        ('/data/' + item + '/data.json'));
    return {
        props: {
            cities: cityNames,
            citiesFormatted: cityNamesFormatted,
            cityPaths: paths
        }
    }
}
