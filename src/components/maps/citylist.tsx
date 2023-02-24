
import React, { useState } from 'react';
import Select from 'react-select';

import { CityListProps } from "./interfaces";
import styles from '@/styles/controls.module.css';

export default function CityList(props: CityListProps) {

    const options = props.citiesArray.map((city, index) => ({
        value: city.name,
        label: city.nameFormatted,
        index: index
    }));

    //const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [selected, setSelected] = useState(null);

    const handleChange = (selectedOption: any) => {
        setSelected(selectedOption);
        console.log("SELECTOR (value, index) = (" + selectedOption.label + ", " + selectedOption.value + ")")
        props.handleIdxChange(selectedOption.index);
        props.handleViewStateChange({...props.citiesArray[selectedOption.index].initialViewState,
                pitch: 0,
                bearing: 0 });
    };

  return (
    <section className={styles.listSelect}>
        <Select
            options={options}
            defaultValue={options[0]}
            name="CitySelector"
            //isClearable={isClearable}
            isSearchable={isSearchable}
            onChange = {handleChange}
        />
    </section>
  );
}

