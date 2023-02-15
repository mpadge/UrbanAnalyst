
import { useState } from 'react';
import { CityShowProps } from "@/components/interfaces";

export default function CityShow(props: CityShowProps) {
    const [text, setText] = useState('');
    return (
            <section className="cityshow">
            <textarea
            value={text}
            placeholder={'Chosen ' + props.citiesArray[props.idx].path}
            onChange={e => setText(e.target.value)}
            />
            </section>
           );
}
