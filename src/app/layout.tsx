import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import LeadPopup from '@/components/ui/LeadPopup'
import WhatsAppWidget from '@/components/ui/WhatsAppWidget'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'ASF Health & Fitness | Performance for Entrepreneurs',
  description: 'Built for entrepreneurs and business leaders to sustain success through health and fitness.',
  icons: {
    icon: '/logoasf.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased text-dark bg-white`}>
        <LenisProvider>
          {children}
          <LeadPopup />
          <WhatsAppWidget />
        </LenisProvider>
      </body>
    </html>
  )
}
