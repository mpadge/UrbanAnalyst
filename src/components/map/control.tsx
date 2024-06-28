
import { ChangeEvent, SyntheticEvent, SetStateAction, useState, useRef } from 'react';
import Link from 'next/link'
import Image from "next/image"
import localFont from 'next/font/local'

import styles from '@/styles/controls.module.css';
import CityList from '@/components/map/cityList';
import LayerList from '@/components/map/layerList';
import SelectNumLayers from '@/components/map/numLayers';
import OpacitySlider from '@/components/map/opacitySlider';
import RangeSlider from '@/components/map/rangeSlider';
import ExplainButton from '@/components/map/explainButton';
import ExplainLayer from '@/components/map/explainLayer';
import HelpButton from '@/components/map/helpButton';

import { ViewState, CityDataProps } from "@/data/interfaces";

const junctionFont = localFont({ src: '../../app/junction-regular.woff' })

interface MapControlProps {
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    numLayersOptions: string[],
    alpha: number,
    layerRange: number[],
    layerStartStop: number[],
    explain: any,
    citiesArray: CityDataProps[],
    cityLayers: string[],
    viewState: ViewState,
    handleIdxChange: (pIdx: number) => void,
    handleNumLayersChange: (numLayers: string) => void,
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void,
    handleLayerChange: (layer: string) => void,
    handleLayer2Change: (layer: string) => void,
    handleLayerRangeChange: (layerRange: number[]) => void,
    handleLayerStartStopChange: (layerStartStop: number[]) => void,
    handleExplainChange: (explain: any) => void
    handleTourOpen: (isTourOpen: boolean) => void
}


export default function Control (props: MapControlProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const cityNames = props.citiesArray.map((item) => item.name);

    const [hideControls, setHideControls] = useState(false);
    const handleControlsVisibility = (pHideControls: boolean) => {
        setHideControls(pHideControls);
    }

    console.log("-------layer (min, max) = (", props.layerRange[0], ", ", props.layerRange[1], ")");

    const [sliderValues, setSliderValues] = useState<number[]>(props.layerRange);
    var step = Math.floor(props.layerRange[1] - props.layerRange[0]) / 20;
    var multiplier = 10;
    while (step === 0) {
        const stepTemp = Math.floor(multiplier * (props.layerRange[1] - props.layerRange[0]) / 20) / multiplier;
        if (stepTemp !== 0) {
            step = stepTemp;
            break;
        }
        multiplier *= 10;
    }
    const handleSliderValuesChange = (
        event: Event,
        value: number | number [],
        activeThumb: number
    ) => {

        let newValue: number[];
        if (typeof value === 'number') {
            newValue = [value];
        } else {
            newValue=value;
            // props.handleLayerRangeChange(value);
        }

        setSliderValues(newValue);
    };

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

                    <p>
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
                    </p>

                    <h3>City</h3>
                    <CityList
                        citiesArray={props.citiesArray}
                        idx={props.idx}
                        viewState = {props.viewState}
                        handleIdxChange={props.handleIdxChange}
                        handleViewStateChange={props.handleViewStateChange}
                        // onSelect={city => props.handleIdxChange(props.idx)}
                    />

                    <h3>Layer</h3>
                    <SelectNumLayers
                        numLayers = {props.numLayers}
                        numLayersOptions = {props.numLayersOptions}
                        handleNumLayersChange = {props.handleNumLayersChange}
                    />
                    <LayerList
                        layer = {props.layer}
                        handleLayerChange = {props.handleLayerChange}
                        cityLayers = {props.cityLayers}
                    />

                    {props.numLayers == "Paired"  &&
                        <LayerList
                            layer = {props.layer2}
                            handleLayerChange = {props.handleLayer2Change}
                            cityLayers = {props.cityLayers}
                        />
                    }

                    <h3>Opacity</h3>
                    <OpacitySlider
                        alpha = {props.alpha}
                        handleAlphaChange={props.handleAlphaChange}
                    />

                    <h3>Plot Limits</h3>
                    <RangeSlider
                        rangeMin = {props.layerRange[0]}
                        rangeMax = {props.layerRange[1]}
                        sliderValues = {sliderValues}
                        step = {step}
                        handleSliderValuesChange={handleSliderValuesChange}
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
                idx={props.idx}
                layer = {props.layer}
                layer2 = {props.layer2}
                numLayers = {props.numLayers}
                explain = {props.explain}
                meanVals = {true}
                citiesArray={props.citiesArray}
            />
        </>
    )
};
