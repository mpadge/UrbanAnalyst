
import { useState } from 'react';
import styles from '@/styles/controls.module.css';
import { LayersButtonProps } from "@/data/interfaces";

export default function LayersButton (props: LayersButtonProps) {

    var buttonStyleTemp: any = styles.explainbuttonOff;
    var buttonTextTemp: string = "Extra Layers";
    if (props.showLayersDialog) {
        buttonStyleTemp = styles.explainbuttonOn;
        buttonTextTemp = "Calculating ...";
    }
    const buttonStyle = buttonStyleTemp;
    const buttonText = buttonTextTemp;

    return (
    <section className="button">
    <button
        className={buttonStyle}
        type="button"
        onClick={() => props.handleLayersDialogVisibility(props.showLayersDialog)}
    >{buttonText}</button>
    </section>
    )
}
