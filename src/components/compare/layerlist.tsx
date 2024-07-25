
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { LayerListProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

export default function LayerList(props: LayerListProps) {

    const title = "Layer";

    const options = useMemo (() => [
        { value: "times_rel", label: "Transport Rel." },
        { value: "times_abs", label: "Transport Abs." },
        { value: "transfers", label: "Num. Transfers" },
        { value: "intervals", label: "Transp. Interval" },
        { value: "transport", label: "Transport Combined" },
        { value: "popdens", label: "Population" },
        { value: "school_dist", label: "School Dist." },
        { value: "bike_index", label: "Bicycle Index" },
        { value: "natural", label: "Nature Index" },
        { value: "parking", label: "Parking" },
        { value: "rent", label: "Housing Rent" },
        { value: "value", label: "Housing Value" },
    ], []);

    const findMatchingOption = useCallback(() => {
        var op = "transport";
        if (options && options.length > 0) {
            const matchingOption = options.find(option => option.value === props.layer)?.value;
            op = matchingOption ?? options[4]?.value ?? "transport";
        }
        return op;
    }, [options, props.layer]);

    const [selectedOption, setSelectedOption] = useState(findMatchingOption());

    useEffect(() => {
        const this_option = findMatchingOption();
        if (this_option) {
            setSelectedOption(this_option);
        } else {
            setSelectedOption(options[4].value);
        }
    }, [props.layer, findMatchingOption, options]);

    const handleChange = (event: SelectChangeEvent) => {
        props.handleLayerChange(event.target.value as string);
        setSelectedOption(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="layer1-input-label">{title}</InputLabel>
                <Select
                    labelId="compare-layer1-select-label"
                    id="compare-layer1-select"
                    value={selectedOption}
                    label={title}
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
