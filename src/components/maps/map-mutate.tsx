// This just wraps a nextjs dynamic call around the actual 'BindGenComponent'
// which loads and calls the WASM binary.

import dynamic from 'next/dynamic'

import BindGenComponent from '@/components/maps/map-mutateComponent';

interface BindGenProps {
    filename1: string
    filename2: string
    varnames: string[]
    nentries: number
    mapPath: string
}

const WasmBindGenCalc = dynamic(() => Promise.resolve(BindGenComponent), {
    ssr: false
});

export default WasmBindGenCalc;
