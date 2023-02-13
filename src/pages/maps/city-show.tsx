
import { useState } from 'react';

export default function CityShow({ citiesData, idx }) {
    const [text, setText] = useState('');
    return (
            <section className="cityshow">
            <textarea
            value={text}
            placeholder={'Chosen ' + citiesData[idx].path}
            onChange={e => setText(e.target.value)}
            />
            </section>
           );
}
