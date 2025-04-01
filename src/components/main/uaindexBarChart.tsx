"use client"

import React, { useState, useEffect, useRef, Suspense } from 'react';
import * as d3 from 'd3';
import Link from 'next/link'

import styles from '@/styles/compare.module.css';
import useWindowSize from '@/components/windowSize';

interface indexDataProps {
    city: string,
    score: number
}

async function LoadData(
    setData: (data: [indexDataProps]) => void,
) {
    const dataSourcePath = "/data/ua-index.json";
    const data = await fetch(dataSourcePath)
        .then(response => response.json())
        .catch((error) => console.error('Error fetching UA index data:', error));

    setData(data);

    return null;
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function UABarChart () {

    const [data, setData] = useState<[indexDataProps] | null>(null);
    useEffect(() => {
        LoadData(setData);
    }, []);
    // console.log("----- data = " + JSON.stringify(data, null, 4));

    const [textColour, setTextColour] = useState('black');

    const size = useWindowSize();
    const defaultWidth = 1000;
    const defaultHeight = 700;
    const [width, setWidth] = useState<number>(size.width ? size.width : defaultWidth);
    const [height, setHeight] = useState<number>(size.height ? size.height : defaultHeight);

    const xMin = 0;
    const [xMax, setXMax] = useState<number>(2);
    const margin = { top: 50, right: 95, bottom: 60, left: 50 };

    useEffect(() => {
        if (data) {

            const rangeExpand = 1.5;
            const xMax = data.map((i) => i.score).reduce((a, b) => Math.max(a, b));
            setXMax(xMax);

            var widthTemp = defaultWidth;
            var heightTemp = defaultHeight;
            if (size.width !== null) {
                widthTemp = Math.min(widthTemp, size.width)
            }
            const width = widthTemp;
            const height = heightTemp;
            setWidth(width);
            setHeight(height);
        }
    }, [size, data, setWidth, setHeight, defaultWidth, defaultHeight, setXMax]);

    const svgRef = React.useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (data) {

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
            console.log("-----PALETTE DOMAIN = [" + xMin + ", " + xMaxExpand + "]")
            var colourPalette = d3
                .scaleSequential()
                .domain([ xMaxExpand, xMin])
                .interpolator(d3.interpolateBlues)

            // X-axis:
            const xValue = (d: indexDataProps) => d.score;
            const expandRHS = 1.05; // Expand right-hand edge beyond max observed value
            const xMax2 = Math.max(0,xMin) + (xMax - Math.max(0,xMin)) * expandRHS;
            const xScale = d3
                .scaleLinear()
                .domain([xMin, xMax2])
                .range([xMin, innerWidth])
                .nice();

            // Y-axis
            const yValue = (d: indexDataProps) => d.city;
            const yScale = d3
                .scaleBand()
                .domain(data.map(yValue))
                .range([0, innerHeight])
                .padding(0.2);

            const svg = d3.select(svgRef.current as any);
            svg.selectAll('*').remove();

            const handleDrawBars = (svg: any, colourPalette: any) => {
                svg
                    .selectAll('rect')
                    .data(data)
                    .join('rect')
                    .attr('fill', (d: any) => colourPalette(d.score))
                    .attr('stroke-width', 1)
                    .attr('stroke', '#718096')
                    .attr('height', yScale.bandwidth())
                    .attr('y', (d: any) => yScale(yValue(d)))
                    .on('mouseover', function(this: SVGRectElement) {
                        d3.select(this).style('fill', '#00a7e4');
                    })
                    .on('mouseout', function(this: SVGRectElement) {
                        d3.select(this).style('fill', (d: any) => {
                            return colourPalette(d.score);
                        })
                    })
                    .transition()
                    .duration(750)
                    .attr('width', (d: any) => xScale(xValue(d)));
            };

            const handleDrawText = (svg: any) => {
                svg
                    .append("g")
                    .selectAll('text')
                    .data(data)
                    .join('text')
                    .attr('fill', textColour)
                    .attr('font-size', () => {
                        return innerWidth < 700 ? '12px' : '20px';
                    })
                    .attr('font-weight', () => {
                        return innerWidth < 700 ? '300' : '400';
                    })
                    .attr('x', (d: any) => xScale(xValue(d)) + 10)
                    .attr('y', (d: any) => {
                        const ysc: any = yScale ? yScale(yValue(d)) : 0
                        return ysc + yScale.bandwidth() / 1.5
                    })
                    .attr('fill-opacity', 0.8)
                    .text((d: any) => capitalizeFirstLetter(d.city))
            };

            handleDrawBars(svg, colourPalette);
            handleDrawText(svg);
        }

    }, [svgRef, data, width, height, xMin, xMax, textColour,
            margin.top, margin.left, margin.bottom, margin.right]);

    return (
        <>
            <div id="ua-index-chart" className={styles.comparepage}>
                <svg width={width} height={height}>
                    <g
                        style={{
                            transform: `translate(${margin.right}px, ${margin.top}px)`
                        }}
                        ref={svgRef}
                        x={width / 2}
                        y={height / 2}
                    >
                    </g>
                </svg>

            </div>
        </>
    )
};
