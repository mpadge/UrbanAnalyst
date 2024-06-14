
import { useState } from 'react';
import styles from '@/styles/controls.module.css';

interface RangeSliderProps {
    rangeMin: number, // Minimal allowed value
    rangeMax: number, // Maximal allowed value
    sliderMin: number,
    sliderMax: number,
    step: number,
    handleSliderMinChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSliderMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => void

}

export default function RangeSlider(props: RangeSliderProps) {

    const getBackgroundSize = (value: number) => {
        return {
            backgroundSize: `${(value * 100)}% 100%`,
        };
    };

    return (
        <div className="sliders">
            <input
                id="min"
                className={`${styles.RangeSlider} ${styles.min}`}
                type="range"
                onChange={props.handleSliderMinChange}
                min={props.rangeMin}
                max={props.rangeMax}
                step={props.step}
                value={props.sliderMin}
                style={getBackgroundSize(props.sliderMin)}
            ></input>
            <input
                id="max"
                className={`${styles.RangeSlider} ${styles.max}`}
                type="range"
                onChange={props.handleSliderMaxChange}
                min={props.rangeMin}
                max={props.rangeMax}
                step={props.step}
                value={props.sliderMax}
                style={getBackgroundSize(props.sliderMax)}
            ></input>
        </div>
    )
}
