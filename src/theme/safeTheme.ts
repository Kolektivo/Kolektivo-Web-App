'use client'

import { type Theme, type PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import typography from './typography'
import lightPalette from './lightPalette'
import { materialSymbolsOutlined } from '@/theme/fonts'
import IconSelect from '@/components/common/inputs/select/IconSelect'
import CheckOff from '@/public/images/icons/checkbox/check-off.svg'
import CheckOn from '@/public/images/icons/checkbox/check-on.svg'

const spacing = 6

declare module '@mui/material/styles' {
  interface Palette {
    strongOrange: Palette['primary']
  }

  interface PaletteOptions {
    strongOrange?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Icon' {
  interface IconPropsColorOverrides {
    strongOrange: true
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    upcomingChip: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    warningButton: true
  }
}

declare module '@mui/material/Box' {
  interface BoxPropsColorOverrides {
    bannerLightGray: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    outlinedGray: true
  }
}

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
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
      },
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
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: spacing * 4,
            borderBottom: `1px solid ${colors.border.main}`,
          },
        },
      },
      MuiCardActions: {
        defaultProps: {
          disableSpacing: true,
        },
        styleOverrides: {
          root: {
            gap: '16px',
            padding: spacing * 4,
            borderTop: `1px solid ${colors.border.main}`,
            justifyContent: 'end',
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
          variant: 'standard',
          disableAnimation: true,
          sx: {
            position: 'relative',
          },
        },
        styleOverrides: {
          root: {
            variants: [
              {
                props: { variant: 'standard' },
                style: {
                  fontSize: '18px',
                  fontWeight: 700,
                  color: colors.text.primary,
                  transform: 'scale(1) !impmortant',
                  marginBottom: spacing * 2,
                },
              },
              {
                props: { variant: 'filled' },
                style: {
                  fontSize: '12px',
                  transform: 'scale(1) !impmortant',
                  lineHeight: '15px',
                  marginBottom: '4px',
                },
              },
            ],
          },
          shrink: {
            transform: 'scale(1) !important',
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          inputRoot: {
            padding: `0 ${spacing * 2}px !important`,
          },
          input: {
            padding: `${spacing * 2}px !important`,
          },
        },
      },
      MuiChip: {
        styleOverrides: { root: { fontWeight: '700' } },
      },
      MuiInputBase: {
        styleOverrides: {
          multiline: {
            padding: '0 !important',
            minHeight: '144px',
            alignItems: 'start',
          },
          root: {
            variants: [
              {
                props: { error: true },
                style: {
                  '&::after': {
                    content: '"error"',
                    display: 'block',
                    fontFamily: materialSymbolsOutlined.style.fontFamily,
                    fontSize: '24px',
                    fontVariationSettings: '"FILL" 1',
                    color: colors.error.main,
                    padding: spacing * 2,
                  },
                },
              },
            ],
          },
        },
      },
      MuiOutlinedInput: {
        defaultProps: {
          fullWidth: true,
          notched: false,
        },
        styleOverrides: {
          input: {
            padding: spacing * 2,
            ':-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 100px ${colors.background.default} inset`,
              WebkitTextFillColor: colors.text.primary,
            },
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
          root: {
            variants: [
              {
                props: { variant: 'outlinedGray' },
                style: {
                  padding: '11px 40px',
                  textTransform: 'none',
                  border: '1px solid',
                  borderColor: colors.text.disabled,
                },
              },
            ],
          },
          contained: {
            padding: '17px 40px',
            textTransform: 'capitalize',
          },
          text: {
            padding: '17px 40px',
            textTransform: 'capitalize',
            color: colors.text.primary,
          },
          sizeSmall: {
            padding: '9px 11px',
            fontSize: '14px',
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
      MuiRadio: {
        defaultProps: {
          icon: CheckOff(),
          checkedIcon: CheckOn(),
          sx: {
            padding: 0,
            '& .MuiSvgIcon-root': {
              fontSize: 30,
            },
          },
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
      MuiDialog: {
        defaultProps: {
          PaperProps: {
            elevation: 0,
            sx: {
              minWidth: 472,
            },
          },
          slotProps: {
            backdrop: {
              sx: {
                backgroundColor: '#000000B2',
              },
            },
          },
        },
      },
      MuiDialogActions: {
        defaultProps: {
          sx: {
            padding: 4,
            paddingTop: 0,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            lineHeight: 'normal',
            variants: [
              {
                props: { variant: 'outlined' },
                style: { borderColor: colors.error.main },
              },
            ],
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            borderColor: `${colors.background.default} !important`,
          },
        },
      },
      // MuiDateCalendar: {
      //   styleOverrides: {
      //     root: {
      //       color: '#bbdefb',
      //       borderRadius: '8px',
      //       borderWidth: '0px',
      //       borderColor: '#2196f3',
      //       border: '0px solid',
      //       backgroundColor: '#0d47a1',
      //     },
      //     IconSelect: {
      //     }
      //   },
      // },
    },
  })
}

export default createSafeTheme
