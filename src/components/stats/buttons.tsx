
import {useState} from 'react';
import Link from 'next/link'
import styles from '@/styles/buttons.module.css';

export default function Buttons () {

    return (
        <>
        <div id="top-right-container" className={styles.buttons}>
            <div id="home button">
                <Link
                    href="/"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                <p> Home </p>
                </Link>
            </div>

            <div id="maps button">
                <Link
                    href="/maps"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                <p> Maps </p>
                </Link>
            </div>
        </div>
        </>
        )
};
