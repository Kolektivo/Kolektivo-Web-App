import MyActivitiesCard from '@/components/activities/myActivities/Activities'
import GoBackBox from '@/components/common/display/GoBack'
import { Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'

export default function UpdateActivity() {
  return (
    <Stack gap="24px">
      <Card>
        <CardContent>
          <Typography variant="h2">Select Activity To Update </Typography>
        </CardContent>
      </Card>
      <Stack>
        <MyActivitiesCard>
          <GoBackBox href="/activities" />
        </MyActivitiesCard>
      </Stack>
    </Stack>
  )
}
