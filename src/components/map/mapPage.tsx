"use client"

import { lazy, Suspense } from 'react';

const MapPageDynamic = lazy(() => import('@/components/map/mapPageDynamic'));

export default function MapPage(): JSX.Element {
    return (
        <Suspense fallback={null}>
            <MapPageDynamic />
        </Suspense>
    );
}
