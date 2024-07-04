import { useState } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import styles from '@/styles/controls.module.css';
import { ExplainButtonProps } from "@/data/interfaces";

export default function ExplainButton (props: ExplainButtonProps) {

    var buttonStyleTemp: any = styles.explainbuttonOff;
    var buttonTextTemp: string = "Explain Layer";
    if (props.explain) {
        buttonStyleTemp = styles.explainbuttonOn;
        buttonTextTemp = "Close Text";
    }
    const buttonStyle = buttonStyleTemp;
    const buttonText = buttonTextTemp;

    return (
        <Stack alignItems="center">
            <Button
                variant="outlined"
                onClick={() => props.handleExplainChange(props.explain)}
            >{buttonText}</Button>
        </Stack>
    )
}
