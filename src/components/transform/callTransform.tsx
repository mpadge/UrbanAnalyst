import * as wasm_js from '@/../pkg/uamutations.js';

import { trimRangeSDs } from '@/components/utils/trimRange';

const nentries = Number(process.env.NEXT_PUBLIC_NUM_TRANSFORM_SAMPLES) || 10000;

/**
 * Function used to extract size of JSON object returned from WASM calls. this
 * is always a simple length = first of the two options, and is used just to
 * assert that that length matches value expected from map data.
 */
const JSONObjectSize = (obj: any) => {
    let numItems: number = 0;
    if (Array.isArray(obj)) {
        numItems = obj.length;
    } else if (typeof obj === 'object' && obj !== null) {
        numItems = Object.keys(obj).length;
    }
    return numItems;
}

/**
 * The **async** function to call the WASM transform module. The result is
 * stored by calling the React function passed as input, `setTransformDataAll`.
 * This object contains all four columns of transformed data (original,
 * transformed, absolute, and relative). Individual columns are then selected
 * by calling the {@link transformDataSelectCol} function.
 */
export async function transformDataFunction(
    data1: number | null,
    data2: number | null,
    varnames: string[],
    setTransformDataAll: (data: any) => void
) {
    fetch('@/../pkg/uamutations_bg.wasm')
        .then(response => {
            return response.arrayBuffer();
        })
        .then(bytes => {
            if (data1 && data2) {
                const wasm_binary = wasm_js.initSync(bytes);
                const varname = varnames.join(",");
                const data1js = JSON.stringify(data1);
                const data2js = JSON.stringify(data2);
                const resultJson = wasm_js.uamutate(data1js, data2js, varname, nentries);
                const resultObj = JSON.parse(resultJson);
                setTransformDataAll(resultObj);
            }
        })
        .catch(error => {
            console.error('Error fetching wasm module:', error);
        });
};

export async function transformDataSelectCol(
    transformDataAll: Array<any> | null,
    outputLayer: string,
    setTransformDataOneCol: (data: any) => void
) {
    type Row = number[];

    let outputCol;
    if (transformDataAll) {
        switch (outputLayer) {
            case 'original':
                outputCol = transformDataAll.map((row: Row) => row[0]);
                break;
            case 'transformed':
                outputCol = transformDataAll.map((row: Row) => row[1]);
                break;
            case 'absolute':
                outputCol = transformDataAll.map((row: Row) => row[2]);
                break;
            case 'relative':
                outputCol = transformDataAll.map((row: Row) => row[3]);
                break;
            default:
                throw new Error(`Invalid output layer: `);
        }
        outputCol = trimRangeSDs(outputCol);
        setTransformDataOneCol(outputCol);
    }
};
