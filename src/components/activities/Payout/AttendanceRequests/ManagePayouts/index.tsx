'use client'

import { Box, Button, CardContent, Divider } from '@mui/material'
import ItemsCard from '@/components/common/cards/ItemsCard'
import { type AttendanceRequest } from '@/types/activities'
import Link from 'next/link'
import { type ReactNode } from 'react'
import ManagePayoutRequestCard from '@/components/activities/Payout/AttendanceRequests/ManagePayouts/RequestCard'

type Props = {
  requests: AttendanceRequest[]
  setRequests: React.Dispatch<React.SetStateAction<AttendanceRequest[]>>
  children: ReactNode
}

export default function ManagePayoutsCard({ requests, setRequests, children }: Props) {
  if (!requests)
    return (
      <ItemsCard title="My Activities">
        {Array.from({ length: 3 }).map((_, index) => (
          <Box key={index}>
            <Divider />
            <Box paddingLeft={4}></Box>
          </Box>
        ))}
      </ItemsCard>
    )
  return (
    <ItemsCard title="Attendee" actions={children}>
      {requests?.map((_, index) => (
        <Box key={index}>
          <Divider />
          <CardContent>
            <ManagePayoutRequestCard requests={requests} setRequests={setRequests} index={index} />
          </CardContent>
        </Box>
      ))}
    </ItemsCard>
  )
}
