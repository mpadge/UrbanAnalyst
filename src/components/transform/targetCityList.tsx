import { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { CityDataProps } from "@/data/interfaces";
import useWindowSize from "@/components/windowSize";

interface CityListProps {
    idx: number,
    idx2: number,
    citiesArray: CityDataProps[],
    handleIdx2Change: (Idx2: number) => void,
}

export default function TargetCityList(props: CityListProps): JSX.Element {

    const options = props.citiesArray.map((city, index) => ({
        value: String(index),
        label: city.nameFormatted
    }));

    // findMatchingOption returns the *index* of the option, but mui requires values to be strings.
    const findMatchingOption = useCallback(() => {
        var op = "0";
        const idxString = String(props.idx2);
        if (options && options.length > 0) {
            const matchingOption = options.find(option => option.value === idxString)?.value;
            op = matchingOption ?? options[0]?.value ?? 0;
        }
        return op;
    }, [options, props.idx2]);
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

    const handleChange = (event: SelectChangeEvent): void => {
        const val = event.target.value as string;
        if (val) {
            setSelectedOption(val);
            const opInt = parseInt(val);
            props.handleIdx2Change(opInt);
        }
    };

    const width = useWindowSize().width;
    const sizeString = width == null ? "medium" : (width < 700 ? "small" : "medium");

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size={sizeString}>
                <InputLabel id="target-city-input-label">Target City</InputLabel>
                <Select
                    labelId="target-city-select-label"
                    id="target-city-select"
                    value={selectedOption}
                    label="Target City"
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

