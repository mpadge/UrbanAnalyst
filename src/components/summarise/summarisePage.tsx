"use client"

import { lazy, Suspense } from 'react';

const SummarisePageDynamic = lazy(() => import('@/components/summarise/summarisePageDynamic'));

export default function SummarisePage(): JSX.Element {
    return (
        <Suspense fallback={null}>
            <SummarisePageDynamic />
        </Suspense>
    );
}
