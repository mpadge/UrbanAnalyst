
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Link from 'next/link'
import styles from '@/styles/legend.module.css';
import { CityDataProps } from "@/data/interfaces";

interface LegendProps {
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    alpha: number,
    citiesArray: CityDataProps[]
}

export default function Legend (props: LegendProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const cityNames = props.citiesArray.map((item) => item.name);

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

        var t = d3.transition()
            .duration(750);

        // scaleband controls the ticks, which can be on linear or log scales:
        const log_scale = layer_name == "school_dist" || layer_name == "intervals";
        const scale_min = log_scale ? Math.pow(10, layerRange[0]) : layerRange[0];
        const scale_max = log_scale ? Math.pow(10, layerRange[1]) : layerRange[1];

        var scaleband = log_scale ?
            d3.scaleLog()
                .domain([scale_min, scale_max])
                .rangeRound([marginLeft, width - marginRight]) :
            d3.scaleLinear()
                .domain([scale_min, scale_max])
                .rangeRound([marginLeft, width - marginRight]);

        const nticksin = 5;
        const nticks = scaleband.ticks(nticksin).length;
        const bandwidth = Math.floor(width / nticks);

        const nColors = 50;
        var scalebandColors = d3.scaleLinear()
            .domain([layerRange[0], layerRange[1]])
            .rangeRound([marginLeft, width - marginRight]);
        var scalecolors = scalebandColors.ticks(nColors)

        let tickAdjust = (g: any) => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);

        // Colours are then independent of scaleband, and always on linear
        // (sequential) scales. Note that palette has to match one in map.tsx,
        // which is also reversed, so domain is [max, min].
        var Color = d3.scaleSequential()
            .domain([layerRange[1], layerRange[0]])
            .interpolator(d3.interpolateViridis);

        var rect = svg.append("g")
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

        var tick = svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom + 5})`)
            .join("tick")
                .attr("transform", `translate(0,${height - marginBottom + 5})`)
                .call(d3.axisBottom(scaleband)
                    .ticks(nticksin)
                    .tickSize(tickSize)
                    .tickSizeOuter(0))
                .call(tickAdjust);

        var text = svg.append("g")
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

        const layer1: string = props.layer.replace("\_", "").replace("index", "");
        const layer2: string = props.layer2.replace("\_", "").replace("index", "");
        const paired_keys = Object.keys(props.citiesArray[props.idx].dataRangesPaired);

        const these_layers =
            paired_keys.includes(layer1 + "_" + layer2) ?
            layer1 + "_" + layer2 : layer2 + "_" + layer1;
        const dual_layers: boolean = paired_keys.includes(these_layers);

        const this_layer: string = props.numLayers == "Paired" && dual_layers ?
            these_layers : props.layer;

        const dataRanges: any = props.numLayers === "Paired" && dual_layers ?
            props.citiesArray[props.idx].dataRangesPaired :
            props.citiesArray[props.idx].dataRanges;
        const layerRange = dataRanges[this_layer];

        update(svg, layerRange, this_layer, props.alpha)

    }, [svgRef, props])

    return (
            <div id="bottom-right-container" className={styles.maplegend}>
            <svg ref={svgRef} />

            </div>
           )
};
