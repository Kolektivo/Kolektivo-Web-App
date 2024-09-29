import { type ReactElement } from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const HeaderCard = ({ title, subtitle }: { title: string; subtitle?: string }): ReactElement => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h2">{title}</Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary" marginTop={2}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default HeaderCard
