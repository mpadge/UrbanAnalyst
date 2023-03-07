
import {useState} from 'react';
import Link from 'next/link'
import styles from '@/styles/buttons.module.css';

export default function Buttons () {

    return (
        <>
        <div id="top-right-container" className={styles.buttons}>
            <div id="maps-button">
                <Link
                    href="/maps"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                <p> Maps </p>
                </Link>
            </div>

            <div id="sstats-button">
                <Link
                    href="/stats"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                <p> Stats </p>
                </Link>
            </div>
        </div>
        </>
        )
};
