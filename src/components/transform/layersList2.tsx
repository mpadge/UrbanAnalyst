import React, { useEffect, useMemo, useState } from "react";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

/**
 * Function to select extra layers to be included in transformation
 * calculation.
 */
export default function LayersList2(props: LayersListProps) {
    const theme = useTheme();

  const options = useMemo(
    () => [
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
    ],
    [],
  );

  const reducedOptions = useMemo(() => {
    return options.filter((option) => option.value !== props.layer);
  }, [options, props.layer]);

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    props.varnames,
  );

  // Pre-select default varnames passed from 'control.tsx':
  const selectVarnames = useEffect(() => {
    setSelectedOptions(props.varnames);
  }, [props.varnames, setSelectedOptions]);

  const handleOptionChange = (selectedOptions: any) => {
    setSelectedOptions(
      selectedOptions.map((option: OptionType) => option.value),
    );
    props.setVarnames(
      selectedOptions.map((option: OptionType) => option.value),
    );
  };

  const handleCheckboxChange = (option: OptionType, isChecked: boolean) => {
    setSelectedOptions((currentSelectedOptions) => {
      let newSelectedOptions;
      if (isChecked) {
        newSelectedOptions = [...currentSelectedOptions, option.value];
      } else {
        newSelectedOptions = currentSelectedOptions.filter(
          (selectedValue) => selectedValue !== option.value,
        );
      }
      props.setVarnames(newSelectedOptions);
      return newSelectedOptions;
    });
  };

    const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
        const {
            target: { value },
        } = event;
        setSelectedOptions(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };



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
                        <InputLabel htmlFor="demo-dialog-native">Extra Layers</InputLabel>
                            <Select
                                labelId="extra-layers-select-label"
                                id="extra-layers-select"
                                multiple
                                value={selectedOptions}
                                onChange={handleChange}
                                input={<OutlinedInput label="Extra Layers" id="select-multiple-layers" />}
                                renderValue={(selectedOptions) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selectedOptions.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                <option aria-label="None" value="" />
                                {reducedOptions.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </Select>
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
