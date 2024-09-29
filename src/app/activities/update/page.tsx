import MyActivitiesCard from '@/components/activities/myActivities/Activities'
import { Card, CardContent, Divider, Link, Stack, Typography } from '@mui/material'
import React from 'react'

export default function UpdateActivity() {
  return (
    <Stack gap="24px">
      <Card>
        <CardContent>
          <Typography variant="h2">Select Activity to Update </Typography>
        </CardContent>
      </Card>
      <Stack>
        <MyActivitiesCard>
          <Divider />
          <Link href="/activities">
            <Typography variant="h4" textAlign="right" marginTop="24px">
              Go back
            </Typography>
          </Link>
        </MyActivitiesCard>
      </Stack>
    </Stack>
  )
}
