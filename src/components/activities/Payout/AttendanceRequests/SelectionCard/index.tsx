'use client'

import { Box, CardContent, Divider } from '@mui/material'
import ItemsCard from '@/components/common/cards/ItemsCard'
import { type AttendanceRequest } from '@/types/activities'
import AttendanceRequestCard from '@/components/activities/Payout/AttendanceRequests/Card'

export default function AttendanceRequestsSelectionCard() {
  const attendanceRequests: AttendanceRequest[] = [
    {
      user: 'Luuk Weber',
      checkIn: '10:01AM',
      checkOut: '12:01AM',
      Poc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using. Helped Yolanda with the trash bag transportation to the nearest desp',
      PocImage: 'imagen',
    },
    {
      user: 'Jhonny Bobs',
      checkIn: '10:01AM',
      checkOut: '12:01AM',
      Poc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using. Helped Yolanda with the trash bag transportation to the nearest desp',
      PocImage: 'imagen',
    },
    {
      user: 'Yolanda Wiel',
      checkIn: '10:01AM',
      checkOut: '12:01AM',
      Poc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using. Helped Yolanda with the trash bag transportation to the nearest desp',
      PocImage: 'imagen',
    },
  ]
  if (!attendanceRequests)
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
    <ItemsCard title="Attendee">
      {attendanceRequests?.map((attendanceRequest, index) => (
        <Box key={index}>
          <Divider />
          <CardContent>
            <AttendanceRequestCard request={attendanceRequest} />
          </CardContent>
        </Box>
      ))}
    </ItemsCard>
  )
}
