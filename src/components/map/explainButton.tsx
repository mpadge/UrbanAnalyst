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

export interface MapsExplainProps {
    open: boolean,
    onClose: () => void,
    idx: number,
    layer: string,
    layer2: string,
    numLayers: string,
    explain: boolean,
    meanVals: boolean,
    citiesArray: CityDataProps[]
}

function ExplainLayerDialog(props: MapsExplainProps) {
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

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
                    <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {layer_text}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default function ExplainButton (props: ExplainButtonProps) {

    var buttonStyleTemp: any = styles.explainbuttonOff;
    var buttonTextTemp: string = "Explain Layer";
    if (props.explain) {
        buttonStyleTemp = styles.explainbuttonOn;
        buttonTextTemp = "Close Text";
    }
    const buttonStyle = buttonStyleTemp;
    const buttonText = buttonTextTemp;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Stack alignItems="center">
            <Button
                variant="outlined"
                onClick={() => props.handleExplainChange(props.explain)}
            >{buttonText}</Button>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            <ExplainLayerDialog
                open={open}
                onClose={handleClose}
                idx = {props.idx}
                layer = {props.layer}
                layer2 = {props.layer2}
                numLayers = {props.numLayers}
                explain = {props.explain}
                meanVals = {props.meanVals}
                citiesArray = {props.citiesArray}
            />
        </Stack>
    )
}
