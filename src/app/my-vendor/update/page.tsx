import MyVendorsCard from '@/components/vendors/myVendors/Vendors'
import { Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { type Metadata } from 'next'
import Link from 'next/link'
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
          <Stack padding="24px" alignItems="end">
            <Link href="/my-vendor">
              <Button>Go back</Button>
            </Link>
          </Stack>
        </MyVendorsCard>
      </Stack>
    </Stack>
  )
}
