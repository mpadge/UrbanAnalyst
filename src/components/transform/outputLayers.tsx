
import React, { useState } from 'react';
import Select from 'react-select';

import styles from '@/styles/controls.module.css';

interface OutputLayerProps {
    outputLayer: string,
    handleOutputLayerChange: (outputLayer: string) => void,
}

export default function OutputLayers(props: OutputLayerProps) {

    const options = [
        { value: "original", label: "Original" },
        { value: "transformed", label: "Transformed" },
        { value: "absolute", label: "Absolute" },
        { value: "relative", label: "Relative" }
    ];

    const searchable = false;
    const [selected, setSelected] = useState(null);

    const handleChange = (selectedOption: any) => {
        setSelected(selectedOption);
        props.handleOutputLayerChange(selectedOption.value);
    };

  return (
    <section className={styles.listSelect}>
        <Select
            options={options}
            defaultValue={options[3]}
            name="OutputLayersySelector"
            isSearchable={searchable}
            onChange = {handleChange}
        />
    </section>
  );
}

