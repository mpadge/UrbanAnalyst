import Image from 'next/image'
import Link from 'next/link'
import type { Metadata, Viewport } from 'next';

import styles from '@/styles/Home.module.css'
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
        first: "maps",
        second: "stats",
        third: "transform",
        fourth: "about"
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
                        />
                    </a>
                </p>
            </div>

            <div className={styles.centerBig}>
                <p className="text-center">
                    Urban Analyst
                </p>
            </div>

            <div className={styles.centerMed}>
                <p className="text-center">
                    Urban Analyst provides interactive maps of the properties of
                    cities including of their transport systems and
                    socio-demographic conditions, as well as statistical
                    summaries of all cities. Values for each city are aggregated
                    from billions of individual routing queries, providing
                    extraordinary insight into how people move throughout
                    cities.
                </p>
            </div>

            <div className={styles.grid}>

                <Link
                href="/maps"
                className={styles.card}
                rel="noopener noreferrer"
                >
                    <h2>
                        Maps <span>-&gt;</span>
                    </h2>
                    <p className={styles.cardText}>
                        Interactive maps of all cities analysed to date.
                    </p>
                </Link>


                <Link
                href="/stats"
                className={styles.card}
                rel="noopener noreferrer"
                >
                    <h2>
                        Statistics <span>-&gt;</span>
                    </h2>
                    <p className={styles.cardText}>
                        Compare statistics for every UA city.
                    </p>
                </Link>

            </div>

            <div className={styles.centerBig}>
                <p className="text-center">
                    How does it work?
                </p>
            </div>

            <div className={styles.centerNormal}>
                <p className="text-center">
                    Values for most statistics are derived for every street
                    intersection within each city. Travel times are measured to
                    all other intersections using every available mode of
                    transport, and all possible combinations of these. Full
                    details are provided in
                    <a className = {styles.textLink}
                    href="https://UrbanAnalyst.github.io/docs"
                    >&nbsp;the documentation pages
                    </a>.
                </p>

                <p className="text-center">
                    Results for each city involve millions of public transport
                    routing calculations, and generally billions of routing
                    calculations through street networks.  These are calculated
                    using Urban Analyst&apos;s own open-source software
                    described in <a className = {styles.textLink}
                    href="https://UrbanAnalyst.github.io/docs" >&nbsp;the
                    documentation pages </a>. These enormous numbers of
                    calculations enable Urban Analyst to provide uniquely
                    powerful insight into how people move throughout cities.
                </p>
            </div>

            <div className={styles.centerBig}>
                <p className="text-center">
                    What is the best city?
                </p>
            </div>

            <div className={styles.centerNormal}>
                <p className="text-center">
                    There is no &ldquo;best&rdquo; city. Any such judgements can
                    only be made in terms of single variables. Urban Analyst
                    measures and compares a range of variables, and
                    relationships between these. Each city may be better in some
                    regards, worse in others. Urban Analyst makes differences
                    between cities visible, and allows different cities to be
                    compared in a variety of ways.
                </p>
            </div>

            <div className={styles.centerBig}>
                <p className="text-center">
                    How can cities be added?
                </p>
            </div>

            <div className={styles.centerNormal}>
                <p className="text-center">
                    Urban Analyst is currently funeded by the
                    German Government&apos;s
                    <a className = {styles.textLink}
                    href="https://prototypefund.de/project/urban-analyst/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >&nbsp;prototype fund
                    </a>, including some funding for adding cities.
                    The current recommended way is to open an issue on
                    <a className = {styles.textLink}
                    href="https://github.com/mpadge/UrbanAnalyst/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    &nbsp;the GitHub repository of this site
                    </a>
                    &nbsp;requesting the addition of a particular city.
                </p>
            </div>

        </main>
    </>
    )
}
