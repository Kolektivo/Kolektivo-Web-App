import { Divider, Stack } from '@mui/material'
import { myActivities } from '@/constants/activities/main'
import React, { type ReactNode } from 'react'
import Activity from './Activity'
import ItemsCard from '@/components/common/cards/ItemsCard'

type Props = {
  children?: ReactNode
}

export default function MyActivitiesCard({ children }: Props) {
  return (
    <ItemsCard title="My Activities">
      {myActivities.map((activity, index) => (
        <Stack key={index}>
          <Divider />
          <Activity
            img={activity.imgSrc}
            title={activity.title}
            description={activity.description}
            state={activity.state}
          />
        </Stack>
      ))}
      {children}
    </ItemsCard>
  )
}
