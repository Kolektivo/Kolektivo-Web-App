import { Box, Button, Card, CardContent, Icon, Stack, Typography } from '@mui/material'
import { type MouseEventHandler, type ReactElement } from 'react'

const ActionCard = ({
  icon,
  title,
  description,
  textButton,
  isSecondary = false,
  onClickButton,
}: {
  icon: string
  title: string
  description: string
  textButton: string
  isSecondary?: boolean
  onClickButton?: MouseEventHandler<HTMLButtonElement> | undefined
}): ReactElement => {
  return (
    <Card>
      <CardContent>
        <Stack gap={3}>
          <Icon color="primary" sx={{ fontSize: '32px' }}>
            {icon}
          </Icon>
          <Typography variant="h2">{title}</Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
          <Box>
            <Button variant="contained" onClick={onClickButton} color={isSecondary ? 'secondary' : 'primary'}>
              {textButton}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ActionCard
