
import type { Metadata, Viewport } from 'next';

import ButtonAppBar from '@/components/appBar';
import ComparePage from '@/components/compare/comparePage';

export const metadata: Metadata = {
    title: 'UrbanAnalyst',
    description: 'UrbanAnalyst Compare page',
    icons: '/ua.ico',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
}

export default function Home() {

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
        <ComparePage />
        </>
    )
}
