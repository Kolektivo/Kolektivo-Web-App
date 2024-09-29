import MyVendorsCard from '@/components/vendors/myVendors/Vendors'
import VendorsActions from '@/components/vendors/actions/VendorsActions'
import { Stack } from '@mui/material'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Vendor',
}

export default function Page() {
  return (
    <Stack gap="24px">
      <VendorsActions />
      <MyVendorsCard />
    </Stack>
  )
}
