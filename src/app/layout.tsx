import type { Metadata } from 'next'
import Providers from './provider'

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
