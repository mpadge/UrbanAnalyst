
import { useState } from 'react';

export default function CityShow({ city }) {
    const [text, setText] = useState('');
    return (
            <section className="cityshow">
            <textarea
            value={text}
            placeholder={'Chosen ' + city.path}
            onChange={e => setText(e.target.value)}
            />
            </section>
           );
}
