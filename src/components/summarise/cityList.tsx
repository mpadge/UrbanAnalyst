
import React, { useState } from 'react';
import Select from 'react-select';

import { ViewState, CityDataProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';
import Content from '@/components/summarise/citySummaryData';

interface CityListProps {
    idx: number,
    handleIdxChange: (pIdx: number) => void,
}

export default function CityList(props: CityListProps) {

    const contentArray = Content();
    const options = contentArray.map((city, index) => ({
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
            defaultValue={options[props.idx]}
            value={options[props.idx]}
            name="CitySelector"
            //isClearable={isClearable}
            isSearchable={isSearchable}
            onChange = {handleChange}
        />
    </section>
  );
}

