import React, { useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { NumLayersProps } from "@/data/interfaces";

export default function SelectNumLayers(props: NumLayersProps): JSX.Element {

    const [numLayers, setNumLayers] = useState<("Single" | "Paired") | null>("Single");

    const handleNumLayersClick = (
        event: React.MouseEvent<HTMLElement>,
        newNumLayers: ("Single" | "Paired") | null,
    ): void => {
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
            size="small"
            sx={{ maxHeight: 24 }}
        >
            <ToggleButton size="small" value="Single">Single</ToggleButton>
            <ToggleButton size="small" value="Paired">Paired</ToggleButton>
        </ToggleButtonGroup>
    )
}
