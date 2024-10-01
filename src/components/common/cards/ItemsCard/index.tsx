import { Card, CardContent, CardHeader } from '@mui/material'
import React, { type ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}

export default function ItemsCard({ title, children }: Props) {
  return (
    <Card>
      <CardContent style={{ padding: '0px' }}>
        <CardHeader title={title} />
        {children}
      </CardContent>
    </Card>
  )
}
