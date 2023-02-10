
import {useState} from 'react';
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import CityShow from './city-show.tsx';
import CityList from './citylist';

export default function Control (props:ControlBoxProps) {

    const [to, setTo] = useState(cities[0]);

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
            cities={cities}
            selectedCity={to}
            onSelect={city => setTo(city)}
        />
        <CityShow city={to} />
        </div>
        )
};

const cities = [
    { name: 'Berlin' },
    { name: 'Paris' },
    { name: 'Hamburg' }
];
