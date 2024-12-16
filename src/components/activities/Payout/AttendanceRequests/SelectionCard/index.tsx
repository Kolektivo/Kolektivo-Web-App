'use client'

import { Box, Button, CardContent, Divider, Typography } from '@mui/material'
import ItemsCard from '@/components/common/cards/ItemsCard'
import { type AttendanceRequest } from '@/types/activities'
import AttendanceRequestCard from '@/components/activities/Payout/AttendanceRequests/Card'
import Link from 'next/link'
import { type ReactNode } from 'react'
import AttendanceRequestCardSkeleton from '../Card/Skeleton'

type Props = {
  requests: AttendanceRequest[]
  setRequests: React.Dispatch<React.SetStateAction<AttendanceRequest[]>>
  children: ReactNode
}

export default function AttendanceRequestsSelectionCard({ requests, setRequests, children }: Props) {
  if (requests.length == 0)
    return (
      <ItemsCard
        title="Attendee"
        headerAction={
          <>
            <Typography variant="body1" color="#7E7E7E" sx={{ marginRight: '24px', paddingTop: '6px' }}>
              Select
            </Typography>
          </>
        }
        actions={
          <>
            <Link href="/activities">
              <Button>Go Back</Button>
            </Link>
            {children}
          </>
        }
      >
        {Array.from({ length: 2 })?.map((_, index) => (
          <Box key={index}>
            <Divider />
            <CardContent>
              <AttendanceRequestCardSkeleton />
            </CardContent>
          </Box>
        ))}
      </ItemsCard>
    )
  return (
    <ItemsCard
      title="Attendee"
      headerAction={
        <>
          <Typography variant="body1" color="#7E7E7E" sx={{ marginRight: '24px', paddingTop: '6px' }}>
            Select
          </Typography>
        </>
      }
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
