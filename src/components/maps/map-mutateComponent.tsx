import { useEffect, useState} from 'react';

import * as wasm_js from '@/../pkg/uamutations.js';
import styles from '@/styles/maps.module.css';

interface BindGenProps {
    filename1: string
    filename2: string
    varnames: string[]
    nentries: number
}

const BindGenComponent = (props: BindGenProps) => {
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);

    const [result, setResult] = useState<Object | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const response1 = await fetch(props.filename1);
            const json1 = await response1.json();
            setData1(json1);

            const response2 = await fetch(props.filename2);
            const json2 = await response2.json();
            setData2(json2);
        };

        loadData();
        }, [props.filename1, props.filename2]);

    useEffect(() => {
        fetch('@/../pkg/uamutations_bg.wasm')
        .then(response => {
            return response.arrayBuffer();
            })
        .then(bytes => {
            if (data1 && data2) {
                const wasm_binary = wasm_js.initSync(bytes);
                const varname = props.varnames.join(",");
                const data1js = JSON.stringify(data1);
                const data2js = JSON.stringify(data2);
                const resultJson = wasm_js.uamutate(data1js, data2js, varname, props.nentries);
                const resultObj = JSON.parse(resultJson);
                setResult(resultObj);
            }
            })
        .catch(error => {
            console.error('Error fetching wasm module:', error);
            });
        }, [data1, data2, props.varnames, props.nentries]);

    return (
        <div className={styles.json2}>
            <h1>BindGen2</h1>
                {result ? result && <pre>{JSON.stringify(result, null, 2)}</pre> : "Loading..."}
        </div>
    )
}

export default BindGenComponent;
