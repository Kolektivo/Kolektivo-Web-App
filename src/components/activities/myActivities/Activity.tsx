import { Chip, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

type Props = {
  img: string
  title: string
  description: string
  state: string
}

export default function Activity({ img, title, description, state }: Props) {
  return (
    <Stack direction="row" alignItems="center" padding="24px" gap="16px">
      <Image src={img} alt={`vendorImage-${img}`} width={140} height={80} />
      <Stack gap="4px">
        <Stack alignItems="center" direction="row" gap="8px">
          <Typography fontWeight={700} fontSize={18}>
            {title}
          </Typography>
          <Chip label={state} color="default" />
        </Stack>
        <Typography fontWeight={400} fontSize={18} color="#7E7E7E">
          {description}
        </Typography>
      </Stack>
    </Stack>
  )
}
