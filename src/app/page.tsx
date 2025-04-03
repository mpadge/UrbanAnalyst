/**
 * Main page
 *
 */
import Image from "next/image"
import Link from 'next/link'
import type { Metadata, Viewport } from 'next';
import compareImage from '@/images/compare.png';
import mapImage from '@/images/map.png';
import transformImage from '@/images/ua.png';

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
                        socio-demographic conditions. This site allows full
                        exploration of all of these factors, including detailed
                        interactive spatial&nbsp;
                        <Link href="/map" rel="noopener noreferrer">
                            maps
                        </Link>
                        &nbsp;of each city, charts&nbsp;
                        <Link href="/compare" rel="noopener noreferrer">
                        comparing
                        </Link>
                        &nbsp;all cities, and analyses of how cities can be&nbsp;
                        <Link href="/transform" rel="noopener noreferrer">
                        transformed
                        </Link>
                        &nbsp;to become more like other UA cities.
                        <br /><br />

                        All measurements are also combined into a single
                        &ldquo;UA
                        Index&rdquo;, for which lower values are better than
                        higher values. Think travel times or unemployment
                        statistics. The best city has the lowest UA Index, with
                        a score of 1 reflecting average scores in all
                        individual components. Scores of all current UA cities,
                        ranked from best at the top, are:
                    </p>
                </div>

                <div id="ua-index-chart" className={styles.mainbarchart}>
                    <UABarChart />
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        Unlike most other city scoring and ranking systems,
                        Urban Analyst measures the relationships between all
                        parameters, importantly including relationships with
                        social inequality. Good cities thus not only have, for
                        example, better transport systems, greater availability
                        of education, or easier access to nature, but all of
                        these aspects are also developed in ways that counteract
                        and reduce social inequality within a city. A good city
                        has a transport system which works just as well, or
                        better, for disadvantaged as for well-off residents.
                        <br /><br />

                        To further understand differences between, and patterns
                        within, cities, the site offers four ways to explore
                        and compare cities:
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
                                    Compare statistics for every UA city, both
                                    in terms of all parameters measured for
                                    every city, as well as in terms of
                                    relationships between those parameters.
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
                                    View interactive maps of all cities
                                    analysed to date, also in terms both of all
                                    individual parameters as well as
                                    relationships between them all.
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
                        Where do the data come from?
                    </p>
                </div>

                <div className={styles.centerNormal}>

                    <p className="text-center">
                        All data are obtained from openly published sources, as
                        described in detail in
                        <Link className = {styles.textLink}
                            href="https://docs.urbananalyst.city" >&nbsp;the
                            documentation pages
                        </Link>.
                        Results for each city involve billions of routing
                        calculations through street networks and public transport
                        systems.  These are calculated using Urban Analyst&apos;s
                        own open-source software also described in
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
