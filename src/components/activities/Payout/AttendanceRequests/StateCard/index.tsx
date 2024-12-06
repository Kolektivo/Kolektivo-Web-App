'use client'

import { Box, CardContent, Divider } from '@mui/material'
import ItemsCard from '@/components/common/cards/ItemsCard'
import { type AttendanceRequest } from '@/types/activities'
import AttendanceRequestCard from '@/components/activities/Payout/AttendanceRequests/Card'

type Props = {
  requests: AttendanceRequest[]
  setRequests: React.Dispatch<React.SetStateAction<AttendanceRequest[]>>
}

export default function AttendanceRequestsStateCard({ requests, setRequests }: Props) {
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
    <ItemsCard title="Attendees">
      {requests?.map((_, index) => (
        <Box key={index}>
          <Divider />
          <CardContent>
            <AttendanceRequestCard index={index} requests={requests} setRequests={setRequests} />
          </CardContent>
        </Box>
      ))}
    </ItemsCard>
  )
}
