
import Head from 'next/head'
import {NextPage} from "next";
import {useState} from "react";
import Control from '@/components/stats/control';
import Buttons from '@/components/buttons2';
import Stats from '@/components/stats/stats';
import styles from '@/styles/Home.module.css'

import { CITY_DATA } from '@/data/citydata';
import { CityDataProps, CitiesDataProps, ViewState } from "@/data/interfaces";

const Page: NextPage<CitiesDataProps> = (props: CitiesDataProps) => {

    const [idx, setIdx] = useState(0);
    const [cityData, setCityData] = useState(props.citiesArray[idx]);
    const [layer, setLayer] = useState("sd_uta2trans_rel"); // options[0] in layerlist.tsx
    const [explain, setExplain] = useState(false);

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
    }
    const handleLayerChange = (layer: string) => {
        setLayer(layer);
    }
    const handleExplainChange = (e: any) => {
        setExplain(!explain);
    }

    const buttons = {
        first: "home",
        second: "maps"
    }

    return (
        <>
        <Head>
            <title>UTA Maps</title>
            <meta name="description" content="Maps for Urban Transport Analyst" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/uta.ico" />
        </Head>
        <main className={styles.main}>
            <Stats
                idx = {idx}
                layer = {layer}
                citiesArray = {props.citiesArray}
            />
            <Control
                idx = {idx}
                layer = {layer}
                explain = {explain}
                citiesArray = {props.citiesArray}
                handleLayerChange = {handleLayerChange}
                handleExplainChange = {handleExplainChange}
            />
            <Buttons buttons={buttons} />
        </main>
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
