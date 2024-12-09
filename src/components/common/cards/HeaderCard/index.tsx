import { type ReactNode, type ReactElement } from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const HeaderCard = ({
  title,
  subtitle,
  subtitleComponent,
  align,
}: {
  title: string
  subtitle?: string
  subtitleComponent?: ReactNode
  align?: 'center'
}): ReactElement => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h2" align={align}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary" marginTop={2} align={align}>
            {subtitle}
          </Typography>
        )}
        {subtitleComponent}
      </CardContent>
    </Card>
  )
}

export default HeaderCard
