
import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import * as d3legend from 'd3-svg-legend';
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { LegendProps } from "./interfaces";

export default function Legend (props: LegendProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const cityNames = props.citiesArray.map((item) => item.name);

    var layer_min: number = 0;
    var layer_max: number = 100;
    var legend_values: number[];
    if (props.layer == "social_index") {
        layer_min = props.citiesArray[props.idx].dataRanges.social_index[0];
        layer_max = props.citiesArray[props.idx].dataRanges.social_index[1];
        legend_values = props.citiesArray[props.idx].dataIntervals.social_index;
    } else if (props.layer == "transport_abs") {
        layer_min = props.citiesArray[props.idx].dataRanges.transport_abs[0];
        layer_max = props.citiesArray[props.idx].dataRanges.transport_abs[1];
        legend_values = props.citiesArray[props.idx].dataIntervals.transport_abs;
    } else if (props.layer == "transport_rel") {
        layer_min = props.citiesArray[props.idx].dataRanges.transport_rel[0];
        layer_max = props.citiesArray[props.idx].dataRanges.transport_rel[1];
        legend_values = props.citiesArray[props.idx].dataIntervals.transport_rel;
    } else if (props.layer == "uta_abs") {
        layer_min = props.citiesArray[props.idx].dataRanges.uta_abs[0];
        layer_max = props.citiesArray[props.idx].dataRanges.uta_abs[1];
        legend_values = props.citiesArray[props.idx].dataIntervals.uta_abs;
    } else if (props.layer == "uta_rel") {
        layer_min = props.citiesArray[props.idx].dataRanges.uta_rel[0];
        layer_max = props.citiesArray[props.idx].dataRanges.uta_rel[1];
        legend_values = props.citiesArray[props.idx].dataIntervals.uta_rel;
    }

    // palette has to match one in map.tsx!
    var Color = d3.scaleSequential().domain([ layer_min, layer_max ])
        .interpolator(d3.interpolateViridis)

    const svgRef = React.useRef<SVGSVGElement>(null);

    useEffect(() => {

            const tickSize = 6;
            const width = 320;
            const height = 44 + tickSize;
            const marginTop = 18;
            const marginRight = 20;
            const marginBottom = 16 + tickSize;
            const marginLeft = 0;
            const ticks = width / 64;

            var y = d3.scaleBand()
            .domain(legend_values)
            .rangeRound([marginLeft, width - marginRight]);

            var t = d3.transition()
            .duration(750);

            const svg = d3.select(svgRef.current);


            var rect = svg.append("g")
                .selectAll("rect")
                .data(legend_values);

            rect.join(
                enter =>
                    enter
                        .append("rect")
                        .transition(t)
                        .attr("x", y)
                        .attr("y", marginTop)
                        .attr("width", Math.max(0, y.bandwidth() - 1))
                        .attr("height", height - marginTop - marginBottom)
                        .attr("fill", Color),
                update =>
                    update
                        .append("rect")
                        .transition(t)
                        .attr("x", y)
                        .attr("y", marginTop)
                        .attr("width", Math.max(0, y.bandwidth() - 1))
                        .attr("height", height - marginTop - marginBottom)
                        .attr("fill", Color),
                exit =>
                    exit
                        .append("rect")
                        .transition(t)
                        .remove()
                    );

            var addticks = svg.append("g")
                .attr("transform", `translate(0,${height - marginBottom})`);

            addticks.join(
                enter =>
                    enter
                        .call(d3.axisBottom(y)
                            .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
                            .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
                            .tickSize(tickSize))
                        //.tickValues(tickValues))
                        .call(g => g.select(".domain").remove()),
                update =>
                    update
                        .call(d3.axisBottom(y)
                                .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
                                .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
                                .tickSize(tickSize))
                        //.tickValues(tickValues))
                        .call(g => g.select(".domain").remove()),
                exit =>
                    exit
                    .call(d3.axisBottom(y)
                            .tickSize(0))
                    .style("fill-opacity", 1e-6)
                    );

            var text = svg.append("g")
                .attr("transform", `translate(0,${height - marginBottom})`)
                .call(g => g.append("text")
                        .attr("x", marginLeft)
                        .attr("fill", "currentColor")
                        .attr("text-anchor", "start")
                        .attr("font-weight", "bold"));

            text.join(
                enter =>
                    enter
                        .call(g => g.append("text")
                            .transition(t)
                            .attr("class", "enter")
                            .attr("y", marginTop + marginBottom - height - 6)
                            .text(props.layer)),
                update =>
                    update
                        .call(g => g.append("text")
                            .transition(t)
                            .attr("class", "update")
                            .attr("y", marginTop + marginBottom - height - 6)
                            .text(props.layer)),
                exit =>
                    exit
                        .call(g => g.remove())
                        .attr("class", "exit")
                        .transition(t)
                        .style("fill-opacity", 1e-6)
                        .text(null)
                        .remove()
                        );

    }, [svgRef, props.layer, layer_min, layer_max])

    return (
            <div id="bottom-right-container" className={styles.bottomright}>
            <svg ref={svgRef} />

            </div>
           )
};