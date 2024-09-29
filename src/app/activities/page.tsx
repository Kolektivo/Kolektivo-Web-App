import ActivitiesActions from '@/components/activities/actions/Actions'
import MyVendorsCard from '@/components/vendors/myVendors/Vendors'
import { Stack } from '@mui/material'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activities',
}

export default function Activities() {
  return (
    <Stack gap="24px">
      <ActivitiesActions />
      <MyVendorsCard />
    </Stack>
  )
}
