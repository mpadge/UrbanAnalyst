import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '@/styles/about.module.css'
import Buttons from '@/components/buttons3'
import { ButtonProps} from '@/data/interfaces';

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
                    Urban Transport Analyst
                </p>
            </div>

            <div className={styles.leftMed}>
                <p className="text-center">
                    What is this?
                </p>
            </div>

            <div className={styles.centerSmall}>
                <p className="text-center">
                    Urban Transport Analyst is a platform for interactive
                    visualisation of urban transport systems, and their
                    relationship to socio-demographic conditions.
                </p>
            </div>

            <div className={styles.leftMed}>
                <p className="text-center">
                    Where do the values come from?
                </p>
            </div>

            <div className={styles.centerSmall}>
                <p className="text-center">
                    Socio-demographic data are provided by each city. These data
                    differ between cities, but always quantify some aspects of
                    social inequality or disadvantage, with values given within
                    defined spatial polygons.
                </p>
                <p className="text-center">
                    Transport data are derived using UTA&#39;s own open-source
                    routing software, primarily on GitHub at &nbsp;
                    <a
                    href="https://github.com/UrbanAnalyst"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    &quot;UrbanAnalyst&quot;
                    </a>
                    &nbsp; and &nbsp;
                    <a
                    href="https://github.com/atfutures"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    &quot;atfutures&quot;
                    </a>
                    . This software enables very efficient calculations of
                    multi-modal travel times between every single pair of street
                    intersections within a city. Results are then aggregated
                    into the polygons which define the socio-demographic data.

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
                    The German Government &nbsp;
                    <a
                    href="https://prototypefund.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    prototypefund
                    </a>
                    , as part of their &nbsp;
                    <a
                    href="https://prototypefund.de/project/urban-transport-analyst-uta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    twelfth funding round.
                    </a>
                </p>
            </div>
        </main>
    </>
    )
}
