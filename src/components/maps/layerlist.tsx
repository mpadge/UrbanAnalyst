
import React, { useState } from 'react';
import Select from 'react-select';

import { LayerListProps } from "./interfaces";

export default function LayerList(props: LayerListProps) {

    const options = [
        { value: 'social_index', label: 'Social' },
        { value: 'transport_abs', label: 'Transport (Abs)' },
        { value: 'transport_rel', label: 'Transport (Rel)' },
        { value: 'uta_abs', label: 'UTA Index (Abs)' },
        { value: 'uta_rel', label: 'UTA Index (Rel)' }
    ]

    const [isSearchable, setIsSearchable] = useState(true);
    const [selected, setSelected] = useState(null);

    const handleChange = (selectedOption: any) => {
        setSelected(selectedOption);
        props.handleLayerChange(selectedOption.value);
    };

  return (
    <section className="layer-list">
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

