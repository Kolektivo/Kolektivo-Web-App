import { Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { myActivities } from '@/constants/activities/main'
import React, { type ReactNode } from 'react'
import Vendor from '@/components/vendors/myVendors/Vendor'

type Props = {
  children?: ReactNode
}

export default function MyActivitiesCard({ children }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack paddingBottom="24px">
          <Typography variant="h2">My Activities</Typography>
        </Stack>
        {myActivities.map((activity, index) => (
          <Stack key={index}>
            <Divider />
            <Vendor img={activity.imgSrc} title={activity.title} description={activity.description} />
          </Stack>
        ))}
        {children}
      </CardContent>
    </Card>
  )
}
