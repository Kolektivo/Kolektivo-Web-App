import { Skeleton, Stack } from '@mui/material'
import React from 'react'

export default function ActivitySkeleton() {
  return (
    <Stack direction="row" alignItems="center" gap="16px">
      <Skeleton width={140} height={132} />
      <Stack gap="5px">
        <Stack alignItems="center" direction="row" gap="8px">
          <Skeleton width={200} height={40} />
          <Skeleton width={100} height={44} />
        </Stack>
        <Skeleton width={220} height={32} />
      </Stack>
    </Stack>
  )
}
