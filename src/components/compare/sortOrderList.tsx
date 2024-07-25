
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import styles from '@/styles/controls.module.css';

interface SortOrderListProps {
    sortOpt: string,
    handleSortChange: (sortOpt: string) => void
}

export default function SortOrderList(props: SortOrderListProps) {

    const title = "Sort Order";

    const options = useMemo (() => [
        { value: 'increasing', label: 'increasing' },
        { value: 'decreasing', label: 'decreasing' },
        { value: 'alphabetic', label: 'alphabetic' },
    ], []);

    const findMatchingOption = useCallback(() => {
        var op = "increasing";
        if (options && options.length > 0) {
            const matchingOption = options.find(option => option.value === props.sortOpt)?.value;
            op = matchingOption ?? options[0]?.value ?? "increasing";
        }
        return op;
    }, [options, props.sortOpt]);

    const [selectedOption, setSelectedOption] = useState(findMatchingOption());

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedOption(event.target.value as string);
        props.handleSortChange(event.target.value as string);
    };

    useEffect(() => {
        const this_option = findMatchingOption();
        if (this_option) {
            setSelectedOption(this_option);
        } else {
            setSelectedOption(options[0].value);
        }
    }, [props.sortOpt, findMatchingOption, options]);

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="layer1-input-label">{title}</InputLabel>
                <Select
                    labelId="compare-sortorder-select-label"
                    id="compare-sortorder-select"
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

