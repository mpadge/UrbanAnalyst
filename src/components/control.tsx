
import {useState} from 'react';
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import CityShow from './city-show';
import CityList from './citylist';
import { ControlProps } from "./interfaces";

export default function Control (props: ControlProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const cityNames = props.citiesArray.map((item) => item.name);

    console.log("---->Control: viewport lon = " + props.viewport.longitude)

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
            citiesArray={props.citiesArray}
            idx={props.idx}
            viewport = {props.viewport}
            handleIdxChange={props.handleIdxChange}
            handleViewportChange={props.handleViewportChange}
            // onSelect={city => props.handleIdxChange(props.idx)}
        />
        <CityShow
            citiesArray={props.citiesArray}
            idx={props.idx}
        />
        </div>
        )
};
