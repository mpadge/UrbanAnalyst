import localFont from 'next/font/local'
import type { Metadata } from 'next'
import '@/styles/globals.css'

const junctionFont = localFont({ src: './junction-light.woff' })

export const metadata: Metadata = {
  title: 'UA',
  description: 'Urban Analyses for the World',
  icons: {
    icon: '/icon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={junctionFont.className}>{children}</body>
    </html>
  )
}
