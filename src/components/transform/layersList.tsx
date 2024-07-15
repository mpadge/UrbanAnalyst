
import React, { useEffect, useMemo, useState } from 'react';

import ResetButton from '@/components/transform/resetButton';
import styles from '@/styles/controls.module.css';

interface OptionType {
    value: string;
    label: string;
}

interface LayersListProps {
    layer: string,
    varnames: string[],
    setVarnames: (varnames: string[]) => void
}


export default function LayersList(props: LayersListProps) {

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
        { value: "parking", label: "Parking" }
    ], []);

    const reducedOptions = useMemo(() => {
        return options.filter(option => option.value !== props.layer);
    }, [options, props.layer, ]);

    const [selectedOptions, setSelectedOptions] = useState<string[]>(props.varnames);

    // Pre-select default varnames passed from 'control.tsx':
    const selectVarnames = useEffect(() => {
        setSelectedOptions(props.varnames);
    }, [props.varnames, setSelectedOptions]);

    const handleOptionChange = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions.map((option: OptionType) => option.value));
        props.setVarnames(selectedOptions.map((option: OptionType) => option.value));
    };

    const handleCheckboxChange = (option: OptionType, isChecked: boolean) => {
        setSelectedOptions((currentSelectedOptions) => {
            let newSelectedOptions;
            if (isChecked) {
                newSelectedOptions = [...currentSelectedOptions, option.value];
            } else {
                newSelectedOptions = currentSelectedOptions.filter((selectedValue) => selectedValue !== option.value);
            }
            props.setVarnames(newSelectedOptions);
            return newSelectedOptions;
        });
    };

    const handleReset = () => {
        console.log("------RE-SETTING VARNAMES TO ", props.varnames);
        setSelectedOptions(props.varnames);
    };

    return (
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
            <ResetButton
                handleReset = {handleReset}
            />
        </div>
    );
}
