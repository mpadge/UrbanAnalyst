
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import useWindowSize from "@/components/windowSize";
import styles from '@/styles/controls.module.css';

interface OutputLayerProps {
    outputLayer: string,
    handleOutputLayerChange: (outputLayer: string) => void,
}

export default function OutputLayers(props: OutputLayerProps) {

    const options = [
        { value: "original", label: "Original" },
        { value: "transformed", label: "Transformed" },
        { value: "absolute", label: "Absolute" },
        { value: "relative", label: "Relative" }
    ];

    const searchable = false;
    const [selected, setSelected] = useState<string>("original");

    const handleChange = (event: SelectChangeEvent) => {
        const val = event.target.value as string;
        if (val) {
            setSelected(val);
            props.handleOutputLayerChange(val);
        }
    };

    const width = useWindowSize().width;
    const sizeString = width == null ? "medium" : (width < 700 ? "small" : "medium");

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size={sizeString}>
                <InputLabel id="outputLayer-input-label">Output Layer</InputLabel>
                <Select
                    labelId="outputLayer-select-label"
                    id="outputLayer-select"
                    value={selected}
                    label="OutputLayer"
                    onChange={handleChange}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

