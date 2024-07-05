import { useState } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import styles from '@/styles/controls.module.css';
import { GetLayerText } from "@/components/explainLayer";
import { CityDataProps, ExplainButtonProps } from "@/data/interfaces";
import { HeadingTextOneLayer, HeadingText } from "@/components/headingText";

export interface ExplainProps {
    open: boolean,
    onClose: () => void,
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    meanVals: boolean,
    citiesArray: CityDataProps[]
}

export function ExplainLayerDialog(props: ExplainProps) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const meanVarIndex = 0;
    const paired_keys: string[] = Object.keys(props.citiesArray[props.idx].dataRangesPaired);

    const layer1: string = props.layer.replace("\_", "").replace("index", "");
    const layer2: string = props.layer2.replace("\_", "").replace("index", "");
    const these_layers =
        paired_keys.includes(layer1 + "_" + layer2) ?
            layer1 + "_" + layer2 : layer2 + "_" + layer1;
    const dual_layers: boolean = paired_keys.includes(these_layers);
    const layer_temp = GetLayerText(props.layer, props.layer2, props.numLayers, meanVarIndex, paired_keys);
    // But set layer text to city data "social_index" field if that single layer
    // is selected:
    const layer_text = !dual_layers && props.layer == "social_index" ?
        props.citiesArray[props.idx].social_index : layer_temp;

    const heading: string = HeadingText(props.layer, props.layer2, props.numLayers, props.citiesArray);

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{heading}</DialogTitle>
                    <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {layer_text}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default function ExplainButton (props: ExplainButtonProps) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Stack alignItems="center">
            <Button variant="outlined" onClick={handleClickOpen}>
                Explain Layer
            </Button>
            <ExplainLayerDialog
                open={open}
                onClose={handleClose}
                idx = {props.idx}
                layer = {props.layer}
                layer2 = {props.layer2}
                numLayers = {props.numLayers}
                meanVals = {props.meanVals}
                citiesArray = {props.citiesArray}
            />
        </Stack>
    )
}
