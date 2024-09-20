
import { SyntheticEvent, useCallback, useEffect, useState, useRef } from 'react';
import Link from 'next/link'
import Image from "next/image"
import localFont from 'next/font/local'

import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import styles from '@/styles/controls.module.css';
import CityList from '@/components/transform/cityList';
import LayersList from '@/components/transform/layersList';
import TargetCityList from '@/components/transform/targetCityList';
import LayerList from '@/components/transform/layerList';
import SelectNumLayers from '@/components/map/numLayers';
import OpacitySlider from '@/components/map/opacitySlider';
import RangeSlider from '@/components/map/rangeSlider';
import OutputLayers from '@/components/transform/outputLayers';
import HelpButton from '@/components/helpButton';

import { ViewState, CityDataProps } from "@/data/interfaces";

const junctionFont = localFont({ src: '../../app/junction-regular.woff' })

interface TransformControlProps {
    idx: number,
    idx2: number,
    layer: string
    varnames: string[]
    alpha: number,
    layerRange: number[]
    layerStartStop: number[]
    citiesArray: CityDataProps[],
    cityLayers: string[],
    viewState: ViewState,
    outputLayer: string
    handleIdxChange: (pIdx: number) => void,
    handleIdx2Change: (pIdx2: number) => void,
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void,
    handleLayerChange: (layer: string) => void,
    setLayerRange: (layerRange: number[]) => void,
    setVarnames: (varnames: string[]) => void
    handleOutputLayerChange: (outputLayer: string) => void
    handleTourOpen: (isTourOpen: boolean) => void
}

interface DefaultExtraLayersProps {
    idx: number,
    idx2: number,
    layer: string,
    citiesArray: CityDataProps[]
}

const RootSpacing = styled('div')(({ theme }) => ({
    width: '100%',
    marginTop: '12px',
    marginBottom: '0px',
}));

export function DefaultExtraLayers (props: DefaultExtraLayersProps) {

    const source_city_values =
    Object.entries(props.citiesArray[props.idx].stats_single);
    const source_city_mean_all = source_city_values.map(([key, value]) => ({
        name: key,
        value: value[0]
    }));
    const target_city_values = Object.entries(props.citiesArray[props.idx2].stats_single);
    const target_city_mean_all = target_city_values.map(([key, value]) => ({
        name: key,
        value: value[0]
    }));
    const source_city_mean = source_city_mean_all.filter(entry => entry.name !== props.layer);
    const target_city_mean = target_city_mean_all.filter(entry => entry.name !== props.layer);

    // Directions of comparison for each variable. If 'lower', then lower
    // values are better.
    const comparisons = [
        { name: "social_index", lower: true },
        { name: "times_rel", lower: true},
        { name: "times_abs", lower: true},
        { name: "transfers", lower: true},
        { name: "intervals", lower: true},
        { name: "transport", lower: true},
        { name: "popdens", lower: true},
        { name: "school_dist", lower: true},
        { name: "bike_index", lower: true},
        { name: "natural", lower: true},
        { name: "parking", lower: true},
    ];
    let varnames: string[] = [];
    comparisons.forEach(comparison => {
        const sourceEntry = source_city_mean.find(entry => entry.name === comparison.name);
        const targetEntry = target_city_mean.find(entry => entry.name === comparison.name);

        if (sourceEntry && targetEntry) {
            if ((comparison.lower && targetEntry.value < sourceEntry.value) ||
                (!comparison.lower && targetEntry.value > sourceEntry.value)) {
                varnames.push(comparison.name);
            }
        }
    });

    return varnames;
}


