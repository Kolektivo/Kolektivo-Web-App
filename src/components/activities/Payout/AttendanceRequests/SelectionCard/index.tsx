'use client'

import { Box, Button, CardContent, Divider } from '@mui/material'
import ItemsCard from '@/components/common/cards/ItemsCard'
import { type AttendanceRequest } from '@/types/activities'
import AttendanceRequestCard from '@/components/activities/Payout/AttendanceRequests/Card'
import Link from 'next/link'
import { type ReactNode } from 'react'

type Props = {
  requests: AttendanceRequest[]
  setRequests: React.Dispatch<React.SetStateAction<AttendanceRequest[]>>
  children: ReactNode
}

export default function AttendanceRequestsSelectionCard({ requests, setRequests, children }: Props) {
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
    <ItemsCard
      title="Attendee"
      actions={
        <>
          <Link href="/activities">
            <Button>Go Back</Button>
          </Link>
          {children}
        </>
      }
    >
      {requests?.map((_, index) => (
        <Box key={index}>
          <Divider />
          <CardContent>
            <AttendanceRequestCard index={index} requests={requests} setRequests={setRequests} selectable />
          </CardContent>
        </Box>
      ))}
    </ItemsCard>
  )
}
