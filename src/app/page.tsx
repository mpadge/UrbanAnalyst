import Image from "next/legacy/image"
import Link from 'next/link'
import type { Metadata, Viewport } from 'next';
import compareImage from '@/images/compare.png';
import mapImage from '@/images/map.png';
import transformImage from '@/images/transform.png';

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
        first: "compare",
        second: "map",
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
                    How does your city compare to others?<br/>
What would your city be like if it became more like some other city?<br/>
What&apos;s the best way for that to happen?
                </p> </div>

            <div className={styles.grid}>

                <div className={styles.card}>
                    <Link href="/compare" rel="noopener noreferrer">
                        <div className={styles.cardContent}>
                            <h2>
                                Compare <span>&#8628;</span>
                            </h2>
                            <p className={styles.cardText}>
                                Compare statistics for every UA city.
                            </p>
                        </div>
                        <div className={styles.cardImage}>
                            <Image
                                src={compareImage}
                                alt="Image of UrbanAnalyst Compare page"
                                layout="fill"
                                objectFit="contain"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                <div className={styles.card}>
                    <Link href="/map" rel="noopener noreferrer">
                        <div className={styles.cardContent}>
                            <h2>
                                Map <span>&#8628;</span>
                            </h2>
                            <p className={styles.cardText}>
                                Interactive maps of all cities analysed to date.
                            </p>
                        </div>
                        <div className={styles.cardImage}>
                            <Image
                                src={mapImage}
                                alt="Image of UrbanAnalyst Map page"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </Link>
                </div>


                <div className={styles.card}>
                    <Link href="/transform" rel="noopener noreferrer">
                        <div className={styles.cardContent}>
                            <h2>
                                Transform <span>&#8628;</span>
                            </h2>
                            <p className={styles.cardText}>
                                Transform any city to be like any other
                            </p>
                        </div>
                        <div className={styles.cardImage}>
                            <Image
                                src={transformImage}
                                alt="Image of UrbanAnalyst Transform page"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </Link>
                </div>

            </div>

            <div className={styles.centerBig}>
                <p className="text-center">
                    How does it work?
                </p>
            </div>

            <div className={styles.centerNormal}>

                <p className="text-center">
                    Results for each city involve billions of routing
                    calculations through street networks and public transport
                    systems.  These are calculated using Urban Analyst&apos;s
                    own open-source software described in
                    <a className = {styles.textLink}
                    href="https://UrbanAnalyst.github.io/docs" >&nbsp;the
                    documentation pages </a>. These enormous numbers of
                    calculations enable Urban Analyst to provide uniquely
                    powerful insights into how people move throughout cities.
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
