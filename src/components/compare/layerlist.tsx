
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import useWindowSize from "@/components/windowSize";
import { DataRangeKeys } from '@/data/interfaces';

interface LayerListProps { // different from same defined in data/interfaces
    title: string,
    layer: DataRangeKeys,
    singleLayer: boolean,
    handleLayerChange: (layer: DataRangeKeys) => void
}

export default function LayerList(props: LayerListProps): JSX.Element {

    const options = useMemo (() => [
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
        { value: "rent", label: "Housing Rent" },
        { value: "value", label: "Housing Value" },
    ], []);

    // Recuce options by removing social layer for single-layer only,
    // but leave for paired layer view.
    const reducedOptions = useMemo(() => {
        return props.singleLayer ?
            options.filter((option) => option.value !== "social_index") :
            options;
    }, [options, props.singleLayer]);

    const findMatchingOption = useCallback(() => {
        var op = "transport";
        if (reducedOptions && reducedOptions.length > 0) {
            const matchingOption = reducedOptions.find(option => option.value === props.layer)?.value;
            op = matchingOption ?? reducedOptions[4]?.value ?? "transport";
        }
        return op;
    }, [reducedOptions, props.layer]);

    const [selectedOption, setSelectedOption] = useState(findMatchingOption());

    useEffect(() => {
        const this_option = findMatchingOption();
        if (this_option) {
            setSelectedOption(this_option);
        } else {
            setSelectedOption("transport");
        }
    }, [props.layer, findMatchingOption, reducedOptions]);

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
                    labelId="compare-layer1-select-label"
                    id="compare-layer1-select"
                    value={selectedOption}
                    label={props.title}
                    onChange={handleChange}
                >
                    {reducedOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
