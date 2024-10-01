'use client'

import { Box, Stack, useTheme } from '@mui/material'
import React from 'react'
import ActionCard from '../../common/cards/ActionCard'

export default function ActivitiesActions() {
  const theme = useTheme()

  return (
    <Stack direction="row" alignItems="center" gap={4}>
      <Box flex={1}>
        <ActionCard
          icon="add_circle"
          iconColor={theme.palette.primary.main}
          title="Create Activity"
          description="Set up new activities for your community."
          textButton="Create"
          href="/activities/create"
        />
      </Box>
      <Box flex={1}>
        <ActionCard
          icon="replay"
          iconColor={theme.palette.strongOrange.main}
          title="Update activity"
          description="Make changes to your existing activities."
          textButton="Update"
          href="/activities/update"
          isSecondary
        />
      </Box>
    </Stack>
  )
}
