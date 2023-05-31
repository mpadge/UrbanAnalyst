import { useState } from 'react';
import styles from '@/styles/stats.module.css';
import { CityDataProps } from "@/data/interfaces";
import { GetLayerText } from "@/components/explain-layer";

interface StatsExplainProps {
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    explain: boolean,
    meanVals: boolean,
    citiesArray: CityDataProps[]
}

export default function ExplainButton (props: StatsExplainProps) {

    const meanVarIndex = props.meanVals ? 0 : 1;
    const paired_keys = Object.keys(props.citiesArray[props.idx].dataIntervalsPaired);
    const layer_text = props.layer == "social_index" ?
        "No social index statistics are displayer" :
        GetLayerText(props.layer, props.layer2, props.numLayers, meanVarIndex, paired_keys);

    return (
        <div id="divinfo" style={{display: props.explain?"":"none"}} >
            <div id="explain-layer" className={styles.statstext}>
                <p>{layer_text} </p>
            </div>
        </div>
    )
}
