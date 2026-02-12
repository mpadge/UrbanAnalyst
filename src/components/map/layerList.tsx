
import { useCallback, useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import useWindowSize from "@/components/windowSize";
import { DataRangeKeys } from '@/data/interfaces';

interface LayerListProps {
    title: string,
    layer: DataRangeKeys,
    handleLayerChange: (layer: DataRangeKeys) => void,
    cityLayers: string[],
}


export default function LayerList(props: LayerListProps): JSX.Element {

    const options = useMemo (() => {
        const allOptions = [
            { value: "social_index", label: "Social" },
            { value: "times_rel", label: "Rel. Transport" },
            { value: "times_abs", label: "Abs. Transport" },
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

        const filteredOptions = allOptions.filter(option => props.cityLayers.includes(option.value));
        return filteredOptions.length > 0 ? filteredOptions : allOptions;
    }, [props.cityLayers]);

    // findMatchingOption returns the *value* of the option:
    const findMatchingOption = useCallback(() => {
        var op = "social_index";
        if (options && options.length > 0) {
            const matchingOption = options.find(option => option.value === props.layer)?.value;
            op = matchingOption ?? options[0]?.value ?? "social_index";
        }
        return op;
    }, [options, props.layer]);

    const [selectedOption, setSelectedOption] = useState(findMatchingOption());
    useEffect(() => {
        const this_option = findMatchingOption();
        if (this_option) {
            setSelectedOption(this_option);
        } else {
            setSelectedOption(options[0].value);
        }
    }, [props.layer, findMatchingOption, options]);

    const handleChange = (event: SelectChangeEvent): void => {
        props.handleLayerChange(event.target.value as DataRangeKeys);
        setSelectedOption(event.target.value as DataRangeKeys);
    };

    const width = useWindowSize().width;
    const sizeString = width == null ? "medium" : (width < 700 ? "small" : "medium");

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size={sizeString}>
                <InputLabel id="layer1-input-label">{props.title}</InputLabel>
                <Select
                    labelId="layer1-select-label"
                    id="layer1-select"
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

