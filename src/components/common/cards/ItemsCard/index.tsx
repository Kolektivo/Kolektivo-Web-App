import { Card, CardActions, CardHeader } from '@mui/material'
import React, { type ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  actions?: ReactNode
}

export default function ItemsCard({ title, children, actions }: Props) {
  return (
    <Card>
      <CardHeader title={title} />
      {children}
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  )
}
