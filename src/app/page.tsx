/**
 * Main page
 *
 */
import Image from "next/image"
import Link from 'next/link'
import type { Metadata, Viewport } from 'next';
import compareImage from '@/images/compare.png';
import mapImage from '@/images/map.png';
import transformImage from '@/images/transform.png';

import styles from '@/styles/Home.module.css'
import ButtonAppBar from '@/components/appBar';
import { ButtonAppProps, ButtonProps } from '@/data/interfaces';

/**
 * NextJS metadata for main page
 */
export const metadata: Metadata = {
    title: 'UA',
    description: 'Urban Analyses for the world',
    icons: '/ua.ico',
}

/**
 * Default viewport for DeckGL
 */
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
}

/**
 * Main page for entire site.
 */
export default function Home() {

    const buttonTxt = [
        "summarise",
        "compare",
        "map",
        "transform",
        "about"
    ]

    return (
        <>
            <ButtonAppBar text={buttonTxt} />
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

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        Urban Analyst is a platform for interactive
                        visualisation and comparison of cities, including
                        transport systems, measures of accessibility, and
                        socio-demographic conditions.  There are four main ways
                        to examine and compare cities: </p> </div>

                <div className={styles.grid}>

                    <div className={styles.card}>
                        <Link href="/summarise" rel="noopener noreferrer">
                            <div className={styles.cardContent}>
                                <h2>
                                    Summarise <span>&#8628;</span>
                                </h2>
                                <p className={styles.cardText}>
                                    Read a summary of analyses for any chosen city.
                                    The Summary page also identifies the best target
                                    city for each city, and summarises the ways by
                                    which that city could best improve to become
                                    more like the target city.
                                </p>
                            </div>
                        </Link>
                    </div>

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
                                    priority
                                    fill
                                    sizes="100vw"
                                    style={{
                                        objectFit: "contain"
                                    }}
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
                                    View interactive maps of all cities analysed to date.
                                </p>
                            </div>
                            <div className={styles.cardImage}>
                                <Image
                                    src={mapImage}
                                    alt="Image of UrbanAnalyst Map page"
                                    fill
                                    sizes="100vw"
                                    style={{
                                        objectFit: "contain"
                                    }}
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
                                    fill
                                    sizes="100vw"
                                    style={{
                                        objectFit: "cover"
                                    }}
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
                        Please open an issue on
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
