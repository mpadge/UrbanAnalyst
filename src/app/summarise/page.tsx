import Image from "next/image"
import Link from 'next/link'
import type { Metadata, Viewport } from 'next';

import styles from '@/styles/summarise.module.css'
import Buttons from '@/components/buttons4'
import { ButtonProps } from '@/data/interfaces';

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

    const buttons = {
        first: "home",
        second: "compare",
        third: "map",
        fourth: "transform"
    }

    return (
        <>
        <Buttons buttons={buttons} />
        <main className={styles.main}>
            <div className={styles.description}>
                <p>
                    <a
                    href="https://github.com/UrbanAnalyst"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        Urban Analyst
                        <Image
                            src="/ua.svg"
                            alt="UA Logo"
                            className={styles.vercelLogo}
                            width={100}
                            height={50}
                            priority
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }}
                        />
                    </a>
                </p>
            </div>

            <div className={styles.centerBig}>
                <p className="text-center">
                    Urban Analyst
                </p>
            </div>

            <SummarisePage />

        </main>
    </>
    )
}
