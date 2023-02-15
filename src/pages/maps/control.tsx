
import {useState} from 'react';
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import CityShow from './city-show';
import CityList from './citylist';
import { CityData, ControlProps } from "./interfaces";

export default function Control (props: ControlProps) {

    const [cityData, setCityData] = useState(props.citiesData[props.idx]);

    const cityNames = props.citiesData.map((item) => item.name);

    return (
        <div id="top-left-container" className={styles.topleft}>
        <h1>UTA</h1>
        <Link
            href="/"
            className={styles.card}
            rel="noopener noreferrer"
        >
        <p>
            Back
        </p>
        </Link>

        <h2>Cities</h2>
        <CityList
            citiesData={props.citiesData}
            idx={props.idx}
            handleIdxChange={props.handleIdxChange}
            onSelect={city => props.handleIdxChange(props.idx)}
        />
        <CityShow
            citiesData={props.citiesData}
            idx={props.idx}
        />
        </div>
        )
};
