import { Card, CardContent, Skeleton, Stack } from '@mui/material'
import React from 'react'

export default function AttendanceRequestCardSkeleton() {
  return (
    <Card>
      <CardContent sx={{ paddingLeft: '36px', paddingRight: '44px' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
          <Stack direction="row" gap="32px" alignItems="center">
            <Skeleton variant="circular" height={32} width={32} />
            <Stack gap="10px">
              <Skeleton height={32} width={120} />
              <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'auto 1fr' }}>
                <Skeleton height={12} width={80} />
                <Skeleton height={12} width={60} />
                <Skeleton height={12} width={80} />
                <Skeleton height={12} width={60} />
              </div>
            </Stack>
          </Stack>
          <Skeleton variant="circular" height={32} width={32} />
        </Stack>
      </CardContent>
    </Card>
  )
}
