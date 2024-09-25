import type { TypographyOptions } from '@mui/material/styles/createTypography'
import { Poppins, Lato } from 'next/font/google'

const poppins = Poppins({ weight: ['500'], subsets: ['latin'] })
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] })

const typography: TypographyOptions = {
  fontFamily: [poppins.style.fontFamily, lato.style.fontFamily].join(','),
  h1: {
    fontFamily: poppins.style.fontFamily,
    fontWeight: 500,
    fontSize: '30px',
    lineHeight: '30px',
  },
  h2: {
    fontFamily: poppins.style.fontFamily,
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '24px',
  },
  h3: {
    fontFamily: lato.style.fontFamily,
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21.6px',
    letterSpacing: '0.5px',
  },
  h4: {
    fontFamily: lato.style.fontFamily,
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19.2px',
    letterSpacing: '0.5px',
  },
  h5: {},
  h6: {},
  subtitle1: {
    fontFamily: lato.style.fontFamily,
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21.6px',
    letterSpacing: '0.5px',
  },
  subtitle2: {
    fontFamily: lato.style.fontFamily,
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19.2px',
    letterSpacing: '0.5px',
  },
  body1: {
    fontFamily: lato.style.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22.4px',
  },
  body2: {},
  button: {
    fontFamily: lato.style.fontFamily,
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '14px',
    letterSpacing: '0.5px',
  },
  caption: {
    fontFamily: lato.style.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22.4px',
  },
  overline: {
    fontFamily: lato.style.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '16px',
  },
}

export default typography
