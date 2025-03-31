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

    const rangeExpand = 1.5;
    const xMin = 0;
    const xMax = data ? data.map((i) => i.score).reduce((a, b) => Math.max(a, b)) : null;
    const xRange = xMax - xMin;

    console.log("----- data [min, max] = [" + xMin + "," + xMax + "]");

    const size = useWindowSize();

    const defaultWidth = 1000;
    const defaultHeight = 700;
    var widthTemp = defaultWidth;
    var heightTemp = defaultHeight;
    const margin = { top: 50, right: 95, bottom: 60, left: 50 };
    if (size.width !== null) {
        widthTemp = Math.min(widthTemp, size.width)
    }
    const width = widthTemp;
    const height = heightTemp;
    const innerWidth = width - margin.right - 2 * margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    const xAxisPadding = 10;
    const yAxisPadding = 10;
    const yTickSize = 0;

    // palettes:
    // https://github.com/d3/d3-scale-chromatic
    // This palette is expanded slightly because otherwise the upper limit
    // (here, xMax) is white. Expanding ensures that it is also a blue shade.
    const paletteExpand = 0.2;
    const xMaxExpand = xMax + paletteExpand * (xMax - xMin);
    var colourPalette = d3
        .scaleSequential().domain([ xMaxExpand, xMin])
        .interpolator(d3.interpolateBlues)

    const svgRef = React.useRef<SVGSVGElement>(null);

    // X-axis:
    const xValue = (d: any) => d.score;
    const expandRHS = 1.05; // Expand right-hand edge beyond max observed value
    const xMax2 = Math.max(0,xMin) + (xMax - Math.max(0,xMin)) * expandRHS;
    const xScale = d3
        .scaleLinear()
        .domain([xMin, xMax2])
        .range([xMin, innerWidth])
        .nice();

    // Y-axis
    const yValue = (d: any) => d.city;
    const yScale = d3
        .scaleBand()
        .domain([0, yValue.length])
        .range([0, innerHeight])
        .padding(0.2);

    useEffect(() => {

        const svg = d3.select(svgRef.current as any);
        svg.selectAll('*').remove();
    });


    return (
        <>
            <div id="ua-index-chart" className={styles.comparepage}>

            </div>
        </>
    )
};
