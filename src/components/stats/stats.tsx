
import React, { useState, useEffect, useRef, Suspense } from 'react';
import * as d3 from 'd3';
import Link from 'next/link'
import styles from '@/styles/stats.module.css';
import { CityDataProps } from "@/data/interfaces";
import { HeadingTextOneLayer } from "@/components/heading_text";

interface StatsProps {
    idx: number,
    layer: string,
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

function useWindowSize() {

    interface windowSize {
        width: number;
        height: number;
    }

    const [windowSize, setWindowSize] = useState<{width: number | null, height: number | null}>({
        width: null,
        height: null,
    });

    function isNumber(x: any): x is number {
        return typeof x === "number";
    }

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        
        window.addEventListener("resize", handleResize);
         
        handleResize();
        
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}

export default function BarChart (props: StatsProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const meanValIndex = props.meanVals ? 0 : 1;

    const layer1: string = props.layer.replace("\_", "").replace("index", "");
    const layer2: string = props.layer2.replace("\_", "").replace("index", "");
    const paired_keys = Object.keys(props.citiesArray[props.idx].stats_paired);

    const these_layers =
        paired_keys.includes(layer1 + "_" + layer2) ?
        layer1 + "_" + layer2 : layer2 + "_" + layer1;
    const dual_layers: boolean = paired_keys.includes(these_layers);

    const this_layer: string = props.numLayers == "Paired" && dual_layers ?
        these_layers : props.layer;

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

    const svgRef = React.useRef<SVGSVGElement>(null);

    // X-axis:
    const xValue = (d: any) => d.value;
    const xScale = d3.scaleLinear()
        .domain([xMin, d3.max(data, xValue)])
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

        const handleDrawBars = (svg: any) => {
            svg
              .selectAll('rect')
              .data(data)
              .join('rect')
              .classed('fill-[#008bec] stroke-1 stroke-slate-600 hover:fill-[#00a7e4]', true)
              .attr('height', yScale.bandwidth())
              .attr('y', (d: any) => yScale(yValue(d)))
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
                .attr('class', () => {
                    return innerWidth < 700 ? 'text-lg font-light' : 'text-2xl font-normal';
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
                .style("font-size", "20px");
        }

        const nTicks = (innerWidth < 700 || xMin > 0) ? 4 : 8;

        handleDrawXAxis(svg);
        handleDrawBars(svg);
        handleDrawText(svg);

    }, [data, innerHeight, innerWidth, xScale, yScale, xMin]);

    const inputRef = useRef()

    const heading: string = props.numLayers == "Paired" && dual_layers ?
        HeadingTextOneLayer(layer1) + " & " + HeadingTextOneLayer(layer2) :
        HeadingTextOneLayer(props.layer);

    return (
            <>
            <div id="stats-page" className={styles.statspage}>

                <div id="stats-container" className={styles.statsplot} >
                    <h2> {heading} </h2>
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
