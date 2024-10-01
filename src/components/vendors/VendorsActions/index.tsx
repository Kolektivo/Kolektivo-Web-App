'use client'

import { Box, Stack, useTheme } from '@mui/material'
import React from 'react'
import ActionCard from '../../common/cards/ActionCard'

export default function VendorsActions() {
  const theme = useTheme()

  return (
    <Stack direction="row" alignItems="center" gap={4}>
      <Box flex={1}>
        <ActionCard
          icon="add_circle"
          iconColor={theme.palette.primary.main}
          title="Create New Vendor profile"
          description="Set up new vendor profiles for your community."
          textButton="Create"
          href="/my-vendor/create"
        />
      </Box>
      <Box flex={1}>
        <ActionCard
          icon="replay"
          iconColor={theme.palette.strongOrange.main}
          title="Update Vendor"
          description="Make changes to your existing vendor profiles."
          textButton="Update"
          href="/my-vendor/update"
          isSecondary
        />
      </Box>
    </Stack>
  )
}
