
import { useCallback, useEffect, useState, useRef } from 'react';
import Link from 'next/link'
import Image from "next/legacy/image"
import localFont from 'next/font/local'

import styles from '@/styles/controls.module.css';
import CityList from '@/components/transform/cityList';
import LayersList from '@/components/transform/LayersList';
import TargetCityList from '@/components/transform/targetCityList';
import LayerList from '@/components/map/layerlist';
import SelectNumLayers from '@/components/map/num_layers';
import OpacitySlider from '@/components/map/slider';
import LayersButton from '@/components/transform/layers-button';
import CalculateButton from '@/components/transform/calculate-button';
import OutputLayers from '@/components/transform/outputLayers';
import HelpButton from '@/components/transform/help-button';

import { ViewState, CityDataProps, CalculateButtonProps } from "@/data/interfaces";

const junctionFont = localFont({ src: '../../app/junction-regular.woff' })

interface TransformControlProps {
    idx: number,
    idx2: number,
    layer: string
    varnames: string[]
    calculate: boolean,
    alpha: number,
    citiesArray: CityDataProps[],
    viewState: ViewState,
    outputLayer: string
    handleIdxChange: (pIdx: number) => void,
    handleIdx2Change: (pIdx2: number) => void,
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void,
    handleLayerChange: (layer: string) => void,
    handleCalculateChange: (calculate: boolean) => void
    handleVarnamesChange: (varnames: string[]) => void
    handleOutputLayerChange: (outputLayer: string) => void
    handleTourOpen: (isTourOpen: boolean) => void
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
    const [initialSetDefaultValues, setInitialSetDefaultValues] = useState(true);
    const { handleVarnamesChange } = props;
    useEffect(() => {
        if (!initialSetDefaultValues) { return; }

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
        setDefaultVarnames(varnames);
        handleVarnamesChange(varnames);
        setInitialSetDefaultValues(false);

    }, [props.idx, props.idx2, props.layer, props.citiesArray, initialSetDefaultValues, handleVarnamesChange]);

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
                    idx2={props.idx2}
                    citiesArray={props.citiesArray}
                    handleIdx2Change={props.handleIdx2Change}
                />

                <h3>Layer</h3>
                <LayerList
                    layer = {props.layer}
                    handleLayerChange = {props.handleLayerChange}
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
                <h3>Output Layer</h3>
                <OutputLayers
                    outputLayer = {props.outputLayer}
                    handleOutputLayerChange={props.handleOutputLayerChange}
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
        <div
            id="layerlist-container"
            className={styles.layerlist}
            style={{display: showLayersDialog?"":"none"}}
        >
            <LayersList
                layer = {props.layer}
                varnames = {props.varnames}
                handleVarnamesChange = {props.handleVarnamesChange}
                setInitialSetDefaultValues={setInitialSetDefaultValues}
            />
        </div>
        </>
        )
};
