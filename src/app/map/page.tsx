
import type { Metadata, Viewport } from 'next';

import ButtonAppBar from '@/components/appBar';

export const metadata: Metadata = {
    title: 'UrbanAnalyst',
    description: 'UrbanAnalyst Map page',
    icons: '/ua.ico',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
}

import MapPage from '@/components/map/mapPage';

export default function Home() {

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
