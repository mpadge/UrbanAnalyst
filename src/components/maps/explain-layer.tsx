import { useState } from 'react';
import styles from '@/styles/controls.module.css';
import { CityDataProps } from "@/data/interfaces";
import { GetLayerText } from "@/components/explain-layer";

interface MapsExplainProps {
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    explain: boolean,
    meanVals: boolean,
    citiesArray: CityDataProps[]
}

export default function ExplainButton (props: MapsExplainProps) {

    const meanVarIndex = 0;
    const paired_keys: string[] = Object.keys(props.citiesArray[props.idx].dataIntervalsPaired);
    const layer_temp = GetLayerText(props.layer, props.layer2, props.numLayers, meanVarIndex, paired_keys);
    // But set layer text to city data "social_index" field if that single layer
    // is selected:
    const layer_is_paired: boolean = paired_keys.includes(layer_temp);
    const layer_text = !layer_is_paired && props.layer == "social_index" ?
        props.citiesArray[props.idx].social_index : layer_temp;

    return (
        <div id="divinfo" style={{display: props.explain?"":"none"}} >
            <div id="explain-layer" className={styles.explaintext}>
                <p>{layer_text} </p>
            </div>
        </div>
    )
}
