'use client'
import ErrorDisplay from '@/components/common/display/ErrorDisplay'
import LogsViewer from '@/components/common/display/LogsViewer'
import activitiesService from '@/features/activities/services/activities.service'
import { Card, CardHeader, CardContent, CardActions, Button } from '@mui/material'
import { useState, type ReactElement } from 'react'
import { Skeleton, Stack } from '@mui/material'
import React from 'react'
import useSWR from 'swr'

const ImpactLog = (): ReactElement => {
  const [page, setPage] = useState(1)

  const { data, error, isValidating, mutate } = useSWR(
    `api/activities/completed?page=${page}`,
    activitiesService.completedActivitiesFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    },
  )

  const handleLoadMore = async () => {
    setPage((prevPage) => prevPage + 1)
    await mutate()
  }

  if (error) {
    return (
      <ErrorDisplay
        onClickButton={() => {
          mutate()
        }}
      />
    )
  }

  if (isValidating) {
    return (
      <Card>
        <CardHeader title="Impact Log" />
        <CardContent>
          <Skeleton width={250} height={132} />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button size="small" onClick={handleLoadMore} disabled={isValidating}>
            {isValidating ? 'Loading...' : 'Load more'}
          </Button>
        </CardActions>
      </Card>
    )
  }

  if (data) {
    return (
      <Card>
        <CardHeader title="Impact Log" />
        <CardContent>
          <LogsViewer logs={data} />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button size="small" onClick={handleLoadMore} disabled={isValidating}>
            {isValidating ? 'Loading...' : 'Load more'}
          </Button>
        </CardActions>
      </Card>
    )
  }
  return (
    <Card>
      <CardHeader title="Impact Log" />
    </Card>
  )
}

export default ImpactLog
