import dynamic from 'next/dynamic';

import MapPageContent from '@/components/map/mapPageContent';

export default dynamic(() => Promise.resolve(MapPageContent), { ssr: false });
