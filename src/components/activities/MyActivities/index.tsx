'use client'

import { Box, CardContent, Divider } from '@mui/material'
import React, { type ReactNode } from 'react'
import ActivityComponent from '../Activity'
import ItemsCard from '@/components/common/cards/ItemsCard'
import { type ActivityType } from '@/types/activities'
import activitiesService from '@/features/activities/services/activities.service'
import ErrorDisplay from '@/components/common/display/ErrorDisplay'
import { useQuery } from '@tanstack/react-query'
import ActivitySkeleton from '../Activity/Skeleton'
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function MyActivitiesCard({
  actions,
  disableRedirect,
  onlyShowOwnerActivities,
}: {
  actions?: ReactNode
  disableRedirect?: boolean
  onlyShowOwnerActivities?: boolean
}) {
  const { user } = useAuth()
  const { data, isLoading, error, refetch } = useQuery<ActivityType[] | undefined>({
    queryKey: ['getMyActivities'],
    queryFn: async () => await activitiesService.get(onlyShowOwnerActivities && user ? user : undefined),
  })

  if (isLoading)
    return (
      <ItemsCard title="My Activities" actions={actions}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box key={index}>
            <Divider />
            <Box paddingLeft={4}>
              <ActivitySkeleton />
            </Box>
          </Box>
        ))}
      </ItemsCard>
    )
  if (error) {
    return (
      <ErrorDisplay
        onClickButton={() => {
          refetch()
        }}
      />
    )
  }

  return (
    <ItemsCard title="My Activities" actions={actions}>
      {data?.map((activity) => (
        <Box key={activity.id}>
          <Divider />
          <CardContent>
            <ActivityComponent
              id={activity.id as string}
              user={activity.user_created}
              img={activity.banner_src as string}
              title={activity.title}
              description={activity.description}
              state="Upcoming"
              disableRedirect={disableRedirect}
            />
          </CardContent>
        </Box>
      ))}
    </ItemsCard>
  )
}
