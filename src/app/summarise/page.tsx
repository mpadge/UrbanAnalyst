import Image from "next/image"
import Link from 'next/link'
import type { Metadata, Viewport } from 'next';

import styles from '@/styles/summarise.module.css'
import Buttons from '@/components/buttons4'
import ButtonAppBar from '@/components/appBar';
import { ButtonAppProps, ButtonProps } from '@/data/interfaces';

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

export default function Home() {

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
