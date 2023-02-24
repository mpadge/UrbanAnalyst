
import Head from 'next/head'
import {NextPage} from "next";
import {useState} from "react";
import Buttons from '@/components/stats/buttons';
import Stats from '@/components/stats/stats';
import styles from '@/styles/Home.module.css'

import { CITY_DATA } from '@/data/citydata';
import { CityDataProps, CitiesDataProps, ViewState } from "@/data/interfaces";

const Page: NextPage<CitiesDataProps> = (props: CitiesDataProps) => {

    const [idx, setIdx] = useState(0);
    const [cityData, setCityData] = useState(props.citiesArray[idx]);

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
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
                citiesArray = {props.citiesArray}
            />
            <Buttons />
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
