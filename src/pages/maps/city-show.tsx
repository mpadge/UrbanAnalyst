
import { useState } from 'react';
import { CityData, CityShowProps } from "./interfaces";

export default function CityShow(props: CityShowProps) {
    const [text, setText] = useState('');
    return (
            <section className="cityshow">
            <textarea
            value={text}
            placeholder={'Chosen ' + props.citiesData[props.idx].path}
            onChange={e => setText(e.target.value)}
            />
            </section>
           );
}
