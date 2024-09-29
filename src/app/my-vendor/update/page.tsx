import MyVendorsCard from '@/components/vendors/myVendors/Vendors'
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material'
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
          <Typography variant="h2">Select Activity to Update </Typography>
        </CardContent>
      </Card>
      <Stack>
        <MyVendorsCard>
          <Divider />
          <Card sx={{ borderRadius: 'px 0px 0px 0px' }}>
            <CardContent>
              <Link href="/my-vendor">
                <Typography variant="h4" textAlign="right" marginTop="24px">
                  Go back
                </Typography>
              </Link>
            </CardContent>
          </Card>
        </MyVendorsCard>
      </Stack>
    </Stack>
  )
}
