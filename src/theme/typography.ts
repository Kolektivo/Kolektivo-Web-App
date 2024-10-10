import type { TypographyOptions } from '@mui/material/styles/createTypography'

const typography: TypographyOptions = {
  fontFamily: 'var(--font-poppins), var(--font-lato)',
  h1: {
    fontFamily: 'var(--font-poppins)',
    fontWeight: 500,
    fontSize: '30px',
    lineHeight: 'normal',
  },
  h2: {
    fontFamily: 'var(--font-poppins)',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '24px',
  },
  h3: {
    fontFamily: 'var(--font-poppins)',
    fontWeight: 500,
    fontSize: '20px',
  },
  h4: {
    fontFamily: 'var(--font-lato)',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19.2px',
    letterSpacing: '0.5px',
  },
  h5: {
    lineHeight: 1,
  },
  subtitle1: {
    fontFamily: 'var(--font-lato)',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21.6px',
    letterSpacing: '0.5px',
  },
  subtitle2: {
    fontFamily: 'var(--font-lato)',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19.2px',
    letterSpacing: '0.5px',
  },
  body1: {
    fontFamily: 'var(--font-lato)',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22.4px',
  },
  body2: {
    fontFamily: 'var(--font-lato)',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '14px',
  },
  button: {
    fontFamily: 'var(--font-lato)',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '14px',
    letterSpacing: '0.5px',
  },
  caption: {
    fontFamily: 'var(--font-lato)',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22.4px',
  },
  overline: {
    fontFamily: 'var(--font-lato)',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '16px',
    textTransform: 'none',
  },
}

export default typography
