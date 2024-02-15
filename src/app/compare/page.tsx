
import type { Metadata, Viewport } from 'next';

import StatsPage from '@/components/compare/statsPage';

export const metadata: Metadata = {
    title: 'UA',
    description: 'Stats for Urban Analyst',
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
