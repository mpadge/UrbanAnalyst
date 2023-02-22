
import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import * as d3legend from 'd3-svg-legend';
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { LegendProps } from "./interfaces";

export default function Legend (props: LegendProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const cityNames = props.citiesArray.map((item) => item.name);

    const this_layer: string = props.layer;
    var layer_min: number = 0;
    var layer_max: number = 100;
    var legend_vales: number[];
    if (this_layer == "social_index") {
        layer_min = props.citiesArray[props.idx].dataRanges.social_index[0];
        layer_max = props.citiesArray[props.idx].dataRanges.social_index[1];
        legend_vales = props.citiesArray[props.idx].dataIntervals.social_index;
    } else if (this_layer == "transport_abs") {
        layer_min = props.citiesArray[props.idx].dataRanges.transport_abs[0];
        layer_max = props.citiesArray[props.idx].dataRanges.transport_abs[1];
        legend_vales = props.citiesArray[props.idx].dataIntervals.transport_abs;
    } else if (this_layer == "transport_rel") {
        layer_min = props.citiesArray[props.idx].dataRanges.transport_rel[0];
        layer_max = props.citiesArray[props.idx].dataRanges.transport_rel[1];
        legend_vales = props.citiesArray[props.idx].dataIntervals.transport_rel;
    } else if (this_layer == "uta_abs") {
        layer_min = props.citiesArray[props.idx].dataRanges.uta_abs[0];
        layer_max = props.citiesArray[props.idx].dataRanges.uta_abs[1];
        legend_vales = props.citiesArray[props.idx].dataIntervals.uta_abs;
    } else if (this_layer == "uta_rel") {
        layer_min = props.citiesArray[props.idx].dataRanges.uta_rel[0];
        layer_max = props.citiesArray[props.idx].dataRanges.uta_rel[1];
        legend_vales = props.citiesArray[props.idx].dataIntervals.uta_rel;
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
            .domain(legend_vales)
            .rangeRound([marginLeft, width - marginRight]);

        const svg = d3.select(svgRef.current);

        svg.append("g")
            .selectAll("rect")
            .data(legend_vales)
            .join("rect")
                .attr("x", y)
                .attr("y", marginTop)
                .attr("width", Math.max(0, y.bandwidth() - 1))
                .attr("height", height - marginTop - marginBottom)
                .attr("fill", Color);


      svg.append("g")
          .attr("transform", `translate(0,${height - marginBottom})`)
          .call(d3.axisBottom(y)
            .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
            .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
            .tickSize(tickSize))
            //.tickValues(tickValues))
          .call(g => g.select(".domain").remove())
          .call(g => g.append("text")
            .attr("x", marginLeft)
            .attr("y", marginTop + marginBottom - height - 6)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .attr("class", "title")
            .text(this_layer));

    }, [svgRef, this_layer, layer_min, layer_max])

    return (
        <div id="bottom-right-container" className={styles.bottomright}>
        <svg ref={svgRef} />

        </div>
        )
};
