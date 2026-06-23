import type { Metadata, Viewport } from 'next';
import Link from 'next/link'
import styles from '@/styles/services.module.css';
import ButtonAppBar from '@/components/appBar';
import ContactForm from '@/components/services/contactForm';

export const metadata: Metadata = {
    title: 'UA — Services',
    description: 'Urban Analyst analysis and city sites for any city in the world',
    icons: '/ua.ico',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
}

export default function ServicesPage(): JSX.Element {

    const buttonTxt = ["home", "summarise", "compare", "map", "transform", "about"]

    return (
        <>
            <ButtonAppBar text={buttonTxt} />
            <main className={styles.main}>

                <div className={styles.centerBig}>
                    <p>Urban Analyst for Your City</p>
                </div>

                <div className={styles.centerNormal}>
                    <p>
                        Urban Analyst can analyse any city in the world, and
                        deliver a full-resolution hosted site like&nbsp;
                        <Link
                            href="https://demo.urbananalyst.city"
                            rel="noopener noreferrer"
                        >
                        demo.urbananalyst.city
                        </Link>
                        , but at
                        &nbsp;<em>&lt;yourcity&gt;.urbananalyst.city</em>.
                        The same engine that powers the main
                        platform can also be directed at almost any question involving
                        urban movement, accessibility, or the spatial distribution
                        of urban activity — from transport planning to retail site
                        selection to public health.
                    </p>
                </div>

                <div className={styles.gridThree}>

                    <div className={styles.card}>
                        <h2>City Platform</h2>
                        <p>
                            The full Urban Analyst pipeline run on your city, with a
                            hosted site showing results at full street-network resolution.
                        </p>
                        <ul>
                            <li>Complete standard variable set — travel times, accessibility, social inequality, and more</li>
                            <li>Aggregate and full-resolution interactive maps</li>
                            <li>Public or private site at <em>&lt;yourcity&gt;.urbananalyst.city</em></li>
                            <li>Benchmarked against all other UA cities</li>
                            <li>Custom data layers available as an add-on</li>
                        </ul>
                        <a className={styles.cardCta} href="#contact">Get in touch &#8628;</a>
                    </div>

                    <div className={styles.card}>
                        <h2>Bespoke Analytics</h2>
                        <p>
                            Custom routing queries for any question expressible as urban
                            movement, accessibility, or spatial distribution — scoped
                            and quoted per engagement.
                        </p>
                        <ul>
                            <li>Categorical routing: proportion of all city paths through any mapped feature category</li>
                            <li>Distance aggregations: mean or median distance to any point category</li>
                            <li>Gradient-aware routing</li>
                            <li>Centrality-based movement proxies, calibrated to global datasets</li>
                            <li>Data delivery with or without a hosted site</li>
                        </ul>
                        <a className={styles.cardCta} href="#contact">Get in touch &#8628;</a>
                    </div>

                    <div className={styles.card}>
                        <h2>Longitudinal</h2>
                        <p>
                            Repeated analysis runs at agreed intervals, turning Urban
                            Analyst into a live monitor of how your city changes over time.
                        </p>
                        <ul>
                            <li>Time-series visualisation of any variable</li>
                            <li>Scenario comparison — model infrastructure changes before they happen</li>
                            <li>Ongoing benchmarking against other UA cities</li>
                            <li>Builds on City Platform or Bespoke Analytics</li>
                        </ul>
                        <a className={styles.cardCta} href="#contact">Get in touch &#8628;</a>
                    </div>

                </div>

                <div className={styles.centerBig}>
                    <p>Get in Touch</p>
                </div>

                <div className={styles.centerNormal}>
                    <p>
                        Tell us about your city and what you need. We&apos;ll follow up
                        with a scope and quote.
                    </p>
                </div>

                <section className={styles.formSection}>
                    <ContactForm />
                    <p className={styles.formNote}>
                        Commercial integration licences for the GPL-3 analytical
                        components are also available on request.
                    </p>
                </section>

            </main>
        </>
    );
}
