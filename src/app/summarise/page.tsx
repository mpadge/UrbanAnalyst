import type { Metadata, Viewport } from 'next';

import styles from '@/styles/summarise.module.css'
import ButtonAppBar from '@/components/appBar';

import SummarisePage from '@/components/summarise/summarisePage';

export const metadata: Metadata = {
    title: 'UA | Summarise',
    description: 'City summaries for Urban Analyst',
    icons: '/ua.ico',
    openGraph: {
        title: 'Urban Analyst | Summarise',
        description: 'Read detailed summaries of Urban Analyst analyses for any city.',
        url: 'https://urbananalyst.city/summarise',
        images: [{ url: '/og-map.png', width: 1200, height: 630, alt: 'Urban Analyst Summarise' }],
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
}

export default function Home(): JSX.Element {

    const buttonTxt = [
        "home",
        "compare",
        "map",
        "transform",
        "about"
    ]

    return (
        <>
            <ButtonAppBar text={buttonTxt} />
            <main className={styles.main}>

                <SummarisePage />

            </main>
        </>
    )
}
