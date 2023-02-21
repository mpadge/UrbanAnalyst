
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
    if (this_layer == "social_index") {
        layer_min = props.citiesArray[props.idx].dataRanges.social_index[0];
        layer_max = props.citiesArray[props.idx].dataRanges.social_index[1];
    } else if (this_layer == "transport_abs") {
        layer_min = props.citiesArray[props.idx].dataRanges.transport_abs[0];
        layer_max = props.citiesArray[props.idx].dataRanges.transport_abs[1];
    } else if (this_layer == "transport_rel") {
        layer_min = props.citiesArray[props.idx].dataRanges.transport_rel[0];
        layer_max = props.citiesArray[props.idx].dataRanges.transport_rel[1];
    } else if (this_layer == "uta_abs") {
        layer_min = props.citiesArray[props.idx].dataRanges.uta_abs[0];
        layer_max = props.citiesArray[props.idx].dataRanges.uta_abs[1];
    } else if (this_layer == "uta_rel") {
        layer_min = props.citiesArray[props.idx].dataRanges.uta_rel[0];
        layer_max = props.citiesArray[props.idx].dataRanges.uta_rel[1];
    }

    const svgRef = React.useRef<SVGSVGElement>(null);

    useEffect(() => {
        var quantize = d3.scaleQuantize<string, string>()
            .domain([ layer_min, layer_max ])
            .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

        const svg = d3.select(svgRef.current);

        svg.append("g")
            .attr("class", "legendQuant")
            .attr("transform", "translate(20,20)");

        var legend = d3legend.legendColor()
            .labelFormat(d3.format(".2f"))
            .useClass(true)
            .title(this_layer)
            .titleWidth(100)
            .scale(quantize);

        svg.select(".legendQuant")
            .call(legend);
    }, [svgRef, this_layer, layer_min, layer_max])

    return (
        <div id="bottom-right-container" className={styles.bottomright}>
        <h2>{this_layer}</h2>
        <svg ref={svgRef} />

        </div>
        )
};
