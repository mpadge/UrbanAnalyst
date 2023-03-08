
import React, { useState } from 'react';
import Select from 'react-select';

import { LayerListProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

export default function LayerList(props: LayerListProps) {

    const options = [
        { value: 'sd_uta2trans_rel', label: 'UTA Rel' },
        { value: 'sd_uta2trans_abs', label: 'UTA Abs' },
        { value: 'transport_abs', label: 'Transport Abs' },
        { value: 'transport_rel', label: 'Transport Rel' },
        { value: 'uta_abs', label: 'Combined Abs' },
        { value: 'uta_rel', label: 'Combined Rel' }
    ]

    const [isSearchable, setIsSearchable] = useState(true);
    const [selected, setSelected] = useState(null);

    const handleChange = (selectedOption: any) => {
        setSelected(selectedOption);
        props.handleLayerChange(selectedOption.value);
    };

  return (
    <section className={styles.listSelect}>
        <Select
            options={options}
            defaultValue={options[0]}
            name="LayerSelector"
            //isClearable={isClearable}
            isSearchable={isSearchable}
            onChange = {handleChange}
        />
    </section>
  );
}

