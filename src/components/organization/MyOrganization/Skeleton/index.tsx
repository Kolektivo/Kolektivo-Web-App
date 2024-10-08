import { Card, CardContent, Stack, Box, Typography, Skeleton, CardHeader } from '@mui/material'
import { type ReactElement } from 'react'

const MyOrganizationSkeleton = (): ReactElement => {
  return (
    <Card>
      <CardHeader title="My Organization" />
      <CardContent>
        <Stack gap={4}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            gap={2}
            alignItems={{ xs: 'center', sm: 'start' }}
          >
            <Skeleton variant="rounded" width={284} height={160} />
            <Box>
              <Skeleton variant="rounded" width={112} height={48} />
            </Box>
          </Stack>
          <Stack gap={4}>
            <Typography variant="h3">
              <Skeleton variant="text" width={300} />
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} gap={4}>
              <Skeleton variant="rounded" width="100%" height={60} />
              <Skeleton variant="rounded" width="100%" height={60} />
              <Skeleton variant="rounded" width="100%" height={60} />
              <Skeleton variant="rounded" width="100%" height={60} />
            </Stack>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} gap={4}>
            <Box flex={1}>
              <Skeleton variant="rounded" height={120} />
            </Box>
            <Box flex={1}>
              <Skeleton variant="rounded" height={120} />
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MyOrganizationSkeleton
