
import {useState} from 'react';
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

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
            href="/stats"
            className={styles.card}
            rel="noopener noreferrer"
        >
        <p> Stats </p>
        </Link>
        </div>
        </>
        )
};