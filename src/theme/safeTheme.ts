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
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.background.paper,
            color: colors.secondary.contrastText,
            borderBottom: `1px solid ${colors.secondary.dark}`,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            gap: spacing * 2,
            padding: `${spacing * 3}px ${spacing * 4}px`,
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 'auto',
          },
        },
      },
      MuiListItemText: {
        defaultProps: {
          primaryTypographyProps: {
            fontWeight: 700,
            color: colors.text.secondary,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderColor: 'red',
          },
        },
      },
    },
  })
}

export default createSafeTheme
