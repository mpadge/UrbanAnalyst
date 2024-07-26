
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
import { ExplainProps, ExplainLayerDialog } from "@/components/map/explainButton";

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
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                size="small"
            >
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
