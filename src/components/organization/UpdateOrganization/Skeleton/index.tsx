import { Card, CardContent, Divider, Skeleton, Stack } from '@mui/material'
import React from 'react'

export default function UpdateOrganizationSkeleton() {
  return (
    <Card>
      <CardContent>
        <Stack gap="48px">
          <Skeleton variant="rectangular" width={285} height={160} sx={{ borderRadius: '12px' }} />
          <Stack gap={1}>
            <Skeleton width={285} height={40} />
            <Skeleton height={80} />
          </Stack>
          <Stack gap={1}>
            <Skeleton width={285} height={40} />
            <Skeleton height={80} />
          </Stack>
          <Stack gap={1}>
            <Skeleton width={285} height={40} />
            <Skeleton height={80} />
          </Stack>
          <Stack gap={1}>
            <Skeleton width={285} height={40} />
            <Skeleton height={80} />
          </Stack>
          <Stack gap={1}>
            <Skeleton width={285} height={40} />
            <Skeleton width={600} height={300} />
          </Stack>
          <Stack gap={1}>
            <Skeleton width={285} height={40} />
            <Skeleton width={600} height={300} />
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  )
}
