import { useState } from 'react';
import styles from '@/styles/controls.module.css';
import { ExplainProps } from "@/data/interfaces";

interface LayerTextProps {
    social_index: string,
    transport_rel: string,
    transport_abs: string,
    uta_rel: string,
    uta_abs: string,
}

const LAYER_TEXT: LayerTextProps = {
    "social_index": "Representative socio-demographic data such as unemployment rates, deprivation indices, inequality indices, or other indices of social disadvantage.",
    "transport_abs": "The average of the time taken to travel 10km from every point in a city using multi-modal transporting via any combination of walking, bicycling, or public transport. Values are specified in minutes. Lower values represent faster transport, and are always better.",
    "transport_rel": "The ratio of absolute travel times described above to times for equivalent journeys taken with private automobile. Ratios less than one represent multi-modal transport being faster than automobile transport. These ratios provide arguably the most direct insight into the propensity or incentive to use public transport: The faster that is in relation to equivalent automobile times, the more likely people will be to use it.",
    "uta_abs": "The combination of absolute multi-modal travel times and the social index transformed to the same scale of minutes per 10km of travel. Low values of this index reflect an advantageous combination of good transport provision and low socio-demographic disadvantage. High values indicate regions within a city negatively affected by slow transport and pronounced socio-demographic disadvantage.",
    "uta_rel": "The combination of multi-modal travel times relative to equivalent automobile times, and the social index transformed to the same scale, so that values of one reflect average social disadvantage and multi-modal travel times the same as equivalent automobile times. Low values reflect low socio-demographic disadvantage, and public transport times being comparable with, or better than, equivalent automobile travel times."
}

export default function ExplainButton (props: ExplainProps) {

    var layer_text_temp: string;
    if (props.layer == "social_index") {
        layer_text_temp = props.citiesArray[props.idx].social_index;
    } else {
        layer_text_temp = LAYER_TEXT[props.layer as keyof LayerTextProps];
    }
    const layer_text: string = layer_text_temp;

    return (
        <div id="explain-layer" className={styles.explaintext}>
            <div id="divinfo" style={{display: props.explain?"":"none"}} >
                <p>{layer_text} </p>
                <p>(Click anywhere to close.)</p>
            </div>
        </div>
    )
}
