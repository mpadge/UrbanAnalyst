// This just wraps a nextjs dynamic call around the actual 'BindGenComponent'
// which loads and calls the WASM binary.

import dynamic from 'next/dynamic'

import MapMutateComponent from '@/components/maps/map-mutateComponent';

const MapMutateCalculate = dynamic(() => Promise.resolve(MapMutateComponent), {
    ssr: false
});

export default MapMutateCalculate;
