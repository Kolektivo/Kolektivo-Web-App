import { Box, CardContent, Divider } from '@mui/material'
import { myActivities } from '@/constants/activities/main'
import React, { type ReactNode } from 'react'
import Activity from '../Activity'
import ItemsCard from '@/components/common/cards/ItemsCard'

export default function MyActivitiesCard({ actions }: { actions?: ReactNode }) {
  return (
    <ItemsCard title="My Activities" actions={actions}>
      {myActivities.map((activity, index) => (
        <Box key={index}>
          <Divider />
          <CardContent>
            <Activity
              img={activity.imgSrc}
              title={activity.title}
              description={activity.description}
              state={activity.state}
            />
          </CardContent>
        </Box>
      ))}
    </ItemsCard>
  )
}
