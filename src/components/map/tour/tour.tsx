import dynamic from 'next/dynamic';

const Tour = dynamic(() => import('reactour').then((mod) => mod.default), {
    ssr: false,
});

export default Tour;
