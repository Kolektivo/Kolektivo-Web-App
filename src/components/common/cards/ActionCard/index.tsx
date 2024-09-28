import { Box, Button, Card, CardContent, Icon, Stack, Typography } from '@mui/material'
import { type MouseEventHandler, type ReactElement } from 'react'
import Link from 'next/link'

const ActionCard = ({
  icon,
  title,
  description,
  textButton,
  isSecondary = false,
  href = '',
  onClickButton,
}: {
  icon: string
  title: string
  description: string
  textButton: string
  isSecondary?: boolean
  href?: string | undefined
  onClickButton?: MouseEventHandler<HTMLAnchorElement> | undefined
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
            <Link href={href} onClick={onClickButton}>
              <Button variant="contained" color={isSecondary ? 'secondary' : 'primary'}>
                {textButton}
              </Button>
            </Link>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ActionCard
