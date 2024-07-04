
import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { ViewState, CityDataProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

interface CityListProps {
    idx: number,
    citiesArray: CityDataProps[],
    viewState: ViewState,
    handleIdxChange: (pIdx: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void
}

export default function CityList(props: CityListProps) {

    const options = props.citiesArray.map((city, index) => ({
        value: String (index),
        label: city.nameFormatted
    }));

    const [isSearchable, setIsSearchable] = useState(true);

    // findMatchingOption returns the *index* of the option:
    const findMatchingOption = useCallback(() => {
        var op = 0;
        if (options && options.length > 0) {
            const matchingOption = options.find(option => option.value === props.idx)?.value;
            op = matchingOption ?? options[0]?.value ?? 0;
        }
        return op;
    }, [options, props.idx]);
    const [selectedOption, setSelectedOption] = useState(findMatchingOption());
    const handleChange = (event: SelectChangeEvent) => {
        const val = event.target.value as string;
        if (val) {
            setSelectedOption(val);
            const opInt = parseInt(val);
            props.handleIdxChange(opInt);
            props.handleViewStateChange({...props.citiesArray[opInt].initialViewState,
                pitch: 0,
                bearing: 0 });
        }
    };

    return (
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
    );
}

