
import React, { useState } from 'react';
import Select from 'react-select';

import { CityDataProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

interface CityListProps {
    idx: number,
    citiesArray: CityDataProps[],
    handleIdxChange: (pIdx: number) => void,
}

export default function TargetCityList(props: CityListProps) {

    const options = props.citiesArray.map((city, index) => ({
        value: city.name,
        label: city.nameFormatted,
        index: index
    }));

    const [isSearchable, setIsSearchable] = useState(true);
    const [selected, setSelected] = useState(null);

    const handleChange = (selectedOption: any) => {
        setSelected(selectedOption);
        props.handleIdxChange(selectedOption.index);
    };

  return (
    <section className={styles.listSelect}>
        <Select
            options={options}
            defaultValue={options[0]}
            name="CitySelector"
            isSearchable={isSearchable}
            onChange = {handleChange}
        />
    </section>
  );
}

