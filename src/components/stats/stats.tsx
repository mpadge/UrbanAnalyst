
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Link from 'next/link'
import styled from 'styled-components';
import styles from '@/styles/stats.module.css';
import { StatsProps } from "@/data/interfaces";

interface CityStatsProps {
    social_index: number[],
    transport_rel: number[],
    transport_abs: number[],
    uta_rel: number[],
    uta_abs: number[],
    sd_uta2trans_rel: number[],
    sd_uta2trans_abs: number[]
}


const GroupedBars = styled.g`
  rect {
    fill: #008bec;
    transition: all 0.2s;

    &:hover {
      fill: #00a7e4;
    }
  }
  text {
    font-size: 1.2rem;
  }
`;

// fill: #ec008b;
// fill: #e46aa7;

interface GroupProps {
    right: number,
    top: number
}

export const Group = styled.g`
  transform: ${(props: GroupProps) => `translate(${props.right}px, ${props.top}px)`};
`;

interface AxisProps {
    axisType: string,
    innerHeight?: number
}

const Axis = styled.g`
  transform: ${(props: AxisProps) =>
    props.axisType === 'xAxis' && `translate(0, ${props.innerHeight}px)`};

  path,
  line {
    stroke: #dcdbdb;
  }

  text {
    font-size: 1.4rem;
  }
`;


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

export default function Stats (props: StatsProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const data = props.citiesArray.map((city, index) => ({
        city: city.name,
        value: city.statistics[props.layer as keyof CityStatsProps][0]
    }));

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
    const xAxisRef = React.useRef<SVGSVGElement>(null);

    // X-axis:
    const xValue = (d: any) => d.value;
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth])
        .nice();

    // Y-axis
    const yValue = (d: any) => d.city;
    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.2);

    useEffect(() => {

        const handleDrawBars = (svg: any) => {
            svg
              .selectAll('rect')
              .data(data)
              .join('rect')
              .attr('height', yScale.bandwidth())
              .attr('y', (d: any) => yScale(yValue(d)))
              .transition()
              .duration(750)
              .attr('width', (d: any) => xScale(xValue(d)));
        };

        const handleDrawText = (svg: any) => {
            const ret = svg
                .selectAll('text')
                .data(data)
                .join('text')
                .attr('y', (d: any) => {
                    const ysc: any = yScale ? yScale(yValue(d)) : 0
                    return ysc + yScale.bandwidth() / 1.5
                    })
                .text((d: any) => d.city)
                .attr('x', (d: any) => xScale(xValue(d)) + 5)
                .attr('fill-opacity', 0.8)
                .transition()
                .delay(0)
                .duration(750)
                .attr('fill-opacity', 0.8);

            return ret;
        };

        const svg = d3.select(svgRef.current as any);

        handleDrawBars(svg);
        handleDrawText(svg);

        const xGroup: any = d3.select(xAxisRef.current as any);

        const nTicks = (innerWidth < 700) ? 5 : 10;

        const xAxis = d3.axisBottom(xScale)
            .tickSize(-innerHeight)
            .ticks(nTicks)
            .tickPadding(xAxisPadding);

        xGroup.call(xAxis);

    }, [data, innerHeight, innerWidth, xScale, yScale]);

    const inputRef = useRef()

    var heading: string = "";
    if (props.layer == 'sd_uta2trans_rel') {
        heading = 'UTA Relative';
    } else if (props.layer == 'sd_uta2trans_abs') {
        heading = 'UTA Absolute';
    } else if (props.layer == 'transport_abs') {
        heading = 'Transport Absolute';
    } else if (props.layer == 'transport_rel') {
        heading = 'Transport Relative';
    } else if (props.layer == 'uta_abs') {
        heading = 'Combined Absolute';
    } else if (props.layer == 'uta_rel') {
        heading = 'Combined Relative';
    }
    const heading_txt = heading;

    return (
            <>
            <div id="stats-page" className={styles.statspage}>

                <div id="stats-container" className={styles.statsplot} >
                    <h2> {heading_txt} </h2>
                    <svg width={width} height={height}>
                    <Group
                      x={width / 2}
                      y={height / 2}
                      right={margin.right}
                      top={margin.top}>
                        <Axis ref={xAxisRef} axisType="xAxis" innerHeight={innerHeight} />
                        <GroupedBars ref={svgRef} />
                    </Group>
                    </svg>
                </div>

            </div>
            </>
           )
};
