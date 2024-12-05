import { type AttendanceRequest } from '@/types/activities'
import { Stack, Typography } from '@mui/material'
import React, { type ReactNode } from 'react'

type Props = {
  request: AttendanceRequest
  children: ReactNode
}
export default function DeniedRequestCard({ request, children }: Props) {
  return (
    <div>
      <Stack gap="16px">
        <Typography variant="h3">{request.user}</Typography>
        {children}
      </Stack>
    </div>
  )
}
