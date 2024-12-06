import { type AttendanceRequest } from '@/types/activities'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Chip,
  Icon,
  Stack,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import DownIcon from '@/public/images/icons/down.svg?url'
import React, { useMemo } from 'react'

type Props = {
  index: number
  requests: AttendanceRequest[]
  setRequests: React.Dispatch<React.SetStateAction<AttendanceRequest[]>>
  selectable?: boolean
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
export default function AttendanceRequestCard({ index, requests, setRequests, selectable }: Props) {
  const request = useMemo<AttendanceRequest>(() => requests[index], [index, requests])
  const handleSelect = (event: React.MouseEvent) => {
    event.stopPropagation()
    const updatedRequests = [...requests]
    updatedRequests[index] = {
      ...requests[index],
      state: !requests[index].state,
    }
    setRequests(updatedRequests)
  }
  return (
    <Stack>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
          expandIcon={<Image src={DownIcon} alt="downIcon" />}
          sx={{ flexDirection: 'row-reverse', gap: '32px' }}
        >
          <Stack direction="row" gap="10px" justifyContent="space-between" alignItems="center" width="100%">
            <Stack gap="10px">
              <Typography variant="h3">{request.user}</Typography>
              <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'auto 1fr' }}>
                <Typography color="#7E7E7E">Check in:</Typography>
                <Typography color="#353535">{request.checkIn}</Typography>
                <Typography color="#7E7E7E">Check out:</Typography>
                <Typography color="#353535">{request.checkOut}</Typography>
              </div>
            </Stack>
            {selectable ? (
              <Checkbox
                onClick={handleSelect}
                {...label}
                icon={<Icon sx={{ fontSize: '32px' }}>radio_button_unchecked</Icon>}
                checkedIcon={<Icon sx={{ fontSize: '32px' }}>radio_button_checked</Icon>}
              />
            ) : (
              <Chip
                label={requests[index].state ? 'Completed' : 'Denied'}
                color={requests[index].state ? 'success' : 'deniedChip'}
              />
            )}
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ marginLeft: '32px' }}>
          <Stack direction="row">
            <Image style={{ visibility: 'hidden' }} src={DownIcon} alt="downIcon" />
            <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'auto 1fr' }}>
              <Typography color="#7E7E7E">PoC:</Typography>
              <Typography color="#353535">{request.Poc}</Typography>
              <Typography color="#7E7E7E">PoC Image:</Typography>
              <Box
                width={135}
                height={84}
                sx={{ backgroundColor: '#F2F2F2', borderRadius: '12px' }}
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Typography variant="subtitle2" textTransform="uppercase" color="#A9A9A9">
                  PoC Image
                </Typography>
              </Box>
              <Typography color="#353535">{}</Typography>
            </div>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  )
}
