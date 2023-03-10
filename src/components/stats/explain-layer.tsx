import { useState } from 'react';
import styles from '@/styles/stats.module.css';
import { ExplainProps } from "@/data/interfaces";

interface LayerTextProps {
    social_index: string,
    transport_rel: string,
    transport_abs: string,
    uta_rel: string,
    uta_abs: string,
    sd_uta2trans_rel: string,
    sd_uta2trans_abs: string
}


const LAYER_TEXT: LayerTextProps = {
    "social_index": "No social index statistics are displayed",
    "transport_abs": "The average of the time taken to travel 10km from every point in a city using multi-modal transporting via any combination of walking, bicycling, or public transport. Values are specified in minutes. Lower values represent faster transport, and are always better.",
    "transport_rel": "The ratio of absolute travel times for any combinations of walking, cycling, and public transport to times for equivalent journeys taken solely with private automobile. Ratios less than one represent multi-modal transport being faster than automobile transport. These ratios provide arguably the most direct insight into the propensity or incentive to use public transport: Lower values mean that faster public transport is faster relation to equivalent automobile times, meaning people will be more likely to use it.",
    "uta_abs": "The combination of absolute multi-modal travel times and the social index transformed to the same scale of minutes per 10km of travel. Low values of this index reflect an advantageous combination of good transport provision and low socio-demographic disadvantage. High values indicate that cities are negatively affected by slow transport coupled with socio-demographic disadvantage.",
    "uta_rel": "The combination of multi-modal travel times relative to equivalent automobile times, and the social index transformed to the same scale, so that values of one reflect average social disadvantage and multi-modal travel times the same as equivalent automobile times. Low values reflect low socio-demographic disadvantage, and public transport times being comparable with, or better than, equivalent automobile travel times.",
    "sd_uta2trans_rel": "Single index representing the extent to which the transport system counteracts the spatial distribution of socio-demographic inequality (values less than one), or whether transport exacerbates social inequality (values greater than one). The relative version combines the social and relative transport layers, with low values reflecting the two layers combining to reduce overall spatial variation, while high values reflect the combination of layers enhancing spatial variation.",
    "sd_uta2trans_abs": "Single index representing the extent to which the transport system counteracts the spatial distribution of socio-demographic inequality (values less than one), or whether transport exacerbates social inequality (values greater than one). The absolute version combines the social and absolute transport layers, with low values reflecting the two layers combining to reduce overall spatial variation, while high values reflect the combination of layers enhancing spatial variation.",
}

export default function ExplainButton (props: ExplainProps) {

    const layer_text = LAYER_TEXT[props.layer as keyof LayerTextProps];

    return (
        <div id="divinfo" style={{display: props.explain?"":"none"}} >
            <div id="explain-layer" className={styles.statstext}>
                <p>{layer_text} </p>
            </div>
        </div>
    )
}
