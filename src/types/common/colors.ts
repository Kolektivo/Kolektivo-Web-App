import { type IconPropsColorOverrides } from '@mui/material'
import { type OverridableStringUnion } from '@mui/types'

export type IconColor =
  | OverridableStringUnion<
      'disabled' | 'action' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
      IconPropsColorOverrides
    >
  | undefined
