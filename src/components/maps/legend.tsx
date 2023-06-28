
import React, {useState, useEffect} from 'react';
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

    function update(svg: any, legend_values: any, layer_name: string, Color: any, alpha: number) {

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
        // const ticks = width / 64;

        var t = d3.transition()
            .duration(750);

        var scaleband = d3.scaleBand()
            .domain(legend_values)
            .rangeRound([marginLeft, width - marginRight]);

        var rect = svg.append("g")
            .selectAll("rect")
            .data(legend_values);

        rect.join(
            (enter: any) =>
                enter
                    .append("rect")
                    .transition(t)
                    .attr("x", scaleband)
                    .attr("y", marginTop + 5)
                    .attr("width", Math.max(0, scaleband.bandwidth() - 1))
                    .attr("height", height - marginTop - marginBottom)
                    .attr("fill", Color)
                    .attr("opacity", 1 - alpha),
            (update: any) =>
                update
                    .append("rect")
                    .transition(t)
                    .attr("x", scaleband)
                    .attr("y", marginTop + 5)
                    .attr("width", Math.max(0, scaleband.bandwidth() - 1))
                    .attr("height", height - marginTop - marginBottom)
                    .attr("fill", Color)
                    .attr("opacity", 1 - alpha),
            (exit: any) =>
                exit
                    .append("rect")
                    .transition(t)
                    .remove()
                );

        var tick = svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom + 5})`);

        tick.join(
            (enter: any) =>
                enter
                    .attr("transform", `translate(0,${height - marginBottom + 5})`)
                    .call(d3.axisBottom(scaleband)
                        .tickSize(tickSize)),
            (update: any) =>
                update
                    .transition(t)
                    .attr("transform", `translate(0,${height - marginBottom + 5})`)
                    .call(d3.axisBottom(scaleband)
                        .tickSize(tickSize)),
            (exit: any) =>
                exit
                    .remove()
                );

        var text = svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom + 5})`);

        var textUpdate = d3.transition(text)
            .attr("transform", function (d) { return "translate(0, 0);" });

        textUpdate.select("text")
            .attr("x", marginLeft - 20)
            .attr("y", marginTop + marginBottom - height - 20)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .attr("font-size", "16px")
            .text(layer_name);
    }

    const svgRef = React.useRef<SVGSVGElement>(null);

    useEffect(() => {

        var svg = d3.select(svgRef.current);

        const layer1: string = props.layer.replace("\_", "").replace("index", "");
        const layer2: string = props.layer2.replace("\_", "").replace("index", "");
        const paired_keys = Object.keys(props.citiesArray[props.idx].dataIntervalsPaired);

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
        const layer_min = layerRange[0];
        const layer_max = layerRange[1];

        const dataIntervals: any = props.numLayers === "Paired" && dual_layers ?
            props.citiesArray[props.idx].dataIntervalsPaired :
            props.citiesArray[props.idx].dataIntervals;
        const legend_values: number[] = dataIntervals[this_layer];

        // palette has to match one in map.tsx, which is also reversed, so
        // domain is [max, min].
        var Color = d3.scaleSequential()
            .domain([ layer_max, layer_min ])
            .interpolator(d3.interpolateViridis);

        update(svg, legend_values, this_layer, Color, props.alpha)

    }, [svgRef, props])

    return (
            <div id="bottom-right-container" className={styles.maplegend}>
            <svg ref={svgRef} />

            </div>
           )
};
