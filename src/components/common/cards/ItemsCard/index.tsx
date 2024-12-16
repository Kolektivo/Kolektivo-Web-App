import { Card, CardActions, CardHeader, Typography } from '@mui/material'
import React, { type ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  actions?: ReactNode
  headerAction?: ReactNode
}

export default function ItemsCard({ title, children, actions, headerAction }: Props) {
  return (
    <Card>
      <CardHeader
        title={title}
        action={headerAction}
      />
      {children}
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  )
}
