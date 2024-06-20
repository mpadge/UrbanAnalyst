
import { ChangeEvent, SyntheticEvent, SetStateAction, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import styles from '@/styles/rangeSliders.module.css';

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

    return (
        <div className={styles.sliders}>
            <div>
                <Box sx={{ width: 150 }}>
                    <Slider
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
