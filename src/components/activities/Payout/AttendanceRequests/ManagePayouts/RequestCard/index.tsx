import { type AttendanceRequest } from '@/types/activities'
import { Icon, Stack, Typography } from '@mui/material'
import React, { useMemo } from 'react'

type Props = {
  index: number
  requests: AttendanceRequest[]
  setRequests: React.Dispatch<React.SetStateAction<AttendanceRequest[]>>
}

export default function ManagePayoutRequestCard({ index, requests, setRequests }: Props) {
  const request = useMemo(() => requests[index], [requests, index])
  const handleCopyAddress = () => {
    if (navigator.clipboard && request.address) {
      navigator.clipboard
        .writeText(request.address)
        .then(() => {
          console.log('Address copied to clipboard:', request.address)
        })
        .catch((err) => {
          console.error('Failed to copy address:', err)
        })
    } else {
      console.warn('Clipboard API not supported or address is missing')
    }
  }
  return (
    <Stack gap="16px">
      <Typography variant="h3">{request.user}</Typography>
      <Stack direction="row" color="#7E7E7E" gap="4px" alignItems="center">
        <Typography>Address:</Typography>
        <Typography>{request.address}</Typography>
        <Icon
          onClick={handleCopyAddress}
          sx={{ display: 'flex', alignItems: 'center', fontSize: '16px', color: '#7E7E7E', cursor: 'pointer' }}
        >
          content_copy
        </Icon>
      </Stack>
    </Stack>
  )
}
