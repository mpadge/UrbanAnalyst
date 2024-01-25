
import { useState } from 'react';
import styles from '@/styles/controls.module.css';
import { CalculateButtonProps } from "@/data/interfaces";

export default function CalculateButton (props: CalculateButtonProps) {

    var buttonStyle: any = styles.explainbuttonOff;
    var buttonText: string = "Calculate";

    return (
    <section className="button">
    <button
        className={buttonStyle}
        type="button"
        onClick={() => props.handleCalculateChange(props.calculate)}
    >{buttonText}</button>
    </section>
    )
}
