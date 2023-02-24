
import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import Link from 'next/link'
import styles from '@/styles/stats.module.css';
import { StatsProps } from "@/data/interfaces";

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

    function update(svg: any, data: any, width: any, height: any, margin: any) {

        svg.selectAll("rect").remove();
        svg.selectAll("text").remove();
        svg.selectAll("line").remove();

        console.log(width + " + " + height)

        // var t = d3.transition()
        //     .duration(750);

        // X-axis:
        const cityNames = data.map((item: any) => item.city);

        var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(cityNames)
            .padding(0.2);

        svg.append("g")
            .attr("transform", "translate(0," + (height - margin.top) + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(0,20)")
            .style("font-size", "36px")
            .style("text-anchor", "end");

        // Y-axis
        const values = data.map((item: any) => item.value);
        const ymax = Math.max(...values);
        var y = d3.scaleLinear()
            .domain([0, ymax])
            .range([ height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y))
            .attr("transform", "translate(50," + (-margin.top) + ")")
            .style("font-size", "24px");

        // Bars
        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", function(d: any) { return x(d.city); })
                .attr("y", function(d: any) { return y(d.value); })
                .attr("transform", "translate(0," + (-margin.top) + ")")
                .attr("width", x.bandwidth())
                .attr("height", function(d: any) { return height - y(d.value); })
                .attr("fill", "#69b3a2");
    }

    const svgRef = React.useRef<SVGSVGElement>(null);

    const size = useWindowSize();

    useEffect(() => {

        var svg = d3.select(svgRef.current);

        // Need to resize the svg to current window size:
        var margin = {top: 80, right: 30, bottom: 100, left: 60};
        var width = 700;
        var height = 500;
        if (size.width !== null && size.height !== null) {
            width = size.width - margin.left - margin.right;
            height = size.height - margin.top - margin.bottom;
        }
        svg.attr("width", width)
            .attr("height", height);
            //.attr("transform", "translate(" + margin.left + "," - margin.top + ")");

        const cityNames = props.citiesArray.map((item) => item.name);

        //const x = props.citiesArray.map(city => (city.statistics.uta_rel[0]));
        //const x = props.citiesArray.map(city => (city.statistics.uta_rel[1]));

        // These are single values only:
        //const sd_uta2trans_abs = props.citiesArray.map(city => (city.statistics.sd_uta2trans_abs));
        const yvals = props.citiesArray.map(city => (city.statistics.sd_uta2trans_rel));
        const data = props.citiesArray.map((city, index) => ({
            city: city.name,
            value: city.statistics.sd_uta2trans_rel
        }));

        update(svg, data, width, height, margin);

    }, [svgRef, props, size])

    return (
            <div id="stats-container" className={styles.statsplot}>
            <svg ref={svgRef} />

            </div>
           )
};
