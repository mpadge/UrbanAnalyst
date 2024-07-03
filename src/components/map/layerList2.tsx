
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
    layer: string,
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

        return allOptions.filter(option => props.cityLayers.includes(option.value));
    }, [props.cityLayers]);

    const [isSearchable, setIsSearchable] = useState(true);

    const findMatchingOption = useCallback(() => {
        return options.find(option => option.value === props.layer);
    }, [options, props.layer]);

    const [matchingOption, setMatchingOption] = useState(findMatchingOption());
    useEffect(() => {
        const this_option = findMatchingOption();
        setMatchingOption(this_option);
    }, [props.layer, findMatchingOption]);

    const handleChange = (event: SelectChangeEvent) => {
        props.handleLayerChange(event.target.value as string);
        setMatchingOption(event.target.Value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={matchingOption}
                    // label={props.title}
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

