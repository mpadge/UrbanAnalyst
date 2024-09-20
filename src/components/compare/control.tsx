
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from "next/image"
import localFont from 'next/font/local'

import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import LayerList from '@/components/compare/layerlist';
import SelectNumLayers from '@/components/compare/numLayers';
import SortOrderList from '@/components/compare/sortOrderList';
import ExplainButton from '@/components/compare/explainButton';
import MeanVarButtons from '@/components/compare/meanVar';
import HelpButton from '@/components/helpButton';

import styles from '@/styles/controls.module.css';
import { CityDataProps } from "@/data/interfaces";
import { getIdxWashington } from '@/components/headingText';

const junctionFont = localFont({ src: '../../app/junction-regular.woff' })

interface CompareControlProps {
    layer: string,
    layer2: string,
    numLayers: string,
    numLayersOptions: string[],
    meanVals: boolean,
    sortOpt: string,
    citiesArray: CityDataProps[],
    handleLayerChange: (layer: string) => void,
    handleLayer2Change: (layer2: string) => void,
    handleNumLayersChange: (numLayers: string) => void,
    handleMeanChange: (meanVals: boolean) => void,
    handleSortChange: (sortOpt: string) => void,
    handleTourOpen: (isTourOpen: boolean) => void
}

const LayerSpacing = styled('div')(({ theme }) => ({
    width: '100%',
    marginTop: '0px',
    marginBottom: '8px',
}));

const SortOrderSpacing = styled('div')(({ theme }) => ({
    width: '100%',
    marginTop: '0px',
    marginBottom: '12px',
}));

export default function Control (props: CompareControlProps) {

    const cityNames = props.citiesArray.map((item) => item.name);

    const [hideControls, setHideControls] = useState(false);
    const handleControlsVisibility = (pHideControls: boolean) => {
        setHideControls(pHideControls);
    }
    const [controlStyle, setControStyle] = useState(styles.light);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setControStyle(dark ? styles.dark : styles.light);
        }
    }, []);
    const [uaLogo, setUaLogo] = useState('/ua.svg');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setUaLogo(dark ? '/ua-dark.svg' : 'ua.svg');
        }
    }, []);

    const IdxWashington = getIdxWashington(props.citiesArray);

    return (
        <>
            <div id="top-left-container" className={`${styles.controls} ${controlStyle} ${junctionFont.className}`}>
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

                    <LayerSpacing>
                        <Box sx={{ p: 1 }}>
                            <Stack spacing={1} alignItems="center" marginBottom="0px">
                                <SelectNumLayers
                                    numLayers = {props.numLayers}
                                    numLayersOptions = {props.numLayersOptions}
                                    handleNumLayersChange = {props.handleNumLayersChange}
                                />
                            </Stack>
                            <Stack spacing={1} alignItems="center" marginBottom="0px">
                                <LayerList
                                    title = "Layer"
                                    layer = {props.layer}
                                    singleLayer = {props.numLayers != "Paired"}
                                    handleLayerChange = {props.handleLayerChange}
                                />
                            </Stack>
                            {props.numLayers == "Paired"  &&
                                <Stack spacing={1} alignItems="center" marginBottom="0px">
                                    <LayerList
                                        title = "Paired Layer"
                                        layer = {props.layer2}
                                        singleLayer = {props.numLayers != "Paired"}
                                        handleLayerChange = {props.handleLayer2Change}
                                    />
                                </Stack>
                            }

                            {props.numLayers != "Paired" &&
                                <Stack spacing={1} alignItems="center" marginBottom="0px">
                                    <MeanVarButtons
                                        meanVals = {props.meanVals}
                                        singleLayer = {props.numLayers != "Paired"}
                                        handleMeanChange = {props.handleMeanChange}
                                    />
                                </Stack>
                            }
                        </Box>
                    </LayerSpacing>

                    <SortOrderSpacing>
                    <Box sx={{ p: 1 }}>
                        <Stack spacing={1} alignItems="center" marginBottom="0px">
                            <SortOrderList
                                sortOpt = {props.sortOpt}
                                handleSortChange = {props.handleSortChange}
                            />
                        </Stack>
                    </Box>
                    </SortOrderSpacing>
                    <ExplainButton
                        idx={IdxWashington}
                        layer = {props.layer}
                        layer2 = {props.layer2}
                        numLayers = {props.numLayers}
                        meanVals = {true}
                        citiesArray={props.citiesArray}
                    />
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
        </>
    )
};
