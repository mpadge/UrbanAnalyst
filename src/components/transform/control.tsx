
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link'
import Image from 'next/image'

import styles from '@/styles/controls.module.css';
import CityList from '@/components/maps/citylist';
import LayersList from '@/components/transform/layerslist';
import LayersList2 from '@/components/transform/layerslist2';
import TargetCityList from '@/components/transform/citylist';
import LayerList from '@/components/maps/layerlist';
import SelectNumLayers from '@/components/maps/num_layers';
import OpacitySlider from '@/components/maps/slider';
import LayersButton from '@/components/transform/layers-button';
import CalculateButton from '@/components/transform/calculate-button';

import { ViewState, CityDataProps, CalculateButtonProps } from "@/data/interfaces";

interface TransformControlProps {
    idx: number,
    idx2: number,
    layer: string
    varnames: string[]
    calculate: boolean,
    alpha: number,
    citiesArray: CityDataProps[],
    viewState: ViewState,
    handleIdxChange: (pIdx: number) => void,
    handleIdx2Change: (pIdx2: number) => void,
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void,
    handleLayerChange: (layer: string) => void,
    handleCalculateChange: (calculate: boolean) => void
    handleVarnamesChange: (varnames: string[]) => void
}


export default function Control (props: TransformControlProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const cityNames = props.citiesArray.map((item) => item.name);

    const [showLayersDialog, setShowLayerssDialog] = useState(false);
    const handleLayersDialogVisibility = (showLayerssDialog: boolean) => {
        setShowLayerssDialog(!showLayersDialog);
    }

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
                src="/ua.svg"
                alt="UA Logo"
                // className={styles.vercelLogo}
                width={100}
                height={50}
                />
                </p>

                <h3>City</h3>
                <CityList
                    citiesArray={props.citiesArray}
                    idx={props.idx}
                    viewState = {props.viewState}
                    handleIdxChange={props.handleIdxChange}
                    handleViewStateChange={props.handleViewStateChange}
                />

                <h3>Target City</h3>
                <TargetCityList
                    citiesArray={props.citiesArray}
                    idx={props.idx2}
                    handleIdxChange={props.handleIdx2Change}
                />

                <h3>Layer</h3>
                <LayerList
                    layer = {props.layer}
                    handleLayerChange = {props.handleLayerChange}
                />

                <h3>Variables</h3>
                <LayersList
                    layer = {props.layer}
                    layers = {props.varnames}
                    handleLayersChange = {props.handleVarnamesChange}
                />
                <LayersButton
                    showLayersDialog={showLayersDialog}
                    handleLayersDialogVisibility={handleLayersDialogVisibility}
                />

                <h3>Opacity</h3>
                <OpacitySlider
                    alpha = {props.alpha}
                    handleAlphaChange={props.handleAlphaChange}
                />

                <CalculateButton
                    calculate={props.calculate}
                    handleCalculateChange={props.handleCalculateChange}
                />
            </div>

            <button
                id="btnShowControls"
                style={{display:hideControls?"":"none"}}
                onClick={() => handleControlsVisibility(false)}
            >Show Controls</button>

        </div>
        <div id="layerlist-container" className={styles.layerlist} style={{display: showLayersDialog?"":"none"}}>
            <LayersList2
                layer = {props.layer}
                layers = {props.varnames}
                handleLayersChange = {props.handleVarnamesChange}
            />
        </div>
        </>
        )
};
