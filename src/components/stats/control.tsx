
import {useState} from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/controls.module.css';
import LayerList from '@/components/stats/layerlist';
import SelectNumLayers from '@/components/stats/num_layers';
import SortOrderList from '@/components/stats/sortOrderList';
import ExplainButton from '@/components/stats/explain-button';
import ExplainLayer from '@/components/stats/explain-layer';
import MeanAvgButtons from '@/components/stats/mean-avg';

import { CityDataProps } from "@/data/interfaces";

interface StatsControlProps {
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    numLayersOptions: string[],
    meanVals: boolean,
    explain: any,
    sortOpt: string,
    citiesArray: CityDataProps[],
    handleLayerChange: (layer: string) => void,
    handleLayer2Change: (layer2: string) => void,
    handleNumLayersChange: (numLayers: string) => void,
    handleMeanChange: (meanVals: boolean) => void,
    handleSortChange: (sortOpt: string) => void,
    handleExplainChange: (explain: any) => void
}


export default function Control (props: StatsControlProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const cityNames = props.citiesArray.map((item) => item.name);

    const [hideControls, setHideControls] = useState(false);
    const handleControlsVisibility = (pHideControls: boolean) => {
        setHideControls(pHideControls);
    }

    return (
        <>
        <div id="top-left-container" className={styles.controls}>
            <div id="divinfo" style={{display: hideControls?"none":""}}>

            <button
                id="btnHideControls"
                className="btn-transparent right-align"
                onClick={() => handleControlsVisibility(true)}
            >
                X
            </button>

            <h3>
            <Image
            src="/ua.svg"
            alt="UA Logo"
            // className={styles.vercelLogo}
            width={100}
            height={50}
            />
            </h3>

            <h3>Layer</h3>
            <SelectNumLayers
                numLayers = {props.numLayers}
                numLayersOptions = {props.numLayersOptions}
                handleNumLayersChange = {props.handleNumLayersChange}
            />
            <LayerList
                layer = {props.layer}
                handleLayerChange = {props.handleLayerChange}
            />
            {props.numLayers == "Paired"  &&
                <LayerList
                    layer = {props.layer2}
                    handleLayerChange = {props.handleLayer2Change}
                />
            }

            <MeanAvgButtons
                meanVals = {props.meanVals}
                singleLayer = {props.numLayers != "Paired"}
                handleMeanChange = {props.handleMeanChange}
            />
            <h3>Sort Order</h3>
            <SortOrderList
                sortOpt = {props.sortOpt}
                handleSortChange = {props.handleSortChange}
            />
            <ExplainButton
                explain = {props.explain}
                handleExplainChange = {props.handleExplainChange} />
            </div>

            <button
                id="btnShowControls"
                style={{display:hideControls?"":"none"}}
                onClick={() => handleControlsVisibility(false)}
            >Show Controls</button>

        </div>
        <ExplainLayer
            idx={props.idx}
            layer = {props.layer}
            layer2 = {props.layer2}
            numLayers = {props.numLayers}
            explain = {props.explain}
            meanVals = {props.meanVals}
            citiesArray={props.citiesArray}
        />
        </>
        )
};
