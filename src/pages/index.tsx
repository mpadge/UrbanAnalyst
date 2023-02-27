import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>UTA</title>
        <meta name="description" content="Urban Transport Analyses for the world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/uta.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Urban Transport Analyst
          </p>
          <div>
            <a
              href="https://github.com/UrbanAnalyst"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/uta.svg"
                alt="UTA Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.centerBig}>
          <p className="text-center">
          An open source platform for analysing and comparing urban transport systems across the world.
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
                Click anywhere here to see maps ...
            </p>
            <p className={styles.cardText}>
            Interactive maps of all cities analysed to date. Transport values
            are derived for every street intersection in a city by calculating
            fastest times taken to travel to every other point in the city using
            specified single or multiple modes of transport, and calculating the
            average time needed to travel 10km from each point. The following
            variables are displayed:
            </p>

            <p className={styles.cardText}>
            1. <i>Social</i> - Representative socio-demographic data such as
            unemployment rates, deprivation indices, inequality indices, or
            other indices of social disadvantage.
            </p>
            <p className={styles.cardText}>
            2. <i>Transport Absolute</i> - The average of the time taken to travel
            10km from every point in a city using multi-modal transporting via
            any combination of walking, bicycling, or public transport. Values
            are specified in minutes. Lower values represent faster transport,
            and are always better.
            </p>
            <p className={styles.cardText}>
            3. <i>Transport Relative</i> - The ratio of absolute travel times
            described above to times for equivalent journeys taken with private
            automobile. Ratios less than one represent multi-modal transport
            being faster than automobile transport. These ratios provide
            arguably the most direct insight into the propensity or incentive to
            use public transport: The faster that is in relation to equivalent
            automobile times, the more likely people will be to use it.
            </p>
            <p className={styles.cardText}>
            4. <i>Combined Absolute</i> - The combination of absolute multi-modal
            travel times and the social index transformed to the same scale of
            minutes per 10km of travel. Low values of this index reflect an
            advantageous combination of good transport provision and low
            socio-demographic disadvantage. High values indicate regions within
            a city negatively affected by slow transport and pronounced
            socio-demographic disadvantage.
            </p>
            <p className={styles.cardText}>
            5. <i>Combined Relative</i> - The combination of multi-modal travel
            times relative to equivalent automobile times, and the social index
            transformed to the same scale, so that values of one reflect average
            social disadvantage and multi-modal travel times the same as
            equivalent automobile times. Low values reflect low
            socio-demographic disadvantage, and public transport times being
            comparable with, or better than, equivalent automobile travel times.
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
                Click anywhere here to see stats ...
            </p>
            <p className={styles.cardText}>
            The statistics, or &quot;stats&quot;, section shows average values for every
            UTA city for each variable shown in the maps. This enables the
            overall values for any city to be compared with values for all other
            cities. Social indices are not summarised in this section, because
            they are effectively arbitrary for each city and can not be sensibly
            combined or compared. The combined indices transform those arbitrary
            indices to the same scale as the transport layers, and thus do
            provide direct insight into differences between cities.
            </p>
            <h2 className={inter.className}>
              The UTA Index
            </h2>
            <p className={styles.cardText}>
            The initial statistic on the &quot;stats&quot; page is the &quot;UTA
            Index&quot;, which reflects the main aim of UTA to provide insight
            into how and where transport systems actively combat social
            inequality.
            </p>
            <p className={styles.cardText}>
            This index is also calculated in &quot;absolute&quot;
            and &quot;relative&quot; forms, and reflects the extent to which
            transport systems work with or against the socio-demographic
            disadvantage. Cites in which poor transport combines with social
            disadvantage, while good transport combines with social advantage,
            will have &quot;Combined&quot; statistics which are more widely
            distributed than transport indices alone.
            </p>
            <p className={styles.cardText}>
            The UTA index measures the
            extent to which combination of transport and social indices
            decreases or increases the overall distribution of social
            disadvantage alone. As with all other indices, low values are good.
            Values less than one indicate transport systems effectively
            counter-balancing socio-demographic disadvantage, while values
            greater than one indicate transport systems which exacerbate social
            disadvantage.
            </p>
          </Link>

        </div>
      </main>
    </>
  )
}
