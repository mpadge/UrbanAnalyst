
import type { Metadata, Viewport } from 'next';
import Image from 'next/image'

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

import MapTransformPage from '@/components/transform/mapTransformPage';

export default function Home() {

    return (
        <>
        <MapTransformPage />
        </>
    )
}
