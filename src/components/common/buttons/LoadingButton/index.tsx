import { type ReactElement } from 'react'
import { Box, Button, type ButtonProps, CircularProgress } from '@mui/material'

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
  disabledMargin?: boolean
}

const LoadingButton = ({ loading, disabledMargin = false, children, ...props }: LoadingButtonProps): ReactElement => {
  props.disabled = props.disabled || loading

  return (
    <Box sx={{ m: disabledMargin ? 0 : 1, position: 'relative' }}>
      <Button {...props}>{children}</Button>
      {loading && (
        <CircularProgress
          size={24}
          thickness={6}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  )
}

export default LoadingButton
