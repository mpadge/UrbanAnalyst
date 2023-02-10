
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {Map} from "react-map-gl";
import Control from './control';
import UTAMap from './map';

import {paletteInferno} from "./palettes.tsx"

const Page: NextPage = () => {

    return (
        <>
        <UTAMap />
        <Control />
        </>
        )
};
export default Page;
