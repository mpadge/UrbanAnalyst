import dynamic from 'next/dynamic';
import TourProps from 'reactour';

const Tour = dynamic(() => import('reactour').then((mod) => mod.default), {
    ssr: false,

});

export default Tour;
