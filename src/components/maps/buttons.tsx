
import {useState} from 'react';
import Link from 'next/link'
import styles from '@/styles/buttons.module.css';

export default function Buttons () {

    return (
        <>
        <div id="top-right-container" className={styles.buttons}>
            <div id="home-button">
                <Link
                    href="/"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                <p> Home </p>
                </Link>
            </div>

            <div id="stats-button">
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
