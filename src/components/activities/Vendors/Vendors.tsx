import { Card, CardContent, Divider, Stack } from '@mui/material'
import { vendors } from '@/constants/activities/main'
import React from 'react'
import Vendor from './Vendor'

export default function ActivitiesVendors() {
  return (
    <Card>
      <CardContent>
        <h2>My Vendor(s)</h2>
        {vendors.map((vendor, index) => (
          <Stack key={index}>
            <Divider />
            <Vendor img={vendor.imgSrc} title={vendor.title} description={vendor.description} />
          </Stack>
        ))}
      </CardContent>
    </Card>
  )
}
