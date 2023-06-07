import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Buttons from '@/components/buttons3'
import { ButtonProps} from '@/data/interfaces';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const buttons = {
        first: "maps",
        second: "stats",
        third: "about"
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
                    Analyse and compare cities across the world.
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

                <p className="text-center">
                    Both maps and statistics may be examined for single
                    variables, or for pairwise combinations of variables. Lower
                    values for all variables are always better, such as travel
                    times or rates of unemployment.  Pairwise combinations
                    provide insight into relationships bewteen different
                    properties of cities, such as between the various metrics of
                    transport provision and socio-demographic inequality.
                </p>
            </div>

            <div className={styles.grid}>

                <Link
                href="/maps"
                className={styles.card}
                rel="noopener noreferrer"
                >
                    <h2 className={inter.className}>
                        Maps <span>-&gt;</span>
                    </h2>
                    <p className={styles.cardText}>
                        Interactive maps of all cities analysed to date. Most
                        variables are displayed such the lower values reflect
                        better conditions, such as shorter travel times or lower
                        rates of unemployment.
                    </p>
                </Link>


                <Link
                href="/stats"
                className={styles.card}
                rel="noopener noreferrer"
                >
                    <h2 className={inter.className}>
                        Statistics <span>-&gt;</span>
                    </h2>
                    <p className={styles.cardText}>
                        The statistics, or &quot;stats&quot;, section shows average values for every
                        UA city for each variable shown in the maps. This enables the
                        overall values for any city to be compared with values for all other
                        cities.  </p>
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
                    </a>. Statistics for each intersection are weighted by
                    population densities, and aggregated within each city
                    polygon for maps, or across entire cities for statistics.
                </p>

                <p className="text-center">
                    Results for each city involve millions of public transport
                    routing calculations, and generally billions of routing
                    calculations through street networks. For example, results
                    for Berlin are derived from around 170 million public
                    transport routing calculations, and 170 billion street
                    network routing calculations. These are calculated using
                    Urban Analyst&apos;s own open-source software described in
                    <a className = {styles.textLink}
                    href="https://UrbanAnalyst.github.io/docs"
                    >&nbsp;the documentation pages
                    </a>. These enormous numbers of calculations enable Urban
                    Analyst to provide uniquely powerful insight into how people
                    move throughout cities.
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
                    Urban Analyst has received additional funding from the
                    German Government&apos;s
                    <a className = {styles.textLink}
                    href="https://prototypefund.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    >&nbsp;prototype fund
                    </a>, which will include some funding for adding cities.
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
