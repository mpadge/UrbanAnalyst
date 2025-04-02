
import type { Metadata, Viewport } from 'next';
import Link from 'next/link'

import styles from '@/styles/Home.module.css'
import ButtonAppBar from '@/components/appBar';
import StatsPage from '@/components/compare/comparePage';

export const metadata: Metadata = {
    title: 'UA',
    description: 'Compare cities for Urban Analyst',
    icons: '/ua.ico',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
}

export default function Home() {

    const buttonTxt = [
        "home",
        "summarise",
        "map",
        "transform",
        "about"
    ]

    return (
        <>
            <ButtonAppBar text={buttonTxt} />
            <StatsPage />

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
            </main>
        </>
    )
}
