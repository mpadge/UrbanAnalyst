
import React, { useState } from 'react';
import Select from 'react-select';

import { ViewState, CityDataProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

interface CityListProps {
    idx: number,
    citiesArray: CityDataProps[],
    viewState: ViewState,
    handleIdxChange: (pIdx: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void
}

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
        props.handleIdxChange(selectedOption.index);
        props.handleViewStateChange({...props.citiesArray[selectedOption.index].initialViewState,
            pitch: 0,
            bearing: 0 });
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

