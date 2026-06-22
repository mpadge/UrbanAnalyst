
import type { Metadata, Viewport } from 'next';

import ButtonAppBar from '@/components/appBar';

export const metadata: Metadata = {
    title: 'UA | Map',
    description: 'Interactive city maps for Urban Analyst',
    icons: '/ua.ico',
    openGraph: {
        title: 'Urban Analyst | Map',
        description: 'Interactive spatial maps of cities analysed by Urban Analyst.',
        url: 'https://urbananalyst.city/map',
        images: [{ url: '/og-map.png', width: 1200, height: 630, alt: 'Urban Analyst Map' }],
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
}

import MapPage from '@/components/map/mapPage';

export default function Home(): JSX.Element {

    const buttonTxt = [
        "home",
        "summarise",
        "compare",
        "transform",
        "about"
    ]

    return (
        <>
            <ButtonAppBar text={buttonTxt} />
            <MapPage />
        </>
    )
}
