
import type { Metadata, Viewport } from 'next';
import Image from "next/legacy/image"

export const metadata: Metadata = {
    title: 'UA',
    description: 'Maps for Urban Analyst',
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

    return (
        <>
        <MapPage />
        </>
    )
}
