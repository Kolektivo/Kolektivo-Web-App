'use client'
import ErrorDisplay from '@/components/common/display/ErrorDisplay'
import LogsViewer from '@/components/common/display/LogsViewer'
import activitiesService from '@/features/activities/services/activities.service'
import { ImpactDto } from '@/types/activities'
import { Card, CardHeader, CardContent, CardActions, Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { type ReactElement } from 'react'

const ImpactLog = (): ReactElement => {
  const { data, error, isLoading, refetch } = useQuery<ImpactDto[] | undefined>({
    queryKey: ['getCompletedActivities'],
    queryFn: async () => await activitiesService.getCompleted(1),
  })

  if (error) {
    return (
      <ErrorDisplay
        onClickButton={() => {
          refetch()
        }}
      />
    )
  }

  if (isLoading) {
    return <Card />
  }

  if (data) {
    return (
      <Card>
        <CardHeader title="Impact Log" />
        <CardContent>
          <LogsViewer logs={data} />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button size="small">Load more</Button>
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
