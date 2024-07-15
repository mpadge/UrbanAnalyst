
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Link from 'next/link'
import styles from '@/styles/legend.module.css';
import { CityDataProps } from "@/data/interfaces";

interface LegendProps {
    layerRange: number[],
    alpha: number,
    layer_name: string
}

export default function Legend (props: LegendProps) {

    function update(svg: any, layerRange: any, layer_name: string, alpha: number) {

        svg.selectAll("rect").remove();
        svg.selectAll("text").remove();
        svg.selectAll("line").remove();

        const tickSize = 6;
        const width = 320;
        const height = 44 + tickSize;
        const marginTop = 18;
        const marginRight = 20;
        const marginBottom = 16 + tickSize;
        const marginLeft = 0;

        var t = d3
            .transition()
            .duration(750);

        const scaleband = d3
            .scaleLinear()
            .domain(layerRange)
            .rangeRound([marginLeft, width - marginRight]);

        const nticksin = 5;
        const nticks = scaleband.ticks(nticksin).length;
        const bandwidth = Math.floor(width / nticks);

        const nColors = 50;
        var scalebandColors = d3
            .scaleLinear()
            .domain(layerRange)
            .rangeRound([marginLeft, width - marginRight]);
        var scalecolors = scalebandColors.ticks(nColors)

        let tickAdjust = (g: any) => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);

        // Colours are then independent of scaleband, and always on linear
        // (sequential) scales. Note that palette has to match one in map.tsx,
        // which is also reversed, so domain is [max, min].
        var Color = d3
            .scaleSequential()
            .domain(layer_name === "bike_index" || layer_name === "natural" ? [layerRange[0], layerRange[1]] : [layerRange[1], layerRange[0]])
            .interpolator(d3.interpolateViridis);

        var rect = svg
            .append("g")
            .call((g: any) => g.select(".domain").remove())
            .selectAll("rect")
            .data(scalecolors)
            .join("rect")
            .attr("x", scalebandColors)
            .attr("y", marginTop + 5)
            .attr("width", bandwidth)
            .attr("height", height - marginTop - marginBottom)
            .attr("fill", Color)
            .attr("opacity", 1 - alpha);

        var tick = svg
            .append("g")
            .attr("transform", `translate(0,${height - marginBottom + 5})`)
            .join("tick")
            .attr("transform", `translate(0,${height - marginBottom + 5})`)
            .call(d3.axisBottom(scaleband)
                .ticks(nticksin)
                .tickSize(tickSize)
                .tickSizeOuter(0))
            .call(tickAdjust);

        var text = svg
            .append("g")
            .call((g: any) => g.select(".domain").remove())
            .call((g: any) => g.append("text")
                .attr("transform", `translate(0,${height - marginBottom + 5})`)
                .attr("x", marginLeft + 20)
                .attr("y", marginTop + marginBottom - height - 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .attr("font-size", "16px")
                .text(layer_name));
    }

    const svgRef = React.useRef<SVGSVGElement>(null);

    useEffect(() => {

        var svg = d3.select(svgRef.current);

        update(svg, props.layerRange, props.layer_name, props.alpha)

    }, [svgRef, props.layerRange, props.layer_name, props.alpha]);

    return (
        <div id="bottom-right-container" className={styles.maplegend}>
            <svg ref={svgRef} />

        </div>
    )
};
