import ActivitiesActions from '@/components/activities/actions/Actions'
import MyVendors from '@/components/vendors/myVendors/Vendors'
import { Stack } from '@mui/material'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activities',
}

export default function Page() {
  return (
    <Stack gap="24px">
      <ActivitiesActions />
      <MyVendors />
    </Stack>
  )
}
