import { Box, Stack } from '@mui/material'
import React from 'react'
import ActionCard from '../../common/cards/ActionCard'

export default function ActivitiesActions() {
  return (
    <Stack direction="row" alignItems="center" gap={4}>
      <Box flex={1}>
        <ActionCard
          icon="add_circle"
          iconColor="primary"
          title="Create Activity"
          description="Set up new activities for your community."
          textButton="Create"
          href="/activities/create"
        />
      </Box>
      <Box flex={1}>
        <ActionCard
          icon="replay"
          iconColor="strongOrange"
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
