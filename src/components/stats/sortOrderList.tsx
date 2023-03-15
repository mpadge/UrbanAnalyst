
import React, { useState } from 'react';
import Select from 'react-select';

import { SortOrderListProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

export default function SortOrderList(props: SortOrderListProps) {

    const options = [
        { value: 'increasing', label: 'increasing' },
        { value: 'decreasing', label: 'decreasing' },
        { value: 'alphabetic', label: 'alphabetic' },
    ]

    const [isSearchable, setIsSearchable] = useState(true);
    const [selected, setSelected] = useState(null);

    const handleChange = (selectedOption: any) => {
        setSelected(selectedOption);
        props.handleSortChange(selectedOption.value);
    };

  return (
    <section className={styles.listSelect}>
        <Select
            options={options}
            defaultValue={options[0]}
            name="SortSelector"
            //isClearable={isClearable}
            isSearchable={isSearchable}
            onChange = {handleChange}
        />
    </section>
  );
}

