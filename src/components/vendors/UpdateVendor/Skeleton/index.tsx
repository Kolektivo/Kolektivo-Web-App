import HeaderCard from '@/components/common/cards/HeaderCard'
import { Card, CardContent, Divider, Skeleton, Stack } from '@mui/material'
import { type ReactElement } from 'react'

const UpdateVendorSkeleton = (): ReactElement => {
  return (
    <Stack gap={4}>
      <HeaderCard title="Update Fields" />
      <Card>
        <CardContent>
          <Stack maxWidth={592} gap="48px">
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
    </Stack>
  )
}

export default UpdateVendorSkeleton
