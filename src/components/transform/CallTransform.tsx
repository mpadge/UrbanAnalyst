import * as wasm_js from '@/../pkg/uamutations.js';

import { trimRange } from '@/components/utils/trimRange';

const nentries = Number(process.env.NEXT_PUBLIC_NUM_TRANSFORM_SAMPLES) || 10000;

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

export async function transformDataFunction(data1: number | null, data2: number | null, varnames: string[], outputLayer: string, setResult: (data: any) => void) {
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

                type Row = number[];

                let outputCol;
                switch (outputLayer) {
                    case 'original':
                        outputCol = resultObj.map((row: Row) => row[0]);
                        break;
                    case 'transformed':
                        outputCol = resultObj.map((row: Row) => row[1]);
                        break;
                    case 'absolute':
                        outputCol = resultObj.map((row: Row) => row[2]);
                        break;
                    case 'relative':
                        outputCol = resultObj.map((row: Row) => row[3]);
                        break;
                    default:
                        throw new Error(`Invalid output layer: `);
                }
                // Same as in wasm/src/lib.rs, taken from
                // uaengine/R/ua-export.R:
                const logVars = ["parking", "school_dist", "intervals"];
                if ((outputLayer === 'original' || outputLayer === 'transformed') &&
                    logVars.includes(varnames[0])) {
                    outputCol = outputCol.map((value: number) => Math.log10(value));
                }
                if (outputLayer !== 'original') {
                    outputCol = trimRange(outputCol);
                }
                setResult(outputCol);
            }
        })
        .catch(error => {
            console.error('Error fetching wasm module:', error);
        });
};
