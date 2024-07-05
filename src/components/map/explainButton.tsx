import { useState } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import styles from '@/styles/controls.module.css';
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

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
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
