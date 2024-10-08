import { Card, CardContent, type CardProps, Stack, Typography } from '@mui/material'
import React from 'react'

interface InfoCardProps extends CardProps {
  title: string
  information: string
}

export default function InfoCard({ title, information, ...props }: InfoCardProps) {
  return (
    <Card {...props}>
      <CardContent>
        <Stack gap={4}>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="body1">{information}</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
