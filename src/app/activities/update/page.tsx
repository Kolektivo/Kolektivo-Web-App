import MyActivitiesCard from '@/components/activities/myActivities/Activities'
import { Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import Link from 'next/link'
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
          <Divider />
          <Stack padding="24px" alignItems="end">
            <Link href="/activities">
              <Button>Go back</Button>
            </Link>
          </Stack>
        </MyActivitiesCard>
      </Stack>
    </Stack>
  )
}
