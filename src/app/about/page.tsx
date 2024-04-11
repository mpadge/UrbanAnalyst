import Image from "next/image"
import Link from 'next/link'
import type { Metadata, Viewport } from 'next';

import styles from '@/styles/about.module.css'
import Buttons from '@/components/buttons4'
import { ButtonProps } from '@/data/interfaces';

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

            <div className={styles.leftMed}>
                <p className="text-center">
                    What is this?
                </p>
            </div>

            <div className={styles.centerNormal}>
                <p className="text-center">
                    Urban Analyst is a platform for interactive visualisation of
                    the properties of cities, including transport systems and
                    socio-demographic conditions.  The platform offers
                </p>
            </div>
            <div className={styles.centerNormal}>
                <ol>
                    <li>
                        a &ldquo;Compare&rdquo; view that compares the
                        properties of different cities in terms of each variable
                        measured by Urban Analyst.
                    </li>
                    <li>
                        a &ldquo;Map&rdquo; view, to enable various properties
                        of individual cities to be visualised as interactive
                        maps, and
                    </li>
                    <li>
                      a &ldquo;Transform&rdquo; view that enables cities to be
                      transformed to become like any other city.
                    </li>
                </ol>
            </div>
            <div className={styles.centerNormal}>
                <p className="text-center"> 
                    Full details are provided&nbsp;
                    <a
                    href="https://UrbanAnalyst.github.io/docs"
                    rel="noopener noreferrer"
                    >
                    in the documentation</a>.
                </p>
            </div>

            <div className={styles.leftMed}>
                <p className="text-center">
                    Who made this?
                </p>
            </div>

            <div className={styles.centerNormal}>
                <p className="text-center">
                    <a
                    href="https://github.com/mpadge"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Mark Padgham
                    </a>
                    , along with all of the other contributors to the
                    <a
                    href="https://github.com/UrbanAnalyst"
                    rel="noopener noreferrer"
                    >
                    &nbsp;open-source software which drives it.
                    </a>.
                </p>
            </div>

            <div className={styles.leftMed}>
                <p className="text-center">
                    Who funds this?
                </p>
            </div>

            <div className={styles.centerNormal}>
                <p className="text-center">
                    Previous funding has been provided by
                    the German Government&#39;s &#8202;
                    <a
                    href="https://prototypefund.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    prototypefund
                    </a>
                    , as part of their &#8202;
                    <a
                    href="https://prototypefund.de/project/urban-transport-analyst-uta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >twelfth </a>
                     and &#8202;
                    <a
                    href="https://prototypefund.de/project/urban-analyst/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    fourteenth funding rounds
                    </a>.
                </p>
            </div>
        </main>
    </>
    )
}
