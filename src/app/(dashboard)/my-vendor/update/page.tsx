import HeaderCard from '@/components/common/cards/HeaderCard'
import MyVendorsCard from '@/components/vendors/MyVendors'
import { Button, Stack } from '@mui/material'
import { type Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Update Vendor',
}

export default function UpdateVendors() {
  return (
    <Stack gap={4}>
      <HeaderCard title="Select Vendor To Update" />
      <MyVendorsCard
        actions={
          <Link href="/my-vendor">
            <Button>Go back</Button>
          </Link>
        }
        isUpdate
      />
    </Stack>
  )
}
