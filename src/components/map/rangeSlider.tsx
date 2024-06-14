
import { useState } from 'react';
import styles from '@/styles/rangeSliders.module.css';

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

    const minSliderPos = ((props.sliderMin - props.rangeMin) /
        (props.rangeMax - props.rangeMin)) * 100;
    const maxSliderPos = ((props.sliderMax - props.rangeMin) /
        (props.rangeMax - props.rangeMin)) * 100;

    return (
        <div className={styles.sliders}>
            <div className={styles.sliderInputs}>
                <input
                    id="min"
                    /// className={styles.sliderInput}
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
                    /// className={styles.sliderInput}
                    type="range"
                    onChange={props.handleSliderMaxChange}
                    min={props.rangeMin}
                    max={props.rangeMax}
                    step={props.step}
                    value={props.sliderMax}
                    style={getBackgroundSize(props.sliderMax)}
                ></input>
            </div>

            <div className="sliderControls">
                <div className="sliderControl" style={{ left: `${minSliderPos}%` }} />
                <div className="sliderRail">
                    <div
                        className="sliderInnerRail"
                        style={{ left: `${minSliderPos}%`, right: `${100 - maxSliderPos}%` }}
                    />
                </div>
                <div className="sliderControl" style={{ left: `${maxSliderPos}%` }} />
            </div>
        </div>
    )
}
