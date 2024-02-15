
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Select from 'react-select';

import { LayerListProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

export default function LayerList(props: LayerListProps) {

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

    const [isSearchable, setIsSearchable] = useState(true);
    const [selected, setSelected] = useState(null);

    const handleChange = (selectedOption: any) => {
        setSelected(selectedOption);
        props.handleLayerChange(selectedOption.value);
    };

    const findMatchingOption = useCallback(() => {
        return options.find(option => option.value === props.layer);
    }, [options, props.layer]);

    const [matchingOption, setMatchingOption] = useState(findMatchingOption());
    useEffect(() => {
        const this_option = findMatchingOption();
        setMatchingOption(this_option);
    }, [props.layer, findMatchingOption]);

    return (
        <section className={styles.listSelect}>
        <Select
            options={options}
            defaultValue={matchingOption}
            name="LayerSelector"
            //isClearable={isClearable}
            isSearchable={isSearchable}
            onChange = {handleChange}
        />
        </section>
    );
}

