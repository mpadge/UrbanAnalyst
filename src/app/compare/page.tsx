
import type { Metadata, Viewport } from 'next';

import StatsPage from '@/components/compare/comparePage';

export const metadata: Metadata = {
    title: 'UA',
    description: 'Compare cities for Urban Analyst',
    icons: '/ua.ico',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
}

export default function Home() {

    return (
        <>
        <StatsPage />
        </>
    )
}
