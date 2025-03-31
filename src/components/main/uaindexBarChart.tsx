"use client"

import React, { useState, useEffect, useRef, Suspense } from 'react';
import * as d3 from 'd3';
import Link from 'next/link'

import styles from '@/styles/compare.module.css';
import useWindowSize from '@/components/windowSize';

async function LoadData(
    setData: (data: any) => void,
) {
    const dataSourcePath = "/data/ua-index.json";
    const data = await fetch(dataSourcePath)
        .then(response => response.json())
        .catch((error) => console.error('Error fetching UA index data:', error));

    setData(data);

    return null;
}

export default function UABarChart () {

    const [data, setData] = useState<number | null>(null);
    useEffect(() => {
        LoadData(setData);
    }, []);
    // console.log("----- data = " + JSON.stringify(data, null, 4));

    return (
        <>
            <div id="ua-index-chart" className={styles.comparepage}>

            </div>
        </>
    )
};
