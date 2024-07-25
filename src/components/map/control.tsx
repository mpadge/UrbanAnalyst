
import { ChangeEvent, SyntheticEvent, SetStateAction, useEffect, useState } from 'react';
import Link from 'next/link'
import Image from "next/image"
import localFont from 'next/font/local'

import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import styles from '@/styles/controls.module.css';
import CityList from '@/components/map/cityList';
import LayerList from '@/components/map/layerList';
import LayerList2 from '@/components/map/layerList2';
import SelectNumLayers from '@/components/map/numLayers';
import OpacitySlider from '@/components/map/opacitySlider';
import RangeSlider from '@/components/map/rangeSlider';
import ExplainButton from '@/components/map/explainButton';
import HelpButton from '@/components/helpButton';

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
    handleTourOpen: (isTourOpen: boolean) => void
}

const RootSpacing = styled('div')(({ theme }) => ({
    width: '100%',
    marginTop: '12px',
    marginBottom: '0px',
}));

export default function Control (props: MapControlProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const cityNames = props.citiesArray.map((item) => item.name);

    const [hideControls, setHideControls] = useState(false);
    const handleControlsVisibility = (pHideControls: boolean) => {
        setHideControls(pHideControls);
    }

    const [sliderValues, setSliderValues] = useState<number[]>(props.layerRange);
    useEffect(() => {
        setSliderValues(props.layerRange);
    }, [props.layerRange]);

    var step = Math.floor(props.layerStartStop[1] - props.layerStartStop[0]) / 20;
    var multiplier = 10;
    while (step === 0) {
        const stepTemp = Math.floor(multiplier * (props.layerStartStop[1] - props.layerStartStop[0]) / 20) / multiplier;
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
            props.handleLayerRangeChange(value);
        }

        setSliderValues(newValue);
    };

    return (
        <>
            <div id="top-left-container" className={`${styles.controls} ${junctionFont.className}`}>
                <div id="divinfo" style={{display: hideControls?"none":""}}>

                    <Tooltip title="Click to close controls">
                    <button
                        id="btnHideControls"
                        className="btn-transparent right-align"
                        onClick={() => handleControlsVisibility(true)}
                    >
                        <Image
                            src="/ua.svg"
                            alt="UA Logo"
                            width={20}
                            height={10}
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }}
                        />
                    </button>
                    </Tooltip>

                    <CityList
                        citiesArray={props.citiesArray}
                        idx={props.idx}
                        viewState = {props.viewState}
                        handleIdxChange={props.handleIdxChange}
                        handleViewStateChange={props.handleViewStateChange}
                        // onSelect={city => props.handleIdxChange(props.idx)}
                    />

                    <RootSpacing>
                        <Divider flexItem >Layer Controls</Divider>
                        <Box sx={{ p: 1 }}>
                            <Stack spacing={1} alignItems="center" marginBottom="8px">
                                <SelectNumLayers
                                    numLayers = {props.numLayers}
                                    numLayersOptions = {props.numLayersOptions}
                                    handleNumLayersChange = {props.handleNumLayersChange}
                                />
                            </Stack>
                            <Stack spacing={1}>
                                <LayerList
                                    title = {props.numLayers == "Paired" ? "Layer1" : "Layer"}
                                    layer = {props.layer}
                                    handleLayerChange = {props.handleLayerChange}
                                    cityLayers = {props.cityLayers}
                                />

                                {props.numLayers == "Paired"  &&
                                    <LayerList2
                                        title = "Layer2"
                                        layer1 = {props.layer}
                                        layer2 = {props.layer2}
                                        handleLayerChange = {props.handleLayer2Change}
                                        cityLayers = {props.cityLayers}
                                    />
                                }
                                <ExplainButton
                                    idx={props.idx}
                                    layer = {props.layer}
                                    layer2 = {props.layer2}
                                    numLayers = {props.numLayers}
                                    meanVals = {true}
                                    citiesArray={props.citiesArray}
                                />

                            </Stack>
                        </Box>
                    </RootSpacing>

                    <RootSpacing>
                        <Divider flexItem >Colour Controls</Divider>
                        <Typography variant="h3" align="center" margin="0">
                            Opacity
                        </Typography>
                        <OpacitySlider
                            alpha = {props.alpha}
                            handleAlphaChange={props.handleAlphaChange}
                        />

                        <Typography variant="h3" align="center" margin="0">
                            Colour Limits
                        </Typography>
                        <RangeSlider
                            rangeMin = {props.layerStartStop[0]}
                            rangeMax = {props.layerStartStop[1]}
                            sliderValues = {sliderValues}
                            step = {step}
                            handleSliderValuesChange={handleSliderValuesChange}
                        />
                    </RootSpacing>

                    <Divider flexItem />
                    <Stack spacing={1} margin="5px">
                        <HelpButton
                            handleTourOpen = {props.handleTourOpen}
                        />
                    </Stack>
                </div>

                <button
                    id="btnShowControls"
                    style={{display:hideControls?"":"none"}}
                    onClick={() => handleControlsVisibility(false)}
                >
                    <Image
                        src="/ua.svg"
                        alt="UA Logo"
                        width={20}
                        height={10}
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }}
                    />
                    Show Controls
                </button>

            </div>
        </>
    )
};
