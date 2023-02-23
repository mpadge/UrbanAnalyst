
import { useState } from 'react';
import styles from '@/styles/Home.module.css'

export default function OpacitySlider (props: OpacitySliderProps) {

    return (
    <section className="slider">
    <input
        className="opacitySlider"
        type="range"
        onChange={(event) => props.handleAlphaChange(event.target.value)}
        min={0}
        max={1}
        step={0.1}
        value={props.alpha}
    ></input>
    </section>
    )
}
