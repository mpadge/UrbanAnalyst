
import {useState} from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/controls.module.css';
import CityList from '@/components/maps/citylist';
import LayerList from '@/components/maps/layerlist';
import OpacitySlider from '@/components/maps/slider';
import ExplainButton from '@/components/maps/explain-button';
import ExplainLayer from '@/components/maps/explain-layer';

import { ViewState, CityDataProps } from "@/data/interfaces";

export interface MapsControlProps {
    idx: number,
    layer: string,
    alpha: number,
    explain: any,
    citiesArray: CityDataProps[],
    viewState: ViewState,
    handleIdxChange: (pIdx: number) => void,
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void,
    handleLayerChange: (layer: string) => void,
    handleExplainChange: (explain: any) => void
}

export default function Control (props: MapsControlProps) {

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

            <p>
            <Image
            src="/uta.svg"
            alt="UTA Logo"
            // className={styles.vercelLogo}
            width={100}
            height={50}
            />
            </p>

            <CityList
                citiesArray={props.citiesArray}
                idx={props.idx}
                viewState = {props.viewState}
                handleIdxChange={props.handleIdxChange}
                handleViewStateChange={props.handleViewStateChange}
                // onSelect={city => props.handleIdxChange(props.idx)}
            />
            <h3>Layer</h3>
            <LayerList
                layer = {props.layer}
                handleLayerChange = {props.handleLayerChange}
            />
            <h3>Opacity</h3>
            <OpacitySlider
                alpha = {props.alpha}
                handleAlphaChange={props.handleAlphaChange}
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
            explain = {props.explain}
            meanVals = {true}
            citiesArray={props.citiesArray}
        />
        </>
        )
};
