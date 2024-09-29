import { Card, CardContent, Stack, Typography } from '@mui/material'
import React, { type ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}

export default function ItemsCard({ title, children }: Props) {
  return (
    <Card>
      <CardContent style={{ padding: '0px' }}>
        <Stack padding="24px">
          <Typography variant="h2">{title}</Typography>
        </Stack>
        {children}
      </CardContent>
    </Card>
  )
}
