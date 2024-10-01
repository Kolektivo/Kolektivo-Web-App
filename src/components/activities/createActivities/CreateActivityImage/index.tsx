import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material'
import React, { useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function CreateActivityImage({ children }: Props) {
  const [photo, setPhoto] = useState()
  return (
    <Card>
      <CardContent>
        <Stack direction="row" gap="32px" marginBottom="24px">
          <Stack
            justifyContent="center"
            alignItems="center"
            borderRadius="12px"
            width="280px"
            height="160px"
            sx={{ background: '#F2F2F2' }}
          >
            {!photo && <Typography sx={{ color: '#A9A9A9' }}>Activity Banner</Typography>}
          </Stack>
          <Stack justifyContent="center" gap="16px">
            <Chip label="Upload a photo" sx={{ width: '126px', background: '#EAF6F6' }} />
            <Typography width="260px" color="#737373">
              At least 800x450 px recommended. JPG or PNG is allowed
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        {children}
      </CardContent>
    </Card>
  )
}
