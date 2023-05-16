import { useState } from 'react';
import styles from '@/styles/controls.module.css';
import { CityDataProps } from "@/data/interfaces";

interface MapsExplainProps {
    idx: number,
    layer: string,
    explain: boolean,
    meanVals: boolean,
    citiesArray: CityDataProps[]
}

interface LayerTextProps {
    social_index: string,
    times_abs: string,
    times_rel: string,
    transfers: string,
    intervals: string,
    popdens: string,
    school_dist: string,
    bike_index: string,
    natural: string,
    parking: string
}


const LAYER_TEXT: LayerTextProps = {
    "social_index": "Representative socio-demographic data such as unemployment rates, deprivation indices, inequality indices, or other indices of social disadvantage.",
    "times_abs": "The average of the time taken to travel 10km from every point in a city using multi-modal transporting via any combination of walking, bicycling, or public transport. Values are specified in minutes. Lower values represent faster transport, and are always better.",
    "times_rel": "The ratio of absolute travel times for any combinations of walking, cycling, and public transport to times for equivalent journeys taken solely with private automobile. Ratios less than one represent multi-modal transport being faster than automobile transport. These ratios provide arguably the most direct insight into the propensity or incentive to use public transport: The faster public transport is in relation to equivalent automobile times, the more likely people will be to use it.",
    "transfers": "Number of Transfers per 10km of travel.",
    "intervals": "Interval between public transport services (in minutes).",
    "popdens": "Population density",
    "school_dist": "Distance to nearest school (in metres)",
    "bike_index": "Bicycle Index",
    "natural": "Nature Index",
    "parking": "Parking index"
}

export default function ExplainButton (props: MapsExplainProps) {

    var layer_text_temp: string;
    if (props.layer == "social_index") {
        layer_text_temp = props.citiesArray[props.idx].social_index;
    } else {
        layer_text_temp = LAYER_TEXT[props.layer as keyof LayerTextProps];
    }
    const layer_text: string = layer_text_temp;

    return (
        <div id="divinfo" style={{display: props.explain?"":"none"}} >
            <div id="explain-layer" className={styles.explaintext}>
                <p>{layer_text} </p>
            </div>
        </div>
    )
}
