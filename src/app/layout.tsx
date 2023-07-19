import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppProvider } from '@/context/appContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Where in the world',
  description: 'Get general information about any country',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
