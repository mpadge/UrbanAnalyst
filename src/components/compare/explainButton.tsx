
import { useState } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { ExplainButtonProps } from "@/data/interfaces";
import { ExplainLayerDialog } from "@/components/map/explainButton";

export default function ExplainButton(props: ExplainButtonProps): JSX.Element {

    const [open, setOpen] = useState(false);

    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
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
