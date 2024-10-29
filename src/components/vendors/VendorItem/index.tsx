'use client'

import FallbackImage from '@/components/common/display/FallbackImage'
import { type Vendor } from '@/types/vendors'
import { CardActionArea, CardContent, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { type ReactElement, type ReactNode } from 'react'

type Props = {
  vendor: Vendor
  enabledEdit?: boolean
}

export default function VendorItem({ vendor, enabledEdit = false }: Props) {
  const router = useRouter()

  const Container = ({ children }: { children: ReactNode }): ReactElement => {
    return enabledEdit ? (
      <CardActionArea onClick={() => router.push(`/my-vendor/update/${vendor.id}`)}>{children}</CardActionArea>
    ) : (
      <>{children}</>
    )
  }

  return (
    <Container>
      <CardContent>
        <Stack direction="row" alignItems="center" gap="16px">
          <FallbackImage
            src={vendor.logoSrc}
            alt={`vendorImage-${vendor.name?.replaceAll(' ', '')}`}
            width={86}
            height={86}
          />
          <Stack gap="5px">
            <Typography variant="h3">{vendor.name}</Typography>
            <Typography variant="body1" color="text.secondary">
              {vendor.location}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Container>
  )
}
