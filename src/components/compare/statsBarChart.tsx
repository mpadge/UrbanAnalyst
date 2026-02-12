
import React, { useState, useEffect, useRef, Suspense } from 'react';
import * as d3 from 'd3';

import styles from '@/styles/compare.module.css';
import useWindowSize from '@/components/windowSize';

import { CityDataProps } from "@/data/interfaces";
import { getIdxWashington } from '@/components/headingText';

interface CompareProps {
    layer1: string,
    layer2: string,
    numLayers: string,
    meanVals: boolean,
    sortOpt: string,
    citiesArray: CityDataProps[]
}

export default function BarChart(props: CompareProps): JSX.Element {

    const idxWashington = getIdxWashington(props.citiesArray);
    const [_, _setCityData] = useState(props.citiesArray[idxWashington]);

    const meanValIndex = props.meanVals ? 0 : 1;

    const [textColour, setTextColour] = useState('black');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const darkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTextColour(darkMode ? 'white' : 'black');
        }
    }, []);

    const layer1: string = props.layer1.replace("\_", "").replace("index", "");
    const layer2: string = props.layer2.replace("\_", "").replace("index", "");
    const paired_keys = Object.keys(props.citiesArray[idxWashington].stats_paired);

    const these_layers =
        paired_keys.includes(layer1 + "_" + layer2) ?
            layer1 + "_" + layer2 : layer2 + "_" + layer1;
    const dual_layers: boolean = paired_keys.includes(these_layers);

    const this_layer: string = props.numLayers == "Paired" && dual_layers ?
        these_layers : props.layer1;

    const data = props.citiesArray
    .filter((city) => city.stats_paired.hasOwnProperty(this_layer) || city.stats_single.hasOwnProperty(this_layer))
    .map((city) => ({
        city: city.nameFormatted,
        value: props.numLayers == "Paired" && dual_layers ?
            city.stats_paired[this_layer as string] :
            city.stats_single[this_layer as string][meanValIndex]
    }));

    if (props.sortOpt === 'increasing') {
        data.sort((a, b) => d3.ascending(a.value, b.value));
    } else if (props.sortOpt === 'decreasing') {
        data.sort((a, b) => d3.descending(a.value, b.value));
    } else if (props.sortOpt === 'alphabetic') {
        data.sort((a, b) => d3.ascending(a.city, b.city));
    }

    // Set lower limit at fixed proportion (>= 1) of total range:
    const rangeExpand = 1.5;
    const xMinActual = data.map((item) => item.value).reduce((a, b) => Math.min(a, b));
    const xMax = data.map((item) => item.value).reduce((a, b) => Math.max(a, b));
    const xRange = xMax - xMinActual;
    const xMin = xMinActual > 0 ? Math.max(0, xMax - rangeExpand * xRange) : xMax - rangeExpand * xRange;

    const size = useWindowSize();

    const maxWidth = 1000;
    const defaultHeight = 700;
    const margin = { top: 50, right: 95, bottom: 60, left: 50 };
    const width = size.width ? Math.min(size.width, maxWidth) : null;
    const height = size.height ? size.height : null;
    const innerWidth = width ? width - margin.right - 2 * margin.left : maxWidth;
    const innerHeight = height ? height - margin.top - margin.bottom : defaultHeight;

    const xAxisPadding = 10;
    const _yAxisPadding = 10;
    const _yTickSize = 0;

    // palettes:
    // https://github.com/d3/d3-scale-chromatic
    // This palette is expanded slightly because otherwise the upper limit
    // (here, xMax) is white. Expanding ensures that it is also a blue shade.
    const paletteExpand = 0.2;
    const xMaxExpand = xMax + paletteExpand * (xMax - xMinActual);
    var colourPalette = d3
        .scaleSequential()
        .domain([ xMaxExpand, xMinActual ])
        .interpolator(d3.interpolateBlues)

    const svgRef = React.useRef<SVGSVGElement>(null);

    // X-axis:
    const xValue = (d: any): number => d.value;
    const expandRHS = 1.05; // Expand right-hand edge beyond max observed value
    const xMax2 = Math.max(0,xMin) + (xMax - Math.max(0,xMin)) * expandRHS;
    const xScale = d3.scaleLinear()
        .domain([xMin, xMax2])
        .range([xMin, innerWidth])
        .nice();

    // Y-axis
    const yValue = (d: any): string => d.city;
    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.2);

    useEffect(() => {

        const svg = d3.select(svgRef.current as any);
        svg.selectAll('*').remove();

        const handleDrawBars = (svg: any, colourPalette: any): void => {
            svg
                .append("g")
                .attr("transform", `translate(${margin.left}, 0)`)
                .selectAll('rect')
                .data(data)
                .join('rect')
                .attr('fill', (d: any) => colourPalette(d.value))
                .attr('stroke-width', 1)
                .attr('stroke', '#718096')
                .attr('width', (d: any) => xScale(xValue(d)))
                .attr('height', yScale.bandwidth())
                .attr('y', (d: any) => yScale(yValue(d)))
                .on('mouseover', function(this: SVGRectElement) {
                    d3.select(this).style('fill', '#00a7e4');
                })
                .on('mouseout', function(this: SVGRectElement) {
                    d3.select(this).style('fill', (d: any) => {
                        return colourPalette(d.value);
                    })
                })
                .transition()
                .duration(750);
        };

        const handleDrawText = (svg: any): void => {
            svg
                .append("g")
                .attr("transform", `translate(${margin.left}, 0)`)
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
                .text((d: any) => d.city)
        };

        const handleDrawXAxis = (svg: any): void => {
            const g = svg
                .append("g")
                .attr("transform", `translate(${margin.left}, ${innerHeight})`)
                .call(d3.axisBottom(xScale)
                    .tickSize(-innerHeight)
                    .tickSizeOuter(0)
                    .ticks(nTicks)
                    .tickPadding(xAxisPadding));

            g.selectAll(".tick line")
                .style("stroke", "#bcbcbc");

            g.selectAll(".tick text")
                .style("font-size", () => {
                    return innerWidth < 700 ? "12px" : "20px"
                })
        }

        const nTicks = (innerWidth < 700 || xMin > 0) ? 4 : 8;

        handleDrawXAxis(svg);
        handleDrawBars(svg, colourPalette);
        handleDrawText(svg);

    }, [data, innerHeight, innerWidth, xScale, yScale, xMin, margin.left,
            colourPalette, textColour]);

    const _inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div id="compare-page" className={styles.comparepage}>

                <div id="compare-container" className={styles.compareplot} >
                    <Suspense fallback={<div>Loading...</div>}>
                        <svg width={Number(width)} height={Number(height)}>
                            <g
                                ref={svgRef}
                                style={{
                                    transform: `translate(0, ${margin.top}px)`
                                }}
                            >
                            </g>
                        </svg>
                    </Suspense>
                </div>

            </div>
        </>
    )
};
