
import React, { useState } from 'react';
import Select from 'react-select';

import { CityDataProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

interface CityListProps {
    idx: number,
    idx2: number,
    citiesArray: CityDataProps[],
    handleIdx2Change: (Idx2: number) => void,
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
        props.handleIdx2Change(selectedOption.index);
    };

    return (
        <section className={styles.listSelect}>
            <Select
                options={options}
                defaultValue={options[props.idx2]}
                value={options[props.idx2]}
                name="CitySelector"
                isSearchable={isSearchable}
                onChange = {handleChange}
            />
        </section>
    );
}

