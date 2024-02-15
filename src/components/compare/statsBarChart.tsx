
import React, { useState, useEffect, useRef, Suspense } from 'react';
import * as d3 from 'd3';
import Link from 'next/link'

import styles from '@/styles/compare.module.css';
import useWindowSize from '@/components/window-size';

import { CityDataProps } from "@/data/interfaces";
import { HeadingTextOneLayer } from "@/components/heading_text";

interface CompareProps {
    idx: number,
    layer1: string,
    layer2: string,
    numLayers: string,
    meanVals: boolean,
    sortOpt: string,
    citiesArray: CityDataProps[]
}

interface CityStatsProps {
    social_index: number[],
    times_rel: number[],
    times_abs: number[],
    transfers: number[],
    intervals: number[],
    transport: number[],
    popdens: number[],
    school_dist: number[],
    bike_index: number[],
    natural: number[],
    parking: number[]
}


// fill: #ec008b;
// fill: #e46aa7;

interface GroupProps {
    right: number,
    top: number
}

interface AxisProps {
    axisType: string,
    innerHeight?: number
}

export default function BarChart (props: CompareProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const meanValIndex = props.meanVals ? 0 : 1;

    const layer1: string = props.layer1.replace("\_", "").replace("index", "");
    const layer2: string = props.layer2.replace("\_", "").replace("index", "");
    const paired_keys = Object.keys(props.citiesArray[props.idx].stats_paired);

    const these_layers =
        paired_keys.includes(layer1 + "_" + layer2) ?
        layer1 + "_" + layer2 : layer2 + "_" + layer1;
    const dual_layers: boolean = paired_keys.includes(these_layers);

    const this_layer: string = props.numLayers == "Paired" && dual_layers ?
        these_layers : props.layer1;

    const data = props.citiesArray.map((city, index) => ({
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
    const xMin = xMax - rangeExpand * xRange;

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
    var colourPalette = d3.scaleSequential().domain([ xMax, xMinActual ])
        .interpolator(d3.interpolateBlues)

    const svgRef = React.useRef<SVGSVGElement>(null);

    // X-axis:
    const xValue = (d: any) => d.value;
    const expandRHS = 1.05; // Expand right-hand edge beyond max observed value
    const xMax2 = Math.max(0,xMin) + (xMax - Math.max(0,xMin)) * expandRHS;
    const xScale = d3.scaleLinear()
        .domain([xMin, xMax2])
        .range([xMin, innerWidth])
        .nice();

    // Y-axis
    const yValue = (d: any) => d.city;
    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.2);

    useEffect(() => {

        const svg = d3.select(svgRef.current as any);
        svg.selectAll('*').remove();

        const handleDrawBars = (svg: any, colourPalette: any) => {
            svg
                .selectAll('rect')
                .data(data)
                .join('rect')
                .attr('fill', (d: any) => colourPalette(d.value))
                .attr('stroke-width', 1)
                .attr('stroke', '#718096')
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
                .transition()                .transition()
                .duration(750)
                .attr('width', (d: any) => xScale(xValue(d)));
        };

        const handleDrawText = (svg: any) => {
            svg
                .append("g")
                .selectAll('text')
                .data(data)
                .join('text')
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

        const handleDrawXAxis = (svg: any) => {
            const g = svg
                .append("g")
                .attr("transform", `translate(0,${innerHeight})`)
                .call(d3.axisBottom(xScale)
                    .tickSize(-innerHeight)
                    .ticks(nTicks)
                    .tickPadding(xAxisPadding));

            g.selectAll(".tick line")
                .style("stroke", "#dcdcdb");

            g.selectAll(".tick text")
                .style("font-size", () => {
                    return innerWidth < 700 ? "12px" : "20px"
                })
        }

        const nTicks = (innerWidth < 700 || xMin > 0) ? 4 : 8;

        handleDrawXAxis(svg);
        handleDrawBars(svg, colourPalette);
        handleDrawText(svg);

    }, [data, innerHeight, innerWidth, xScale, yScale, xMin, colourPalette]);

    const inputRef = useRef()

    const heading: string = props.numLayers == "Paired" && dual_layers ?
        HeadingTextOneLayer(layer1) + " & " + HeadingTextOneLayer(layer2) :
        HeadingTextOneLayer(props.layer1);

    return (
            <>
            <div id="compare-page" className={styles.comparepage}>

                <div id="compare-heading" className={styles.compareheading}>
                    <p> {heading} </p>
                </div>

                <div id="compare-container" className={styles.compareplot} >
                    <Suspense fallback={<div>Loading...</div>}>
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
                    </Suspense>
                </div>

            </div>
            </>
           )
};
