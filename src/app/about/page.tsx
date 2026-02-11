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

export default function Home(): JSX.Element {

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
                            a&nbsp;
                            <Link href="/summarise">
                                &ldquo;Summarise&rdquo; page
                            </Link>
                            &nbsp;that provides brief
                            descriptions of the properties of any chosen city,
                            and identifies the best potential city for
                            transformation.
                        </li>
                        <li>
                            a&nbsp;
                            <Link href="/compare">
                                &ldquo;Compare&rdquo; view
                            </Link>
                            &nbsp;that compares the properties of different cities in
                            terms of each variable measured by Urban Analyst.
                        </li>
                        <li>
                            a&nbsp;
                            <Link href="/map">
                                &ldquo;Map&rdquo; view
                            </Link>
                            , to enable various properties
                            of individual cities to be visualised as interactive
                            maps, and
                        </li>
                        <li>
                            a&nbsp;
                            <Link href="/transform">
                                &ldquo;Transform&rdquo; view
                            </Link>
                            &nbsp;that enables cities to be
                            transformed to become like any other city.
                        </li>
                    </ol>
                </div>
                <div className={styles.centerNormal}>
                    <p className="text-center"> 
                        Full details are provided&nbsp;
                        <Link
                            href="https://docs.urbananalyst.city"
                            rel="noopener noreferrer"
                        >
                            in the documentation</Link>.
                    </p>
                </div>

                <div className={styles.leftMed}>
                    <p className="text-center">
                        Who made this?
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        <Link
                            href="https://github.com/mpadge"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Mark Padgham
                        </Link>
                        , along with all of the other contributors to the
                        <Link
                            href="https://github.com/UrbanAnalyst"
                            rel="noopener noreferrer"
                        >
                            &nbsp;open-source software which drives it.
                        </Link>.
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
                        <Link
                            href="https://prototypefund.de"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            prototypefund
                        </Link>
                        , as part of their &#8202;
                        <Link
                            href="https://prototypefund.de/project/urban-transport-analyst-uta/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >twelfth </Link>
                        and &#8202;
                        <Link
                            href="https://prototypefund.de/project/urban-analyst/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            fourteenth funding rounds
                        </Link>.
                    </p>
                </div>

                <div className={styles.leftMed}>
                    <p className="text-center">
                        Want to know more?
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        Email &#8202;
                        <Link
                            href="mailto:info@urbananalyst.city"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            info@urbananalyst.city
                        </Link>
                        .
                    </p>
                </div>

            </main>
        </>
    )
}
