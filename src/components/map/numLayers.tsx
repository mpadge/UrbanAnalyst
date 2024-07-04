import React, { useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { NumLayersProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

export default function SelectNumLayers(props: NumLayersProps) {

    const [numLayers, setNumLayers] = useState<string | null>("Single");

    const handleNumLayersClick = (
        event: React.MouseEvent<HTMLElement>,
        newNumLayers: string | null,
    ) => {
        setNumLayers(newNumLayers);
        if (newNumLayers) {
            props.handleNumLayersChange(newNumLayers);
        }
    };

    return (
        <ToggleButtonGroup
            value={numLayers}
            exclusive
            onChange={handleNumLayersClick}
            aria-label="text alignment"
        >
            <ToggleButton value="Single">Single</ToggleButton>
            <ToggleButton value="Paired">Paired</ToggleButton>
        </ToggleButtonGroup>
    )
}
