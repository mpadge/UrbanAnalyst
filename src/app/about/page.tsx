import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from "next/font/google"
import styles from '@/styles/about.module.css'
import Buttons from '@/components/buttons3'
import { ButtonProps } from '@/data/interfaces';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const buttons = {
        first: "home",
        second: "maps",
        third: "stats"
    }

    return (
        <>
        <Head>
            <title>UA</title>
            <meta name="description" content="Urban Analyses for the world" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/ua.ico" />
        </Head>
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

            <div className={styles.centerSmall}>
                <p className="text-center">
                    Urban Analyst is a platform for interactive visualisation of
                    the properties of cities, including transport systems and
                    socio-demographic conditions.  The platform offers a
                    &ldquo;Maps&rdquo; view, to enable various properties of
                    individual cities to be visualised as interactive maps, and
                    a &ldquo;Stats&rdquo;, or statistics, view that compares the
                    properties of different cities in terms of each variable
                    measured by Urban Analyst. Full details are provided&nbsp;
                    <a
                    href="https://UrbanAnalyst.github.io/docs"
                    rel="noopener noreferrer"
                    >
                    in the documentation
                    </a>.
                </p>
            </div>

            <div className={styles.leftMed}>
                <p className="text-center">
                    Who made this?
                </p>
            </div>

            <div className={styles.centerSmall}>
                <p className="text-center">
                    <a
                    href="https://github.com/mpadge"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Mark Padgham
                    </a>
                    , along with all of the other contributors to the software linked to above.
                </p>
            </div>

            <div className={styles.leftMed}>
                <p className="text-center">
                    Who funds this?
                </p>
            </div>

            <div className={styles.centerSmall}>
                <p className="text-center">
                    The German Government &#8202;
                    <a
                    href="https://prototypefund.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    prototypefund
                    </a>
                    , initially as part of their &#8202;
                    <a
                    href="https://prototypefund.de/project/urban-transport-analyst-uta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >twelfth funding round</a>
                    , and currently (until end Feb 2024) as part of the &#8202;
                    <a
                    href="https://prototypefund.de/project/urban-analyst/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    fourteenth funding round
                    </a>.
                </p>
            </div>
        </main>
    </>
    )
}
