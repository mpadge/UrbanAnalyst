
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Select from 'react-select';

import styles from '@/styles/controls.module.css';

interface SortOrderListProps {
    sortOpt: string,
    handleSortChange: (sortOpt: string) => void
}

export default function SortOrderList(props: SortOrderListProps) {

    const options = useMemo (() => [
        { value: 'increasing', label: 'increasing' },
        { value: 'decreasing', label: 'decreasing' },
        { value: 'alphabetic', label: 'alphabetic' },
    ], []);

    const [isSearchable, setIsSearchable] = useState(true);
    const [selected, setSelected] = useState(null);

    const handleChange = (selectedOption: any) => {
        setSelected(selectedOption);
        props.handleSortChange(selectedOption.value);
    };

    const findMatchingOption = useCallback(() => {
        return options.find(option => option.value === props.sortOpt);
    }, [options, props.sortOpt]);

    const [matchingOption, setMatchingOption] = useState(findMatchingOption());
    useEffect(() => {
        const this_option = findMatchingOption();
        setMatchingOption(this_option);
    }, [props.sortOpt, findMatchingOption]);

    return (
        <section className={styles.listSelect}>
            <Select
                options={options}
                defaultValue={matchingOption}
                value={matchingOption}
                name="SortSelector"
                //isClearable={isClearable}
                isSearchable={isSearchable}
                onChange = {handleChange}
            />
        </section>
    );
}

