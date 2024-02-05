import dynamic from 'next/dynamic';

const Tour = dynamic(
    () => import('reactour'),
        { ssr: false },
);

export default Tour;
