import * as wasm_js from '@/../pkg/uamutations.js';

const nentries = Number(process.env.NEXT_PUBLIC_NUM_TRANSFORM_SAMPLES) || 1000;

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

export async function transformDataFunction(data1: number | null, data2: number | null, varnames: string[], setResult: (data: any) => void) {
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

                // const numItems = JSONObjectSize(resultObj);

                type Row = number[];
                // const vals_orig = resultObj.map((row: Row) => row[0]);
                // const vals_trans = resultObj.map((row: Row) => row[1]);
                // const diff_abs = resultObj.map((row: Row) => row[2]);
                const diff_rel = resultObj.map((row: Row) => row[3]);

                setResult(diff_rel);
            }
        })
        .catch(error => {
            console.error('Error fetching wasm module:', error);
        });
};
