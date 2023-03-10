import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Buttons from '@/components/buttons2'
import { ButtonProps} from '@/data/interfaces';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const buttons = {
        first: "maps",
        second: "stats"
    }

    return (
        <>
        <Head>
            <title>UTA</title>
            <meta name="description" content="Urban Transport Analyses for the world" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/uta.ico" />
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
                        Urban Transport Analyst
                        <Image
                        src="/uta.svg"
                        alt="UTA Logo"
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
                    Open source analyses of urban transport systems across the world.
                </p>
            </div>

            <div className={styles.centerMed}>
                <p className="text-center">
                    Urban Transport Analyst provides interactive maps of urban transport
                    systems, and relationships of these transport systems to
                    socio-demographic conditions.  UTA also provides statistical summaries
                    of all cities, including representation in the &quot;UTA Index&quot;, which
                    captures the extent to which transport systems effectively
                    counter-balance socio-demographic disadvantage.
                </p>

                <p className="text-center">
                    For all maps and statistical summaries, lower values are always
                    better. Transport statistics are based on times needed to travel a
                    given distance, so lower values reflect faster transport.
                    Socio-demographic statistics are metrics of social disadvantage such
                    as unemployment, for which again lower values are better.
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
                        Interactive maps of all cities analysed to date. Transport values
                        are derived for every street intersection in a city by calculating
                        times taken to travel to every other point in the city using
                        specified single or multiple modes of transport, and calculating the
                        average time needed to travel 10km from each point.
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
                        UTA city for each variable shown in the maps. This enables the
                        overall values for any city to be compared with values for all other
                        cities. The &quot;UTA Index&quot; measures the extent to which
                        transport exacerbates (high values) or counteracts (low
                        values) social inequality.  </p>
                </Link>

            </div>
        </main>
    </>
    )
}
