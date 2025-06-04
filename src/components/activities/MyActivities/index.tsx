'use client'

import { Box, CardContent, Divider } from '@mui/material'
import React, { useEffect, useState, type ReactNode } from 'react'
import ActivityComponent from '../Activity'
import ItemsCard from '@/components/common/cards/ItemsCard'
import { type ActivityType } from '@/types/activities'
import activitiesService from '@/features/activities/services/activities.service'
import ActivitySkeleton from '../Activity/Skeleton'
import { useAuth } from '@/features/auth/hooks/useAuth'

const getState = (activity: ActivityType & { organization: string }) => {
  if (activity.state == 'completed') {
    return 'Completed'
  }
  if (new Date(activity.start_date).getTime() >= Date.now()) {
    return 'Upcoming'
  }
  if (new Date(activity.start_date).getTime() <= Date.now()) {
    return 'Action required'
  }
}

const getStateColor = (activity: ActivityType & { organization: string }) => {
  if (activity.state == 'completed') {
    return 'completedChip'
  }
  if (new Date(activity.start_date).getTime() >= Date.now()) {
    return 'upcomingChip'
  }
  if (new Date(activity.start_date).getTime() <= Date.now()) {
    return 'actionRequiredChip'
  }
}

type Props = {
  actions?: ReactNode
  disablePayoutRedirect?: boolean
  disableRedirect?: boolean
  onlyShowOwnerActivities?: boolean
}

export default function MyActivitiesCard({
  actions,
  disableRedirect,
  disablePayoutRedirect,
  onlyShowOwnerActivities,
}: Props) {
  const { user } = useAuth()
  const [data, setData] = useState<(ActivityType & { organization: string })[] | undefined>(undefined)

  const getRedirectionPath = (activity: ActivityType & { organization: string }) => {
    if (new Date(activity.start_date).getTime() >= Date.now()) {
      return ''
    }
    if (new Date(activity.start_date).getTime() <= Date.now() && user?.id == activity.activity_host_id) {
      return `/activities/payout/${activity.id}`
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const dataWithoutBanners = await activitiesService.get(onlyShowOwnerActivities && user ? user : undefined)
      setData(dataWithoutBanners)
      const dataWithBanners = await activitiesService.getBanners(dataWithoutBanners as ActivityType[])
      setData(dataWithBanners as (ActivityType & { organization: string })[])
    }
    fetchData()
  }, [onlyShowOwnerActivities, user])

  if (!data)
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
  // if (error) {
  //   return <ErrorDisplay />
  // }

  return (
    <ItemsCard title="My Activities" actions={actions}>
      {data?.map((activity) => (
        <Box key={activity.id}>
          <Divider />
          <CardContent>
            <ActivityComponent
              id={activity.id as string}
              organization={activity.organization ?? ''}
              img={activity.banner_src as string}
              title={activity.title}
              startDate={activity.start_date}
              endDate={activity.end_date}
              stateColor={getStateColor(activity) ?? 'completedChip'}
              state={getState(activity) ?? 'Upcoming'}
              redirectionPath={disablePayoutRedirect ? '' : getRedirectionPath(activity)}
              disableRedirect={disableRedirect}
            />
          </CardContent>
        </Box>
      ))}
    </ItemsCard>
  )
}
