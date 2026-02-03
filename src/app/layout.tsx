import localFont from 'next/font/local'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next'
import '@/styles/globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';


const junctionFont = localFont({ src: './junction-light.woff' })

export const metadata: Metadata = {
    title: 'UA',
    description: 'Urban Analyses for the World',
    icons: {
        icon: '/favicon.ico',
    },
}

export default function RootLayout({
    children,
}: {
        children: React.ReactNode
    }) {
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
