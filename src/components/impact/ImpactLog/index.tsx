'use client'
import ErrorDisplay from '@/components/common/display/ErrorDisplay'
import LogsViewer from '@/components/common/display/LogsViewer'
import activitiesService from '@/features/activities/services/activities.service'
import { ImpactDto } from '@/types/activities'
import { Card, CardHeader, CardContent, CardActions, Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState, type ReactElement } from 'react'

const ImpactLog = (): ReactElement => {
  const [page, setPage] = useState(1)

  const { data, error, isLoading, refetch } = useQuery<ImpactDto[] | undefined>({
    queryKey: ['getCompletedActivities', page],
    queryFn: async () => await activitiesService.getCompleted(1),
  })

  const handleLoadMore = async () => {
    setPage((prevPage) => prevPage + 1) // Incrementar la página
    await refetch() // Solicitar la nueva página de datos
  }

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
          <Button size="small" onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load more'}
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
