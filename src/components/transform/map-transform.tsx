// This just wraps a nextjs dynamic call around the actual 'BindGenComponent'
// which loads and calls the WASM binary.

import dynamic from 'next/dynamic'

import MapTransformComponent from '@/components/transform/map-transformComponent';

const MapTransformCalculate = dynamic(() => Promise.resolve(MapTransformComponent), {
    ssr: false
});

export default MapTransformCalculate;
