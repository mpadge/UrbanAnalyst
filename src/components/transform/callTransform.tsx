import * as wasm_js from '@/../pkg/uamutations.js';

import { trimRangeSDs } from '@/components/utils/trimRange';

const nentries = Number(process.env.NEXT_PUBLIC_NUM_TRANSFORM_SAMPLES) || 10000;

/**
 * Function used to extract size of JSON object returned from WASM calls. this
 * is always a simple length = first of the two options, and is used just to
 * assert that that length matches value expected from map data.
 */
const _JSONObjectSize = (obj: any): number => {
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
    data1: any | null,
    data2: any | null,
    varnames: string[],
    setTransformDataAll: (data: any) => void,
    onComplete: () => void
): Promise<void> {
    /* eslint-disable no-console */
    try {
        if (!data1 || !data2) {
            throw new Error('Data1 or Data2 is null/undefined');
        }
        if (typeof data1 !== 'object' || typeof data2 !== 'object') {
            throw new Error('Data is not object type');
        }
        if (!varnames || varnames.length === 0) {
            throw new Error('Var names array is empty');
        }

        const wasmResponse = await fetch('@/../pkg/uamutations_bg.wasm');
        if (!wasmResponse.ok) {
            throw new Error(`Failed to fetch WASM: ${wasmResponse.status} ${wasmResponse.statusText}`);
        }

        const bytes = await wasmResponse.arrayBuffer();

        try {
            const _wasm_binary = wasm_js.initSync(bytes);

            const varname = varnames.join(",");
            const data1js = JSON.stringify(data1);
            const data2js = JSON.stringify(data2);

            const actualDataSize = Array.isArray(data1) ? data1.length : 0;
            const safeNentries = Math.min(nentries, actualDataSize);

            let resultJson;
            try {
                resultJson = wasm_js.uamutate(data1js, data2js, varname, safeNentries);
            } catch (wasmError) {
                const errorMessage = wasmError instanceof Error ? wasmError.message : String(wasmError);
                console.error('WASM uamutate function error:', errorMessage);
                console.error('Error details:', {
                    name: wasmError instanceof Error ? wasmError.name : 'Unknown',
                    stack: wasmError instanceof Error ? wasmError.stack : 'No stack trace'
                });
                throw new Error(`WASM uamutate failed: ${errorMessage}`);
            }

            if (!resultJson || typeof resultJson !== 'string') {
                console.error('Invalid WASM result:', resultJson);
                throw new Error('WASM returned invalid result');
            }

            let resultObj;
            try {
                resultObj = JSON.parse(resultJson);
            } catch (parseError) {
                console.error('Failed to parse WASM result:', parseError);
                console.error('Raw result:', resultJson);
                throw new Error('Failed to parse WASM result JSON');
            }

            if (!Array.isArray(resultObj)) {
                console.error('WASM result is not an array:', typeof resultObj);
                throw new Error('WASM result is not an array');
            }

            if (resultObj.length === 0) {
                throw new Error('WASM result is empty');
            }

            setTransformDataAll(resultObj);
            onComplete();

        } catch (wasmError) {
            const errorMessage = wasmError instanceof Error ? wasmError.message : String(wasmError);
            console.error('WASM execution error:', errorMessage);
            console.error('Full error object:', wasmError);
            throw new Error(`WASM execution failed: ${errorMessage}`);
        }

    } catch (error) {
        console.error('Transform data function error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error(`Transformation failed: ${errorMessage}`);
        throw error;
    }
};

export async function transformDataSelectCol(
    transformDataAll: Array<any> | null,
    outputLayer: string,
    setTransformDataOneCol: (data: any) => void
): Promise<void> {
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
