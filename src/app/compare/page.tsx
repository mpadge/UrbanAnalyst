
import { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';

import ButtonAppBar from '@/components/appBar';
import ComparePage from '@/components/compare/comparePage';

export const metadata: Metadata = {
    title: 'UA | Compare',
    description: 'Compare cities for Urban Analyst',
    icons: '/ua.ico',
    openGraph: {
        title: 'Urban Analyst | Compare',
        description: 'Compare statistics and relationships across all Urban Analyst cities.',
        url: 'https://urbananalyst.city/compare',
        images: [{ url: '/og-compare.png', width: 1200, height: 630, alt: 'Urban Analyst Compare' }],
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
}

export default function Home(): JSX.Element {

    const buttonTxt = [
        "home",
        "summarise",
        "map",
        "transform",
        "about"
    ]

    return (
        <>
        <ButtonAppBar text={buttonTxt} />
        <Suspense fallback={null}>
            <ComparePage />
        </Suspense>
        </>
    )
}
