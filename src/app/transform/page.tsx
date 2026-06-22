
import type { Metadata, Viewport } from 'next';

import ButtonAppBar from '@/components/appBar';

export const metadata: Metadata = {
    title: 'UA | Transform',
    description: 'Transform cities with Urban Analyst',
    icons: '/ua.ico',
    openGraph: {
        title: 'Urban Analyst | Transform',
        description: 'Analyse how any city could be transformed to become more like another.',
        url: 'https://urbananalyst.city/transform',
        images: [{ url: '/og-map.png', width: 1200, height: 630, alt: 'Urban Analyst Transform' }],
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
}

import TransformPage from '@/components/transform/transformPage';

export default function Home(): JSX.Element {

    const buttonTxt = [
        "home",
        "summarise",
        "compare",
        "map",
        "about"
    ]

    return (
        <>
            <ButtonAppBar text={buttonTxt} />
            <TransformPage />
        </>
    )
}
