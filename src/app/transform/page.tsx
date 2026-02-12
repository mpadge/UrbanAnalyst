
import type { Metadata, Viewport } from 'next';

import ButtonAppBar from '@/components/appBar';

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
