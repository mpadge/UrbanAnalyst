
import { ChangeEvent, SyntheticEvent, SetStateAction, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import useWindowSize from "@/components/windowSize";
import styles from '@/styles/sliders.module.css';

interface RangeSliderProps {
    rangeMin: number, // Minimal allowed value
    rangeMax: number, // Maximal allowed value
    sliderValues: number[],
    step: number,
    handleSliderValuesChange: (
        event: Event,
        value: number | number [],
        activeThumb: number
    ) => void,
}

export default function RangeSlider(props: RangeSliderProps) {

    const size = useWindowSize().width < 700 ? "small" : "medium";

    return (
        <div className={styles.sliders}>
            <div>
                <Box className={styles.sliderBox}>
                    <Slider
                        size={size}
                        min={props.rangeMin}
                        max={props.rangeMax}
                        value={props.sliderValues}
                        step={props.step}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        onChange={props.handleSliderValuesChange}
                        disableSwap
                    />
                </Box>
            </div>
        </div>
    )
}
