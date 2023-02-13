
import {useState} from 'react';
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import CityShow from './city-show.tsx';
import CityList from './citylist';

export default function Control ({ idx, citiesData, handleIdxChange }) {

    const [cityData, setCityData] = useState(citiesData[idx]);

    const cityNames = citiesData.map((item) => item.name);

    console.log("IDX in Control: " + idx)

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
            citiesData={citiesData}
            idx={idx}
            handleIdxChange={handleIdxChange}
            onSelect={city => handleIdxChange(idx)}
        />
        <CityShow
            citiesData={citiesData}
            idx={idx}
        />
        </div>
        )
};
