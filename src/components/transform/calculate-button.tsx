
import { useState } from 'react';
import styles from '@/styles/controls.module.css';
import { CalculateButtonProps } from "@/data/interfaces";

export default function CalculateButton (props: CalculateButtonProps) {

    var buttonStyleTemp: any = styles.explainbuttonOff;
    var buttonTextTemp: string = "Calculate";
    if (props.calculate) {
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
        onClick={() => props.setCalculate(!props.calculate)}
    >{buttonText}</button>
    </section>
    )
}
