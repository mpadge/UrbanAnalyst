import Image from "next/image"
import Link from 'next/link'
import type { Metadata, Viewport } from 'next';

import styles from '@/styles/about.module.css'
import ButtonAppBar from '@/components/appBar';

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

    const buttonTxt = [
        "home",
        "summarise",
        "compare",
        "map",
        "transform",
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

                <div className={styles.leftMed}>
                    <p className="text-center">
                        What is this?
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        Urban Analyst is a platform for interactive visualisation of
                        the properties of cities, including transport systems and
                        socio-demographic conditions.  The platform offers
                    </p>
                </div>
                <div className={styles.centerNormal}>
                    <ol>
                        <li>
                            a &ldquo;Summarise&rdquo; page that provides brief
                            descriptions of the properties of any chosen city,
                            and identifies the best potential city for
                            transformation.
                        </li>
                        <li>
                            a &ldquo;Compare&rdquo; view that compares the
                            properties of different cities in terms of each variable
                            measured by Urban Analyst.
                        </li>
                        <li>
                            a &ldquo;Map&rdquo; view, to enable various properties
                            of individual cities to be visualised as interactive
                            maps, and
                        </li>
                        <li>
                            a &ldquo;Transform&rdquo; view that enables cities to be
                            transformed to become like any other city.
                        </li>
                    </ol>
                </div>
                <div className={styles.centerNormal}>
                    <p className="text-center"> 
                        Full details are provided&nbsp;
                        <a
                            href="https://docs.urbananalyst.city"
                            rel="noopener noreferrer"
                        >
                            in the documentation</a>.
                    </p>
                </div>

                <div className={styles.leftMed}>
                    <p className="text-center">
                        Who made this?
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        <a
                            href="https://github.com/mpadge"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Mark Padgham
                        </a>
                        , along with all of the other contributors to the
                        <a
                            href="https://github.com/UrbanAnalyst"
                            rel="noopener noreferrer"
                        >
                            &nbsp;open-source software which drives it.
                        </a>.
                    </p>
                </div>

                <div className={styles.leftMed}>
                    <p className="text-center">
                        Who funds this?
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        Previous funding has been provided by
                        the German Government&#39;s &#8202;
                        <a
                            href="https://prototypefund.de"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            prototypefund
                        </a>
                        , as part of their &#8202;
                        <a
                            href="https://prototypefund.de/project/urban-transport-analyst-uta/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >twelfth </a>
                        and &#8202;
                        <a
                            href="https://prototypefund.de/project/urban-analyst/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            fourteenth funding rounds
                        </a>.
                    </p>
                </div>
            </main>
        </>
    )
}
