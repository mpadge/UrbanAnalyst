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

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/uta.svg"
            alt="UTA Logo"
            width={180}
            height={37}
            priority
          />
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
            <p className={inter.className}>
              Interactive Urban Transport Analyst Maps
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
            <p className={inter.className}>
              Statistical summaries of UTA Cities
            </p>
          </Link>

        </div>
      </main>
    </>
  )
}
