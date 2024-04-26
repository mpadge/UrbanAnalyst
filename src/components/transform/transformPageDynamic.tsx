// This just wraps a nextjs dynamic call around the actual 'BindGenComponent'
// which loads and calls the WASM binary.

import dynamic from 'next/dynamic'

import TransformComponent from '@/components/transform/transformComponent';

const TransformDynamic = dynamic(() => Promise.resolve(TransformComponent), {
    ssr: false
});

export default TransformDynamic;
