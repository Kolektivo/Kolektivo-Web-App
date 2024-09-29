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
    <Stack direction="row" alignItems="center" paddingY="24px" gap="16px">
      <Image src={img} alt={`vendorImage-${img}`} width={86} height={86} />
      <Stack gap="4px">
        <Typography fontWeight={700} fontSize={18}>
          {title}
        </Typography>
        <Typography fontWeight={400} fontSize={18} color="#7E7E7E">
          {description}
        </Typography>
      </Stack>
    </Stack>
  )
}
