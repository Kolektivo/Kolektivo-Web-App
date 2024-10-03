import type { Metadata } from 'next'
import Providers from './provider'
import { lato, materialSymbolsOutlined, poppins } from '@/theme/fonts'
import Layout from '@/components/common/Layout'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Kolektivo',
    default: 'Kolektivo',
  },
  description: 'Kolektivo Website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${lato.variable} ${materialSymbolsOutlined.variable}`}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
