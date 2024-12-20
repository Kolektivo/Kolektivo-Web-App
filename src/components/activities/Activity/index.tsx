import { Chip, Skeleton, Stack, Typography } from '@mui/material'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  id: string
  organization: string
  startDate: string
  timeLapse: string
  img: string
  title: string
  state: string
  stateColor: 'upcomingChip' | 'actionRequiredChip' | 'completedChip'
  hostId?: number
  redirectionPath?: string
  disableRedirect?: boolean
}

export default function ActivityComponent({
  id,
  organization,
  img,
  title,
  startDate,
  timeLapse,
  state,
  stateColor,
  redirectionPath,
  disableRedirect,
}: Props) {
  const formatDate = () => {
    const startDateIso = parseISO(startDate)
    const startFormattedDate = format(startDateIso, 'MMMM d')
    return `${startFormattedDate}, ${timeLapse}`
  }
  return (
    <Link
      href={`${disableRedirect || state == 'Completed' ? '' : `/activities/update/${id}`}${redirectionPath && state != 'Completed' ? redirectionPath : ''}`}
      style={{
        textDecoration: 'none',
        color: '#0F0F0F',
        cursor: `${(disableRedirect && !redirectionPath) || state == 'Completed' ? 'default' : 'pointer'}`,
      }}
    >
      <Stack direction="row" alignItems="center" gap="16px">
        {img ? (
          <Image src={img} alt={`Banner-${title}`} width={140} height={80} style={{ borderRadius: '12px' }} />
        ) : (
          <Stack
            width={140}
            height={80}
            sx={{ backgroundColor: '#F2F2F2', borderRadius: '12px' }}
            alignItems="center"
            justifyContent="center"
          >
            <Skeleton variant='rounded' width={140} height={132}/>
          </Stack>
        )}
        <Stack gap="5px">
          <Stack alignItems="center" direction="row" gap="8px">
            <Typography variant="h3">{title}</Typography>
            <Chip label={state} color={stateColor} />
          </Stack>
          <Typography variant="body1" color="text.secondary">
            {organization} • {formatDate()}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  )
}
