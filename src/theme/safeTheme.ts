import type { Theme, PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import typography from './typography'
import lightPalette from './lightPalette'

const createSafeTheme = (mode: PaletteMode): Theme => {
  return createTheme({
    palette: {
      mode,
      ...lightPalette,
    },
    typography,
  })
}

export default createSafeTheme
