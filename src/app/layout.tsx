import localFont from 'next/font/local'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next'
import '@/styles/globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';


const junctionFont = localFont({ src: './junction-light.woff' })

export const metadata: Metadata = {
    title: 'Urban Analyst',
    description: 'Urban Analyses for the World',
    metadataBase: new URL('https://urbananalyst.city'),
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        title: 'Urban Analyst',
        description: 'Urban Analyses for the World',
        url: 'https://urbananalyst.city',
        siteName: 'Urban Analyst',
        images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Urban Analyst' }],
        locale: 'en_US',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
        children: React.ReactNode
    }): JSX.Element {
    return (
        <html lang="en">
            <body className={junctionFont.className}>
                <AppRouterCacheProvider>
                    {children}
                </AppRouterCacheProvider>
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    )
}
