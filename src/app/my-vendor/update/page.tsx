import GoBackBox from '@/components/common/display/GoBack'
import MyVendorsCard from '@/components/vendors/myVendors/Vendors'
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { type Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Update Vendor',
}

export default function UpdateVendors() {
  return (
    <Stack gap="24px">
      <Card>
        <CardContent>
          <Typography variant="h2">Select Vendor To Update </Typography>
        </CardContent>
      </Card>
      <Stack>
        <MyVendorsCard>
          <Divider />
          <GoBackBox href="/my-vendor" />
        </MyVendorsCard>
      </Stack>
    </Stack>
  )
}
