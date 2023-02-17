
import {useState} from 'react';
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import CityList from '@/components/citylist';
import { ControlProps } from "./interfaces";

export default function Control (props: ControlProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const cityNames = props.citiesArray.map((item) => item.name);

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

        <h2>City</h2>
        <CityList
            citiesArray={props.citiesArray}
            idx={props.idx}
            viewState = {props.viewState}
            handleIdxChange={props.handleIdxChange}
            handleViewStateChange={props.handleViewStateChange}
            // onSelect={city => props.handleIdxChange(props.idx)}
        />
        </div>
        )
};
