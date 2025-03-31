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
import { ButtonAppProps } from '@/data/interfaces';
import UABarChart from '@/components/main/uaindexBarChart';

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

                <div className={styles.centerBig}>
                    <p className="text-center">
                        Urban Analyst
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        Urban Analyst (UA) is a platform for interactive
                        visualisation and comparison of cities, including
                        transport systems, measures of accessibility, and
                        socio-demographic conditions. The &ldquo;UA
                        Index&rdquo; combines all measures into a single index.
                        Lower values in UA are generally better than higher
                        values. Think travel times or unemployment statistics.
                        The UA Index works the same: the best city has the
                        lowest score. Current scores and ranks are:
                    </p>
                </div>

                <UABarChart />

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        There are four main ways to examine and compare cities:
                    </p>
                </div>

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
                                    sizes="(max-width: 700px) 100vw, 50vw"
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
                                    sizes="(max-width: 700px) 100vw, 50vw"
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
                                    sizes="(max-width: 700px) 100vw, 50vw"
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
                        <Link className = {styles.textLink}
                            href="https://docs.urbananalyst.city" >&nbsp;the
                            documentation pages
                        </Link>.
                        These enormous numbers of calculations enable Urban
                        Analyst to provide uniquely powerful insights into
                        urban form and function.
                    </p>
                </div>

                <div className={styles.centerBig}>
                    <p className="text-center">
                        Urban Analyst for your city
                    </p>
                </div>

                <div className={styles.centerNormal}>

                    <p className="text-center">
                        This main site is free and powered by open-source
                        software. The data shown here are aggregated from
                        highly detailed calculations at every street
                        intersection in each city. Calculations include travel
                        times from everywhere to everywhere using combinations
                        of every conceivable mode of transport.  The
                        full-resolution detail of these data can be seen on the
                        additional&nbsp;
                        <Link className = {styles.textLink}
                            href="https://demo.urbananalyst.city" >
                            demonstration pages
                        </Link>.
                        City-specific Urban Analyst sites can be customized for any 
                        conceivable needs. To find out more, check out the&nbsp;
                        <Link className = {styles.textLink}
                            href="https://demo.urbananalyst.city" >
                            demonstration pages
                        </Link>,
                        or email&nbsp;
                        <Link href="mailto:info@urbananalyst.city" rel="noopener noreferrer">
                            info@urbananalyst.city
                        </Link>
                        .
                    </p>
                </div>

                <div className={styles.centerBig}>
                    <p className="text-center">
                        How can cities be added?
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        To request the addition of a particular city, email us
                        at&nbsp;
                        <Link href="mailto:info@urbananalyst.city" rel="noopener noreferrer">
                            info@urbananalyst.city
                        </Link>
                        . Or open an issue on
                        <a className = {styles.textLink}
                            href="https://github.com/mpadge/UrbanAnalyst/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            &nbsp;the GitHub repository of this site
                        </a>
                        .
                    </p>
                </div>

            </main>
        </>
    )
}
