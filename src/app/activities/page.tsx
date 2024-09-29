import ActivitiesActions from '@/components/activities/Actions'
import ActivitiesVendors from '@/components/activities/Vendors/Vendors'
import { Stack } from '@mui/material'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activities',
}

export default function Page() {
  return (
    <Stack gap="24px">
      <ActivitiesActions />
      <ActivitiesVendors />
    </Stack>
  )
}
