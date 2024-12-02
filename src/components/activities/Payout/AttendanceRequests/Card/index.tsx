import { type AttendanceRequest } from '@/types/activities'
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import DownIcon from '@/public/images/icons/down.svg?url'
import React from 'react'

type Props = {
  request: AttendanceRequest
}
export default function AttendanceRequestCard({ request }: Props) {
  return (
    <Stack>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
          expandIcon={<Image src={DownIcon} alt="downIcon" />}
        >
          <Stack gap="10px">
            <Typography variant="h3">{request.user}</Typography>
            <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'auto 1fr' }}>
              <Typography color="#7E7E7E">Check in:</Typography>
              <Typography color="#353535">{request.checkIn}</Typography>
              <Typography color="#7E7E7E">Check out:</Typography>
              <Typography color="#353535">{request.checkOut}</Typography>
            </div>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'auto 1fr' }}>
            <Typography color="#7E7E7E">PoC:</Typography>
            <Typography color="#353535">{request.Poc}</Typography>
            <Typography color="#7E7E7E">PoC Image:</Typography>
            <Typography color="#353535">{request.PocImage}</Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    </Stack>
  )
}
