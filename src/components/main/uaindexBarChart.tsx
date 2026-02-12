"use client"

import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import useWindowSize from '@/components/windowSize';

interface indexDataProps {
    city: string,
    all: number,
    sing: number,
    pair: number
}

async function LoadData(
    setData: (data: [indexDataProps]) => void,
): Promise<void> {
    const dataSourcePath = "/data/ua-index.json";
    const data = await fetch(dataSourcePath)
        .then(response => response.json())
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.error('Error fetching UA index data:', error);
            return [];
        });

    setData(data);

    return;
}

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function UABarChart (): JSX.Element {

    const [data, setData] = useState<[indexDataProps] | null>(null);
    useEffect(() => {
        LoadData(setData);
    }, []);

    const [textColour, setTextColour] = useState('black');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const darkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTextColour(darkMode ? 'white' : 'black');
        }
    }, []);


    const size = useWindowSize();
    const maxWidth = 1000;
    const maxHeight = 700;
    const [width, setWidth] = useState<number | null>(
        size.width ? Math.min(size.width, maxWidth) : null
    );
    const [height, setHeight] = useState<number | null>(
        size.height ? Math.min(size.height, maxHeight) : null
    );

    const [xMin, setXMin] = useState<number>(0);
    const [xMax, setXMax] = useState<number>(2);
    const margin = { top: 50, right: 95, bottom: 60, left: 50 };

    useEffect(() => {
        if (data) {

            const xMax = data.map((i) => i.all).reduce((a, b) => Math.max(a, b));
            // Make xMin at least as far below 1 as xMax is above it:
            const xMin = Math.min(
                2 - xMax,
                data.map((i) => i.all).reduce((a, b) => Math.min(a, b))
            );
            setXMin(xMin);
            setXMax(xMax);

            const width = size.width ? Math.min(size.width, maxWidth)  : null;
            const height = size.height ? Math.min(size.height, maxHeight)  : null;
            setWidth(width);
            setHeight(height);
        }
    }, [size, data, setWidth, setHeight, maxWidth, maxHeight, setXMax]);

    const svgRef = React.useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (data) {

            const innerWidth = width ? width - margin.right - 2 * margin.left : maxWidth;
            const innerHeight = height ? height - margin.top - margin.bottom : maxHeight;

            const xAxisPadding = 10;

            // palettes:
            // https://github.com/d3/d3-scale-chromatic
            // This palette is expanded slightly because otherwise the upper limit
            // (here, xMax) is white. Expanding ensures that it is also a blue shade.
            const paletteExpand = 0.2;
            const xMaxExpand = xMax + paletteExpand * (xMax - xMin);
            var colourPalette = d3
                .scaleSequential()
                .domain([ xMaxExpand, xMin])
                .interpolator(d3.interpolateBlues)

            // X-axis:
            const xValue = (d: indexDataProps): number => d.all;
            const expandRHS = 1.05; // Expand right-hand edge beyond max observed value
            const xMax2 = Math.max(0,xMin) + (xMax - Math.max(0,xMin)) * expandRHS;
            const xScale = d3
                .scaleLinear()
                .domain([xMin, xMax2])
                .range([xMin, innerWidth])
                .nice();

            // Y-axis
            const yValue = (d: indexDataProps): string => d.city;
            const yScale = d3
                .scaleBand()
                .domain(data.map(yValue))
                .range([0, innerHeight])
                .padding(0.2);

            const svg = d3.select(svgRef.current as any);
            svg.selectAll('*').remove();

            const handleDrawBars = (svg: any, colourPalette: any): void => {
                svg
                    .selectAll('rect')
                    .data(data)
                    .join('rect')
                    .attr('fill', (d: any) => colourPalette(d.all))
                    .attr('stroke-width', 1)
                    .attr('stroke', '#718096')
                    .attr('height', yScale.bandwidth())
                    .attr('y', (d: any) => yScale(yValue(d)))
                    .on('mouseover', function(this: SVGRectElement) {
                        d3.select(this).style('fill', '#00a7e4');
                    })
                    .on('mouseout', function(this: SVGRectElement) {
                        d3.select(this).style('fill', (d: any) => {
                            return colourPalette(d.all);
                        })
                    })
                    .transition()
                    .duration(750)
                    .attr('width', (d: any) => xScale(xValue(d)));
            };

            const handleDrawText = (svg: any): void => {
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

            const nTicks = (innerWidth < 700 || xMin > 0) ? 4 : 8;

            const handleDrawXAxis = (svg: any): void => {
                const g = svg
                .append("g")
                .attr("transform", `translate(0,${innerHeight})`)
                .call(d3.axisBottom(xScale)
                    .tickSize(-innerHeight)
                    .ticks(nTicks, ",f")
                    .tickPadding(xAxisPadding));
                // The `.ticks formatting trick is from`
                // https://d3js.org/d3-axis#axis_tickFormat

                g.selectAll(".tick line")
                    .style("stroke", "#dcdcdb");


                g.selectAll(".tick text")
                    .style("font-size", () => {
                        return innerWidth < 700 ? "12px" : "20px"
                    })
            }

            handleDrawBars(svg, colourPalette);
            handleDrawText(svg);
            handleDrawXAxis(svg);
        }

    }, [svgRef, data, width, height, maxWidth, maxHeight, xMin, xMax, textColour,
            margin.top, margin.left, margin.bottom, margin.right]);

    return (
        <>
            <svg width={Number(width)} height={Number(height)}>
                <g ref={svgRef}></g>
            </svg>
        </>
    )
};
