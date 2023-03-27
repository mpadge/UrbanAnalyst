import { useState } from 'react';
import styles from '@/styles/stats.module.css';
import { StatsExplainProps } from "@/data/interfaces";

interface LayerTextProps {
    social_index: string[],
    transport_rel: string[],
    transport_abs: string[],
    uta_rel: string[],
    uta_abs: string[],
    sd_uta2trans_rel: string[],
    sd_uta2trans_abs: string[]
}


const LAYER_TEXT: LayerTextProps = {

    "social_index": ["No social index statistics are displayed"],

    "transport_abs": [
        "The average of the fastest times taken to travel 10km from every point in a city using multi-modal transporting via any combination of walking, bicycling, or public transport. Values are specified in minutes. Lower values represent faster transport, and are always better.",
        "Variation in the average of the fastest times taken to travel 10km from every point in a city using multi-modal transporting via any combination of walking, bicycling, or public transport. Values are on a scale of minutes. Lower values represent less variation in travel times across the city."
        ],

    "transport_rel": [
        "The ratio of absolute travel times for any combinations of walking, cycling, and public transport to times for equivalent journeys taken solely with private automobile. Ratios less than one represent multi-modal transport being faster than automobile transport. These ratios provide arguably the most direct insight into the propensity or incentive to use public transport: Lower values mean that faster public transport is faster relation to equivalent automobile times, meaning people will be more likely to use it.",
        "Variation in the ratio of absolute travel times for any combinations of walking, cycling, and public transport to times for equivalent journeys taken solely with private automobile. Lower values imply lower variation across a city in the ratios of multi-modal versus private automobile travel times."
    ],

    "uta_abs": [
        "The combination of absolute multi-modal travel times and the social index transformed to the same scale of minutes per 10km of travel. Low values of this index reflect an advantageous combination of good transport provision and low socio-demographic disadvantage. High values indicate that cities are negatively affected by slow transport coupled with socio-demographic disadvantage.",
        "Variation in the combined values of absolute travel time and social indices. Lower values represent low variation across a city in the way in which absolute travel times vary with the selected social index."
    ],

    "uta_rel": [
        "The combination of multi-modal travel times relative to equivalent automobile times, and the social index transformed to the same scale, so that values of one reflect average social disadvantage and multi-modal travel times the same as equivalent automobile times. Low values reflect low socio-demographic disadvantage, and public transport times being comparable with, or better than, equivalent automobile travel times.",
        "Variation in the combined values of relative travel times and social indices, where relative travel times are times with multi-modal transport compared with equivalent times with private automobile. Lower values represent low variation across a city in the way in which relative travel times vary with the selected social index."
    ],

    "sd_uta2trans_rel": [
        "Single index representing the extent to which the transport system counteracts the spatial distribution of socio-demographic inequality (values less than one), or whether transport exacerbates social inequality (values greater than one). The relative version combines the social and relative transport layers, with low values reflecting the two layers combining to reduce overall spatial variation, while high values reflect the combination of layers enhancing spatial variation.",
        "There are only 'Average' values for this layer."
    ],

    "sd_uta2trans_abs": [
        "Single index representing the extent to which the transport system counteracts the spatial distribution of socio-demographic inequality (values less than one), or whether transport exacerbates social inequality (values greater than one). The absolute version combines the social and absolute transport layers, with low values reflecting the two layers combining to reduce overall spatial variation, while high values reflect the combination of layers enhancing spatial variation.",
        "There are only 'Average' values for this layer."
    ]
}

export default function ExplainButton (props: StatsExplainProps) {

    const meanVarIndex = props.meanVals ? 0 : 1;
    const layer_text = LAYER_TEXT[props.layer as keyof LayerTextProps][meanVarIndex];

    return (
        <div id="divinfo" style={{display: props.explain?"":"none"}} >
            <div id="explain-layer" className={styles.statstext}>
                <p>{layer_text} </p>
            </div>
        </div>
    )
}
