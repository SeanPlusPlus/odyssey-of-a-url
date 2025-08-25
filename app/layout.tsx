import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://odyssey-of-a-url.vercel.app'),
  title: 'Odyssey of a URL',
  description: 'A deep dive into what happens when you hit enter in the browser',
  icons: {
    icon: '/favicon.ico', // for browsers
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png', // optional if you add one later
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Odyssey of a URL',
    title: 'Odyssey of a URL',
    description: 'A deep dive into what happens when you hit enter in the browser',
    images: [
      {
        url: '/odyssey.png', // resolves to absolute via metadataBase
        width: 1200,
        height: 1200,
        alt: 'Odyssey of a URL – binary sea voyage',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Odyssey of a URL',
    description: 'A deep dive into what happens when you hit enter in the browser',
    images: ['/odyssey.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
