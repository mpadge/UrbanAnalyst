
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Select from 'react-select';

import { LayersListProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

interface OptionType {
    value: string;
    label: string;
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

    const [isSearchable, setIsSearchable] = useState(true);
    const [selected, setSelected] = useState(null);

    const handleChange = (selectedOption: any) => {
        setSelected(selectedOption);
        props.handleLayersChange(selectedOption.value);
    };

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleOptionChange = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions.map((option: OptionType) => option.value));
        props.handleLayersChange(selectedOptions.map((option: OptionType) => option.value));
    };

    return (
        <section className={styles.listSelect}>
            <Select
                options={reducedOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                name="LayersSelector"
                formatOptionLabel={(option, { context }) => (
                    <div>
                        <input type="checkbox" checked={context === 'menu'} readOnly />
                        {option.label}
                    </div>
                )}
                onChange={handleOptionChange}
            />
        </section>
    );
}
