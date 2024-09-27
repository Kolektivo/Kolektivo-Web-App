import { Poppins, Lato } from 'next/font/google'
import localFont from 'next/font/local'

export const poppins = Poppins({ weight: ['500'], subsets: ['latin'], variable: '--font-poppins', display: 'swap' })

export const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato', display: 'swap' })

export const materialSymbolsOutlined = localFont({
  src: '../../public/fonts/material-symbols-outline.woff2',
  weight: '300',
  display: 'swap',
  variable: '--font-material-symbols-outline',
  adjustFontFallback: false,
})
