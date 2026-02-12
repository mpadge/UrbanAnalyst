import React, { useEffect, useMemo, useRef, useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import ResetButton from "@/components/transform/resetButton";

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

/**
 * Function to select extra layers to be included in transformation
 * calculation.
 */
export default function LayersList(props: LayersListProps): JSX.Element {

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

    // `checked` holds Object with named entries and boolean flag for each
    // checked item. This is used to control the `checked` state in each
    // `FormControlLabel`.
    type AccType = { [key: string]: boolean };
    const [checked, setChecked] = useState<AccType>({});
    const handleCheckboxChange = (event: any, value: any): void => {
        const isChecked = event.target.checked;
        setChecked(prevChecked => ({
            ...prevChecked,
            [value]: isChecked,
        }));
    };

    // Pre-select default varnames passed from 'control.tsx':
    const { varnames } = props;
    const initialSetFromProps = useRef(false);
    useEffect(() => {
        if (!initialSetFromProps.current) {
            setChecked((prevCheckedState) => {
                return reducedOptions.reduce((acc, option) => {
                    const isChecked = varnames.includes(option.value);
                    acc[option.value] = isChecked;
                    return acc;
                }, {...prevCheckedState});
            });
            initialSetFromProps.current = true;
        }
    }, [varnames, reducedOptions, setChecked]);

    // Effect to update props.varnames in response to changed in 'checked'
    // values.
    const { setVarnames } = props;
    useEffect(() => {
        const varnames = reducedOptions
            .filter(option => checked[option.value] === true)
            .map(option => option.value);
        setVarnames(varnames);
    }, [checked, setVarnames, reducedOptions]);

    const handleReset = (): void => {
        const { idx, idx2, layer, citiesArray } = props;
        const varnames = DefaultExtraLayers({ idx, idx2, layer, citiesArray });
        props.setVarnames(varnames);

        const initialState = reducedOptions.reduce<AccType>((acc, curr) => {
            acc[curr.value] = varnames.includes(curr.value);
            return acc;
        }, {} as AccType);
        setChecked(initialState);
    };

    return (
        <>
            <div>
                <DialogTitle>Extra Layers</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <FormGroup>
                                {reducedOptions.map((item: OptionType) => (
                                    <FormControlLabel
                                        key={item.value}
                                        control={<Checkbox />}
                                        label={item.label}
                                        checked={!!checked[item.value]}
                                        onChange={(event) => handleCheckboxChange(event, item.value)}
                                    />
                                ))}
                            </FormGroup>
                        </FormControl>
                    </Box>
                </DialogContent>

                <ResetButton handleReset={handleReset} />

                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={props.handleClose}>Ok</Button>
                </DialogActions>
            </div>
        </>
    );
}
