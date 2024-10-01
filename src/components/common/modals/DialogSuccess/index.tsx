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

interface DialogSuccessProps extends DialogProps {
  title: string
  description?: string
  buttonText?: string
  onClickButton?: MouseEventHandler
}

const DialogSuccess = ({
  title,
  description,
  buttonText = 'Continue',
  onClickButton,
  ...props
}: DialogSuccessProps): ReactElement => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <Stack gap={2} justifyContent="center">
          <Box textAlign="center">
            <Icon sx={{ fontSize: 94, lineHeight: '94px', color: 'success.light' }}>check_circle</Icon>
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
        <Button variant="contained" onClick={onClickButton} fullWidth>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogSuccess
