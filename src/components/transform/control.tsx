
import { SyntheticEvent, useCallback, useEffect, useState, useRef } from 'react';
import Link from 'next/link'
import Image from "next/image"
import localFont from 'next/font/local'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import styles from '@/styles/controls.module.css';
import CityList from '@/components/transform/cityList';
import LayersList from '@/components/transform/layersList';
import TargetCityList from '@/components/transform/targetCityList';
import LayerList from '@/components/transform/layerList';
import SelectNumLayers from '@/components/map/numLayers';
import OpacitySlider from '@/components/map/opacitySlider';
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


    return (
        <>
            <div id="top-left-container" className={`${styles.controlsTransform} ${junctionFont.className}`}>
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
                            className={styles.transformLogo}
                            width={100}
                            height={50}
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }}
                        />
                    </p>

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

                    <Stack alignItems="center">
                        <Button
                            // variant="outlined"
                            onClick={handleClickOpenExtraLayers}
                        >
                            Extra Layers
                        </Button>
                    </Stack>

                    <OutputLayers
                        outputLayer = {props.outputLayer}
                        handleOutputLayerChange={props.handleOutputLayerChange}
                    />

                    <h3>Opacity</h3>
                    <OpacitySlider
                        alpha = {props.alpha}
                        handleAlphaChange={props.handleAlphaChange}
                    />

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
