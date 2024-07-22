import React, { useEffect, useMemo, useRef, useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';

import ResetButton from "@/components/transform/resetButton";
import styles from "@/styles/controls.module.css";

import { DefaultExtraLayers } from "@/components/transform/control";
import { CityDataProps } from "@/data/interfaces";

interface OptionType {
    value: string;
    label: string;
}

/**
 * - `idx`: Only needed to pass through to `DefaultExtraLayers` function (defined
 *   in `control.tsx`), to enable resetting to default selection.
 * - `idx2`: Same.
 * - `citiesArray`: Same.
 * - `layer`: Used to filter list of extra layers to exclude selected one.
 * - `varnames`: List of currently selected extra layers.
 * - `setVarnames`: React state setter for `varnames`.
 */
interface LayersListProps {
    idx: number;
    idx2: number;
    citiesArray: CityDataProps[];
    layer: string;
    varnames: string[];
    setVarnames: (varnames: string[]) => void;
    handleClose: () => void;
}

const CheckboxList = ({ items, varnames, setSelectedOptions }) => {
    // get  initial items with entries in `varnames`:
    const initialState = items.reduce((acc, curr) => {
        acc[curr.value] = varnames.includes(curr.value);
        return acc;
    }, {});

    const [checkedState, setCheckedState] = useState(initialState);

    const handleCheckboxChange = (event, value) => {
        const isChecked = event.target.checked;
        setCheckedState({
            ...checkedState,
            [value]: isChecked,
        });

        // Update the selected options array
        const updatedOptions = Object.keys(checkedState)
        .filter(key => checkedState[key])
        .map(key => key);
        setSelectedOptions(updatedOptions);
    };


    useEffect(() => {
        const initialSelectedOptions = items.filter(item => item.checked).map(item => item.value);
        setSelectedOptions(initialSelectedOptions);
    }, [items, setSelectedOptions]);

    return (
        <div>
            <FormGroup>
                {items.map((item) => (
                    <FormControlLabel
                        control={<Checkbox />}
                        label={item.label}
                        checked={!!checkedState[item.value]}
                        onChange={(event) => handleCheckboxChange(event, item.value)}
                    />
                ))}
            </FormGroup>
        </div>
    );
};


/**
 * Function to select extra layers to be included in transformation
 * calculation.
 */
export default function LayersList2(props: LayersListProps) {
    const theme = useTheme();

    const options = useMemo(
        () => [
            { value: "social_index", label: "Social", checked: false },
            { value: "times_rel", label: "Transport Rel.", checked: false },
            { value: "times_abs", label: "Transport Abs.", checked: false },
            { value: "transfers", label: "Num. Transfers", checked: false },
            { value: "intervals", label: "Transp. Interval", checked: false },
            { value: "transport", label: "Transport Combined", checked: false },
            { value: "popdens", label: "Population", checked: false },
            { value: "school_dist", label: "School Dist.", checked: false },
            { value: "bike_index", label: "Bicycle Index", checked: false },
            { value: "natural", label: "Nature Index", checked: false },
            { value: "parking", label: "Parking", checked: false },
        ],
        [],
    );

    const reducedOptions = useMemo(() => {
        return options.filter((option) => option.value !== props.layer);
    }, [options, props.layer]);

    const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

    const [selectedOptions, setSelectedOptions] = useState<string[]>(
        props.varnames,
    );

    // Pre-select default varnames passed from 'control.tsx':
    const selectVarnames = useEffect(() => {
        setSelectedOptions(props.varnames);
        setChecked((prevCheckedState) => {
            return reducedOptions.reduce((acc, option) => {
                const isChecked = props.varnames.includes(option.value);
                acc[option.value] = isChecked;
                return acc;
            }, {...prevCheckedState});
        });
    }, [props.varnames, reducedOptions, setChecked]);

    const handleReset = () => {
        const { idx, idx2, layer, citiesArray } = props;
        const varnames = DefaultExtraLayers({ idx, idx2, layer, citiesArray });
        props.setVarnames(varnames);
        setSelectedOptions(varnames);
    };

    return (
        <>
            <div>
                {reducedOptions.map((option) => (
                    <div key={option.value}>
                        <label>
                            <input
                                type="checkbox"
                                value={option.value}
                                checked={selectedOptions.includes(option.value)}
                                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                            />
                            {option.label}
                        </label>
                    </div>
                ))}
                <ResetButton handleReset={handleReset} />

                <DialogTitle>Extra Layers</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <CheckboxList
                                items={reducedOptions}
                                varnames={props.varnames}
                                setSelectedOptions={setSelectedOptions}
                            />
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={props.handleClose}>Ok</Button>
                </DialogActions>
            </div>
        </>
    );
}
