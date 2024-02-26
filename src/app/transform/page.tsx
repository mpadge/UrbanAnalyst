
import type { Metadata, Viewport } from 'next';

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

import TransformPage from '@/components/transform/TransformPage';

export default function Home() {

    return (
        <>
        <TransformPage />
        </>
    )
}
