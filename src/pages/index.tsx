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
          <p className="text-center">
          An open source platform for analysing and comparing urban transport systems across the world.
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
            <p className={inter.className}>
              Find in-depth information about Maps!
            </p>
          </Link>

        </div>
      </main>
    </>
  )
}
