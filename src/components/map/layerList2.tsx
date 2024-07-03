
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import Select from 'react-select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// import { LayerListProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

interface LayerListProps {
    title: string,
    layer1: string,
    layer2: string,
    handleLayerChange: (layer: string) => void,
    cityLayers: string[],
}


export default function LayerList2(props: LayerListProps) {

    const options = useMemo (() => {
        const allOptions = [
            { value: "social_index", label: "Social" },
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
            { value: "value", label: "Housing Value" },
            { value: "rent", label: "Housing Rent" },
        ];

        if (!props.cityLayers || props.cityLayers.length === 0) {
            return allOptions;
        }

        const filteredOptions = allOptions
            .filter(option => props.cityLayers.includes(option.value))
            .filter(option => option.value !== props.layer1);
        return filteredOptions.length > 0 ? filteredOptions : allOptions;
    }, [props.cityLayers, props.layer1]);

    const [isSearchable, setIsSearchable] = useState(true);

    const findMatchingOption = useCallback(() => {
        var op = "social_index";
        if (options && options.length > 0) {
            const matchingOption = options.find(option => option.value === props.layer2)?.value;
            op = matchingOption ?? options[0]?.value ?? "social_index";
        }
        return op;
    }, [options, props.layer2]);

    const [selectedOption, setSelectedOption] = useState(findMatchingOption());
    useEffect(() => {
        const this_option = findMatchingOption();
        if (this_option) {
            setSelectedOption(this_option);
        } else {
            setSelectedOption(options[0].value);
        }
    }, [props.layer2, findMatchingOption, options]);

    const handleChange = (event: SelectChangeEvent) => {
        props.handleLayerChange(event.target.value as string);
        setSelectedOption(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="layer2-select-label">{props.title}</InputLabel>
                <Select
                    labelId="layer2-select-label"
                    id="layer2-select"
                    value={selectedOption}
                    label={props.title}
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

