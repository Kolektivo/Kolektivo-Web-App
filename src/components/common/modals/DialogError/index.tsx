import { type MouseEventHandler, type ReactElement } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  Stack,
  Typography,
  type DialogProps,
} from '@mui/material'

interface DialogErrorProps extends DialogProps {
  title: string
  description?: string
  buttonText?: string
  onClickButton?: MouseEventHandler
}

const DialogError = ({
  title,
  description,
  buttonText = 'Continue',
  onClickButton,
  ...props
}: DialogErrorProps): ReactElement => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <Stack gap={2} justifyContent="center">
          <Box textAlign="center">
            <Icon sx={{ fontSize: 94, lineHeight: '94px', color: 'error.main' }}>error</Icon>
          </Box>
          <Typography variant="h2" textAlign="center">
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" color="text.secondary" textAlign="center">
              {description}
            </Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClickButton} fullWidth>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogError
