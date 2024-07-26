
import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styles from '@/styles/sliders.module.css';

import useWindowSize from "@/components/windowSize";

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

    const size = useWindowSize().width < 700 ? "small" : "medium";

    return (
        <section className={styles.sliders}>
            <div>
                <Box className={styles.sliderBox}>
                    <Slider
                        size={size}
                        min={0}
                        max={1}
                        value={props.alpha}
                        step={0.1}
                        style={getBackgroundSize()}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        onChange={(event) => props.handleAlphaChange(Number((event.target as HTMLInputElement).value))}
                    />
                </Box>
            </div>
        </section>
    )
}
