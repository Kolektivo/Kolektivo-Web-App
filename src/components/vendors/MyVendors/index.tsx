import { Box, CardContent, Divider } from '@mui/material'
import { myVendors } from '@/constants/vendors/main'
import React, { type ReactNode } from 'react'
import Vendor from '../Vendor'
import ItemsCard from '@/components/common/cards/ItemsCard'

export default function MyVendorsCard({ actions }: { actions?: ReactNode }) {
  return (
    <ItemsCard title="My Verdor(s)" actions={actions}>
      {myVendors.map((vendor, index) => (
        <Box key={index}>
          <Divider />
          <CardContent>
            <Vendor img={vendor.imgSrc} title={vendor.title} description={vendor.description} />
          </CardContent>
        </Box>
      ))}
    </ItemsCard>
  )
}
