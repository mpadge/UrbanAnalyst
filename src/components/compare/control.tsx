
import { useState } from 'react';
import Link from 'next/link'
import Image from "next/image"
import localFont from 'next/font/local'

import styles from '@/styles/controls.module.css';
import LayerList from '@/components/compare/layerlist';
import SelectNumLayers from '@/components/compare/numLayers';
import SortOrderList from '@/components/compare/sortOrderList';
import ExplainButton from '@/components/compare/explainButton';
import ExplainLayer from '@/components/compare/explainLayer';
import MeanAvgButtons from '@/components/compare/meanAvg';
import HelpButton from '@/components/compare/helpButton';

import { CityDataProps } from "@/data/interfaces";

const junctionFont = localFont({ src: '../../app/junction-regular.woff' })

interface CompareControlProps {
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
    handleTourOpen: (isTourOpen: boolean) => void
}


export default function Control (props: CompareControlProps) {

    const cityNames = props.citiesArray.map((item) => item.name);

    const [hideControls, setHideControls] = useState(false);
    const handleControlsVisibility = (pHideControls: boolean) => {
        setHideControls(pHideControls);
    }

    return (
        <>
        <div id="top-left-container" className={`${styles.controls} ${junctionFont.className}`}>
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
                width={100}
                height={50}
                style={{
                    maxWidth: "100%",
                    height: "auto"
                }}
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
            <HelpButton
                handleTourOpen = {props.handleTourOpen}
            />
            </div>

            <button
                id="btnShowControls"
                style={{display:hideControls?"":"none"}}
                onClick={() => handleControlsVisibility(false)}
            >Show Controls</button>

        </div>
        <ExplainLayer
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
