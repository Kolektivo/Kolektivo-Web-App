'use client'

import { type Theme, type PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import typography from './typography'
import lightPalette from './lightPalette'
import { materialSymbolsOutlined } from '@/theme/fonts'
import IconSelect from '@/components/common/inputs/select/IconSelect'

const spacing = 6

const createSafeTheme = (mode: PaletteMode): Theme => {
  const colors = lightPalette

  return createTheme({
    palette: {
      mode,
      ...colors,
    },
    cssVariables: true,
    typography,
    spacing,
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: spacing * 4,
          },
        },
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: spacing * 4,
          },
        },
      },
      MuiOutlinedInput: {
        defaultProps: {
          fullWidth: true,
        },
        styleOverrides: {
          input: {
            padding: spacing * 2,
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            margin: 0,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          contained: {
            padding: '17px 40px',
            textTransform: 'capitalize',
          },
          text: {
            padding: '17px 40px',
            textTransform: 'capitalize',
            color: colors.text.primary,
          },
        },
      },
      MuiIcon: {
        defaultProps: {
          baseClassName: materialSymbolsOutlined.className,
        },
        styleOverrides: {
          root: {
            lineHeight: '27px',
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: IconSelect,
        },
      },
    },
  })
}

export default createSafeTheme
