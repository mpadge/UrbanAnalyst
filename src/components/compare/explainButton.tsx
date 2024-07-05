
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

    var buttonStyleTemp: any = styles.explainbuttonOff;
    var buttonTextTemp: string = "Explain Layer";
    if (props.explain) {
        buttonStyleTemp = styles.explainbuttonOn;
        buttonTextTemp = "Close Text";
    }
    const buttonStyle = buttonStyleTemp;
    const buttonText = buttonTextTemp;

    return (
        <section className="button">
            <button
                className={buttonStyle}
                type="button"
                onClick={() => props.handleExplainChange(props.explain)}
            >{buttonText}</button>
        </section>
    )
}
