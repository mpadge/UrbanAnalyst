import dynamic from 'next/dynamic';

import SummarisePageContent from '@/components/summarise/summarisePageContent';

export default dynamic(() => Promise.resolve(SummarisePageContent), { ssr: false });
