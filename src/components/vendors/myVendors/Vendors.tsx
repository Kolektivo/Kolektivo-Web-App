import { Divider, Stack } from '@mui/material'
import { myVendors } from '@/constants/vendors/main'
import React, { type ReactNode } from 'react'
import Vendor from './Vendor'
import ItemsCard from '@/components/common/cards/ItemsCard'

type Props = {
  children?: ReactNode
}

export default function MyVendorsCard({ children }: Props) {
  return (
    <ItemsCard title="My Verdor(s)">
      {myVendors.map((vendor, index) => (
        <Stack key={index}>
          <Divider />
          <Vendor img={vendor.imgSrc} title={vendor.title} description={vendor.description} />
        </Stack>
      ))}
      {children}
    </ItemsCard>
  )
}
