
import {useState} from 'react';
import Link from 'next/link'
import styles from '@/styles/buttons.module.css';

export default function Buttons () {

    return (
        <>
        <div id="top-right-container" className={styles.topright90}>
        <Link
            href="/"
            className={styles.card}
            rel="noopener noreferrer"
        >
        <p> Home </p>
        </Link>
        </div>

        <div id="top-right-container" className={styles.topright80}>
        <Link
            href="/maps"
            className={styles.card}
            rel="noopener noreferrer"
        >
        <p> Maps </p>
        </Link>
        </div>
        </>
        )
};
