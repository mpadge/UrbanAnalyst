import dynamic from 'next/dynamic';

const Tour = dynamic(() => import('@/components/tour/tourWrapper'), {
    ssr: false,
});

export default Tour;
