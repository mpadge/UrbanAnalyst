import type { Metadata, Viewport } from 'next';

import styles from '@/styles/summarise.module.css'
import ButtonAppBar from '@/components/appBar';

import SummarisePage from '@/components/summarise/summarisePage';

export const metadata: Metadata = {
    title: 'UA',
    description: 'Urban Analyses for the world',
    icons: '/ua.ico',
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
