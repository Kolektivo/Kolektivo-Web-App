import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

type Props = {
  img: string
  title: string
  description: string
}

export default function Vendor({ img, title, description }: Props) {
  return (
    <Stack direction="row" alignItems="center" gap="16px">
      <Image src={img} alt={`vendorImage-${img}`} width={86} height={86} />
      <Stack gap="5px">
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Stack>
    </Stack>
  )
}
