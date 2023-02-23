
import {useState} from 'react';
import styles from '@/styles/Home.module.css'

export default function OpacitySlider (props: OpacitySliderProps) {
    return (
    <section className="slider">
    <input
        className="opacitySlider"
        type='range'
        onChange={props.handleAlphaChange}
        min={0}
        max={100}
        step={1}
        value={props.alpha}
    ></input>
    </section>
    )
}
