import { Skeleton, Stack, Typography } from '@mui/material'

export default function VendorItemSkeleton() {
  return (
    <Stack direction="row" alignItems="center" gap="16px">
      <Skeleton variant="rounded" width={86} height={86} />
      <Stack gap="5px">
        <Typography variant="h3">
          <Skeleton width={300} />
        </Typography>
        <Typography variant="body1">
          <Skeleton width={200} />
        </Typography>
      </Stack>
    </Stack>
  )
}
