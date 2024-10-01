import MyVendorsCard from '@/components/vendors/MyVendors'
import VendorsActions from '@/components/vendors/VendorsActions'
import { Stack } from '@mui/material'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Vendor',
}

export default function Page() {
  return (
    <Stack gap={4}>
      <VendorsActions />
      <MyVendorsCard />
    </Stack>
  )
}
