
import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import Link from 'next/link'
import styled from 'styled-components';
import styles from '@/styles/stats.module.css';
import { StatsProps } from "@/data/interfaces";

const GroupedBars = styled.g`
  rect {
    fill: #ec008b;
    transition: all 0.2s;

    &:hover {
      fill: #e46aa7;
    }
  }
`;

const GroupedText = styled.g`
  text {
    font-size: 1.2rem;
  }
`;

export const Group = styled.g`
  transform: ${props => `translate(${props.right}px, ${props.top}px)`};
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
        value: city.statistics.sd_uta2trans_rel
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
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    const barsRef = React.useRef<SVGSVGElement>(null);
    const textRef = React.useRef<SVGSVGElement>(null);

    useEffect(() => {

        const bars = d3.select(barsRef.current);
        const text = d3.select(textRef.current);

        handleDrawBars(bars);
        handleDrawText(text);
    }, [data]);

    // var t = d3.transition()
    //     .duration(750);

    // X-axis:
    const xValue = d => d.value;
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth])
        .nice();

    // Y-axis
    const yValue = d => d.city;
    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.2);

    const handleDrawBars = bars => {
        bars
          .selectAll('rect')
          .data(data)
          .join('rect')
          .attr('height', yScale.bandwidth())
          .attr('y', d => yScale(yValue(d)))
          .transition()
          .duration(750)
          .attr('width', d => xScale(xValue(d)));
    };

  const handleDrawText = bars => {
    bars
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('y', d => yScale(yValue(d)) + yScale.bandwidth() / 1.5)
      //.text(d => d3.format(d.statistics[thisvar][barData.indx]))
      //.text(d => d.statistics[thisvar][barData.indx])
      .text(d => d.city)
      .attr('x', d => xScale(xValue(d)) + 5)
      .attr('fill-opacity', 0.8)
      .transition()
      .delay(0)
      .duration(750)
      .attr('fill-opacity', 0.8);
  };


    return (
            <div id="stats-container" className={styles.statsplot}>
                <svg width={width} height={height}>
                <Group
                  x={width / 2}
                  y={height / 2}
                  right={margin.right}
                  top={margin.top}>
                    <GroupedBars ref={barsRef} />
                    <GroupedText ref={textRef} />
                </Group>
                </svg>
            </div>
           )
};
