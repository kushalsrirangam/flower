import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import BackgroundScene from '@/components/BackgroundScene'
import Loader from '@/components/Loader'
import Cursor from '@/components/Cursor'
import Nav from '@/components/Nav'

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AARKA IMPORTS LLC — Premium Floral',
  description: 'Wholesale premium flowers imported from around the world. Based in Frisco, TX.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
        <Loader />
        <BackgroundScene />
        <Cursor />
        <div id="progress" />
        <Nav />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  )
}
