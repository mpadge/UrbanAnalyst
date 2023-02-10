
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {Map} from "react-map-gl";
import Control from './control';
import UTAMap from './map';

import {paletteInferno} from "./palettes.tsx"

const Page: NextPage = () => {

    const [city, setCity] = useState(cities[0]);

    console.log("city path = ", city.path)

    const control = <Control />;

    return (
        <>
        <UTAMap
            city = {city}
        />
        {control}
        </>
        )
};
export default Page;

const cities = [
    { name: 'Berlin', path: '@/data/berlin/berlin.json' },
    { name: 'Paris', path: '@/data/paris/paris.json' },
    { name: 'Hamburg', path: '@/data/hamburg/hamburg.json' },
];
