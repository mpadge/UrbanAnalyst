import { useEffect, useState} from 'react';

import * as wasm_js from '@/../pkg/uamutations.js';
import styles from '@/styles/maps.module.css';
import { ViewState, CityDataProps } from "@/data/interfaces";

interface MutateProps {
    idx: number
    varnames: string[]
    nentries: number
    mapPath: string
    citiesArray: CityDataProps[]
    viewState: ViewState
}

// Function used to extract size of JSON object returned from WASM calls. this
// is always a simple length = first of the two options, and is used just to
// assert that that length matches value expected from map data.
const JSONObjectSize = (obj: any) => {
    let numItems: number = 0;
    if (Array.isArray(obj)) {
        numItems = obj.length;
    } else if (typeof obj === 'object' && obj !== null) {
        numItems = Object.keys(obj).length;
    }
    return numItems;
}

const MapMutateComponent = (props: MutateProps) => {
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);

    const [result, setResult] = useState<number[] | null>(null);
    const [geoJSONcontent, setGeoJSONcontent] = useState<any>(null)

    const mapPath1 = props.citiesArray[props.idx].path.replace("data\.json", "dataraw.json");
    const mapPath2 = mapPath1.replace(/(\/[^\/]*\/)[^\/]*(\/.*)/, "$1paris$2");

    // Effect to load 'dataraw' point-based data for source and target cities,
    // and store as 'data1', 'data2':
    useEffect(() => {
        const loadData = async () => {
            const response1 = await fetch(mapPath1);
            const json1 = await response1.json();
            setData1(json1);

            const response2 = await fetch(mapPath2);
            const json2 = await response2.json();
            setData2(json2);
        };

        loadData();
        }, [mapPath1, mapPath2]);


    // Effect to pass 'data1', 'data2' to WASM mutation algorithm, and return
    // vector of aggregaed mean differences in each polygon of source city.
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

                const numItems = JSONObjectSize(resultObj);

                setResult(resultObj);
            }
            })
        .catch(error => {
            console.error('Error fetching wasm module:', error);
            });
        }, [data1, data2, props.varnames, props.nentries]);

    // Effect to load map data for source city, and replace specified column
    // with 'result' from previous effect:
    useEffect(() => {
        fetch(props.mapPath)
        .then(response => response.json())
        .then(data => {
            data.features.forEach((feature: any, index: number) => {
                if (result) {
                    feature.properties.column_to_replace = result[index];
                }
            });
            setGeoJSONcontent(data);
        })
        .catch((error) => console.error('Error:', error));
    }, [result, props.mapPath]);

    return (
        <div className={styles.json2}>
            <h1>BindGen2</h1>
                {result ? result && <pre>{JSON.stringify(result, null, 2)}</pre> : "Loading..."}
        </div>
    )
}

export default MapMutateComponent;
