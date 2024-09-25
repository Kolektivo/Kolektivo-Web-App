import type { Theme, PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import typography from './typography'

const createSafeTheme = (mode: PaletteMode): Theme => {
  return createTheme({
    palette: {
      mode,
    },
    typography,
  })
}

export default createSafeTheme