export default function Control (props: TransformControlProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const cityNames = props.citiesArray.map((item) => item.name);

    const [showLayersDialog, setShowLayerssDialog] = useState(false);
    const handleLayersDialogVisibility = useCallback((showLayersDialog: boolean) => {
        setShowLayerssDialog(showLayersDialog => !showLayersDialog);
    }, []);

    const [hideControls, setHideControls] = useState(false);
    const handleControlsVisibility = (pHideControls: boolean) => {
        setHideControls(pHideControls);
    }
    const [uaLogo, setUaLogo] = useState('/ua.svg');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setUaLogo(dark ? '/ua-dark.svg' : 'ua.svg');
        }
    }, []);

    const [defaultVarnames, setDefaultVarnames] = useState(props.varnames);

    // Effect to set default "Extra layers" as all those with better values:
    const initialSetDefaultValues = useRef(false);
    const { idx, idx2, layer, citiesArray, setVarnames } = props;
    useEffect(() => {
        if (!initialSetDefaultValues.current) {
            const varnames = DefaultExtraLayers({ idx, idx2, layer, citiesArray });
            setDefaultVarnames(varnames);
            setVarnames(varnames);
            initialSetDefaultValues.current = true;
        }
    }, [idx, idx2, layer, citiesArray, setVarnames]);

    const [openExtraLayers, setOpenExtraLayers] = useState(false);

    const handleClickOpenExtraLayers = () => {
        setOpenExtraLayers(true);
    };

    const handleCloseExtraLayers = () => {
        setOpenExtraLayers(false);
    };

    // Layer range sliders:
    const [sliderValues, setSliderValues] = useState<number[]>(props.layerRange);
    useEffect(() => {
        setSliderValues(props.layerRange);
    }, [props.layerRange]);

    var layerRangeStep = Math.floor(props.layerStartStop[1] - props.layerStartStop[0]) / 20;
    var multiplier = 10;
    while (layerRangeStep === 0) {
        const stepTemp = Math.floor(multiplier * (props.layerStartStop[1] - props.layerStartStop[0]) / 20) / multiplier;
        if (stepTemp !== 0) {
            layerRangeStep = stepTemp;
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
            props.setLayerRange(value);
        }

        setSliderValues(newValue);
    };

    return (
        <>
            <div id="top-left-container" className={`${styles.controlsTransform} ${styles.light} ${junctionFont.className}`}>
                <div id="divinfo" style={{display: hideControls?"none":""}}>

                    <Tooltip title="Click to close controls">
                    <button
                        id="btnHideControls"
                        className="btn-transparent right-align"
                        onClick={() => handleControlsVisibility(true)}
                    >
                        <Image
                            src={uaLogo}
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
                    />

                    <TargetCityList
                        idx={props.idx}
                        idx2={props.idx2}
                        citiesArray={props.citiesArray}
                        handleIdx2Change={props.handleIdx2Change}
                    />

                    <RootSpacing>
                        <Divider sx={{ color: 'black' }} flexItem >Layer Controls</Divider>
                        <Box sx={{ p: 1 }}>
                            <Stack spacing={1} alignItems="center" marginBottom="0px">
                                <LayerList
                                    idx = {props.idx}
                                    idx2 = {props.idx2}
                                    citiesArray = {props.citiesArray}
                                    title = "Layer"
                                    layer = {props.layer}
                                    handleLayerChange = {props.handleLayerChange}
                                    varnames = {props.varnames}
                                    setVarnames = {props.setVarnames}
                                    cityLayers = {props.cityLayers}
                                />
                            </Stack>

                            <Stack alignItems="center">
                                <Button
                                    // variant="outlined"
                                    onClick={handleClickOpenExtraLayers}
                                >
                                    Extra Layers
                                </Button>
                            </Stack>

                            <Stack alignItems="center">
                                <OutputLayers
                                    outputLayer = {props.outputLayer}
                                    handleOutputLayerChange={props.handleOutputLayerChange}
                                />
                            </Stack>
                        </Box>
                    </RootSpacing>

                    <RootSpacing>
                        <Divider sx={{ color: 'black' }} flexItem >Colour Controls</Divider>
                        <Box sx={{ p: 0 }}>
                            <Stack alignItems="center">
                                <Typography sx={{ color: 'black' }} variant="h3" align="center" margin="0">
                                    Opacity
                                </Typography>
                            </Stack>
                            <Stack alignItems="center">
                                <OpacitySlider
                                    alpha = {props.alpha}
                                    handleAlphaChange={props.handleAlphaChange}
                                />
                            </Stack>

                            <Stack alignItems="center">
                                <Typography sx={{ color: 'black' }} variant="h3" align="center" margin="0">
                                    Colour Limits
                                </Typography>
                            </Stack>
                            <Stack alignItems="center" marginBottom="2px">
                                <RangeSlider
                                    rangeMin = {props.layerStartStop[0]}
                                    rangeMax = {props.layerStartStop[1]}
                                    sliderValues = {sliderValues}
                                    step = {layerRangeStep}
                                    handleSliderValuesChange={handleSliderValuesChange}
                                />
                            </Stack>
                        </Box>
                    </RootSpacing>

                    <HelpButton
                        handleTourOpen = {props.handleTourOpen}
                    />

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
            <div>
                <Dialog disableEscapeKeyDown open={openExtraLayers} onClose={handleCloseExtraLayers}>
                    <LayersList
                        idx = {props.idx}
                        idx2 = {props.idx2}
                        citiesArray = {props.citiesArray}
                        layer = {props.layer}
                        varnames = {props.varnames}
                        setVarnames = {props.setVarnames}
                        handleClose={handleCloseExtraLayers}
                    />
                </Dialog>
            </div>
        </>
    )
};
