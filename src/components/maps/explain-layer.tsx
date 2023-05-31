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
    const layer_text = GetLayerText(props.layer, props.layer2, props.numLayers, meanVarIndex, paired_keys);

    return (
        <div id="divinfo" style={{display: props.explain?"":"none"}} >
            <div id="explain-layer" className={styles.explaintext}>
                <p>{layer_text} </p>
            </div>
        </div>
    )
}
