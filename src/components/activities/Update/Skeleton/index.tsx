import { Card, CardContent, Divider, Skeleton, Stack } from '@mui/material'
import React from 'react'

export default function ActivityUpdateSekelton() {
  return (
    <Card>
      <CardContent>
        <Stack gap="48px">
          <Skeleton variant="rectangular" width={285} height={160} sx={{ borderRadius: '12px' }} />
          <Stack gap={1}>
            <Skeleton width={285} height={40} />
            <Skeleton height={80} />
          </Stack>
          <Stack gap="16px">
            <Stack gap={1}>
              <Skeleton width={285} height={40} />
              <Stack direction="row" width="100%" gap={2}>
                <Skeleton width={160} height={80} />
                <Skeleton width={160} height={80} />
                <Skeleton width={160} height={80} />
              </Stack>
            </Stack>
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
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  )
}
