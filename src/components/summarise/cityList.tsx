
import React, { useCallback, useEffect, useState } from 'react';
// import Select from 'react-select';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { ViewState, CityDataProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';
import Content from '@/components/summarise/citySummaryData';

interface CityListProps {
    idx: number,
    handleIdxChange: (pIdx: number) => void,
}

export default function CityList(props: CityListProps) {

    const contentArray = Content();
    const options = contentArray.map((city, index) => ({
        value: city.name as string,
        label: city.nameFormatted as string,
        index: index as number
    }));

    // findMatchingOption returns the *index* of the option, but mui requires values to be strings.
    const findMatchingOption = useCallback(() => {
        var op = "0";
        if (options && options.length > 0) {
            const matchingOption = options.find(option => option.index === props.idx)?.value;
            op = matchingOption ?? options[0]?.value ?? 0;
        }
        return op;
    }, [options, props.idx]);
    const [selectedOption, setSelectedOption] = useState(findMatchingOption());

    // This is necessary to ensure localStorage values are correctly set on initial load:
    useEffect(() => {
        const this_option = findMatchingOption();
        if (this_option) {
            setSelectedOption(this_option);
        } else {
            setSelectedOption(options[0].value);
        }
    }, [findMatchingOption, options]);

    const handleChange = (event: SelectChangeEvent) => {
        const val = event.target.value as string;
        if (val) {
            setSelectedOption(val);
            console.log("------CHANGED TO ", val)
            const matchingIdx: number = options.find(option => option.value === val)?.index ?? 0;
            props.handleIdxChange(matchingIdx);
        }
    };

    return (
        <>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="city-input-label">City</InputLabel>
                <Select
                    labelId="city-select-label"
                    id="city-select"
                    value={selectedOption}
                    label="City"
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
        </>
    );
}

