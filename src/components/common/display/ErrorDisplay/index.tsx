import { Box, Button, Card, CardContent, Icon, Stack, Typography } from '@mui/material'
import { type ReactElement } from 'react'

type ErrorDisplayProps = {
  title?: string
  description?: string
  onClickButton?: () => void
  buttonText?: string
}

const ErrorDisplay = ({
  title = 'An unexpected error occurred',
  description = 'Please try again later.',
  buttonText = 'Reload',
  onClickButton,
}: ErrorDisplayProps): ReactElement => {
  return (
    <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center">
      <Card>
        <CardContent>
          <Stack justifyContent="center" alignItems="center" gap={2}>
            <Box>
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
            {onClickButton && (
              <Box width="100%">
                <Button variant="contained" color="error" onClick={onClickButton} fullWidth>
                  {buttonText}
                </Button>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ErrorDisplay
