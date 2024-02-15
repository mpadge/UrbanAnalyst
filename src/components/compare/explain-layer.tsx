import { useState } from 'react';
import styles from '@/styles/compare.module.css';
import { CityDataProps } from "@/data/interfaces";
import { GetLayerText, GetLayerTextStats } from "@/components/explain-layer";

interface CompareExplainProps {
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    explain: boolean,
    meanVals: boolean,
    citiesArray: CityDataProps[]
}

export default function ExplainButton (props: CompareExplainProps) {

    const meanVarIndex = props.meanVals ? 0 : 1;
    const paired_keys = Object.keys(props.citiesArray[props.idx].dataRangesPaired);

    const layer1: string = props.layer.replace("\_", "").replace("index", "");
    const layer2: string = props.layer2.replace("\_", "").replace("index", "");
    const these_layers =
        paired_keys.includes(layer1 + "_" + layer2) ?
        layer1 + "_" + layer2 : layer2 + "_" + layer1;
    const dual_layers: boolean = paired_keys.includes(these_layers);
    const layer_temp = dual_layers ? 
        GetLayerTextStats(props.layer, props.layer2, props.numLayers, meanVarIndex, paired_keys) :
        GetLayerText(props.layer, props.layer2, props.numLayers, meanVarIndex, paired_keys);

    // But set layer text to city data "social_index" field if that single layer
    // is selected:
    const layer_text = !dual_layers && props.layer == "social_index" ?
        "Social indices are not comparable between different cities" : layer_temp;

    return (
        <div id="divinfo" style={{display: props.explain?"":"none"}} >
            <div id="explain-layer" className={styles.statstext}>
                <p>{layer_text} </p>
            </div>
        </div>
    )
}
