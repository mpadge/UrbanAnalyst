
import { useState } from 'react';
import styles from '@/styles/controls.module.css';

interface RangeSliderProps {
    rangeMin: number,
    rangeMax: number,
    step: number,
    handleRangeMinChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleRangeMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => void

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
                onChange={props.handleRangeMinChange}
                min={0}
                max={1}
                step={props.step}
                value={props.rangeMin}
                style={getBackgroundSize(props.rangeMin)}
            ></input>
            <input
                id="max"
                className={`${styles.RangeSlider} ${styles.max}`}
                type="range"
                onChange={props.handleRangeMaxChange}
                min={0}
                max={1}
                step={props.step}
                value={props.rangeMax}
                style={getBackgroundSize(props.rangeMax)}
            ></input>
        </div>
    )
}
