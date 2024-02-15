
import { useState } from 'react';
import styles from '@/styles/controls.module.css';

interface OpacitySliderProps {
    alpha: number,
    handleAlphaChange: (pAlpha: number) => void
}

export default function OpacitySlider (props: OpacitySliderProps) {

    const getBackgroundSize = () => {
        return {
            backgroundSize: `${(props.alpha * 100)}% 100%`,
        };
    };

    return (
    <section className="slider">
    <input
        className={styles.opacitySlider}
        type="range"
        onChange={(event) => props.handleAlphaChange(Number(event.target.value))}
        min={0}
        max={1}
        step={0.1}
        value={props.alpha}
        style={getBackgroundSize()}
    ></input>
    </section>
    )
}
