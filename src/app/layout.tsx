import type { Metadata } from 'next'
import Providers from './provider'
import { lato, materialSymbolsOutlined, poppins } from '@/theme/fonts'

export const metadata: Metadata = {
  title: 'Kolektivo',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
