
import { useState } from 'react';
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
    <section className="button">
    <button
        className={buttonStyle}
        type="button"
        onClick={() => props.handleExplainChange(props.explain)}
    >{buttonText}</button>
    </section>
    )
}
