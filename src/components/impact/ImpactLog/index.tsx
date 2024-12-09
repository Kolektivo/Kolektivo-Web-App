import LogsViewer from '@/components/common/display/LogsViewer'
import activitiesService from '@/features/activities/services/activities.service'
import { ImpactDto } from '@/types/activities'
import { Card, CardHeader, CardContent, CardActions, Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { type ReactElement } from 'react'

const ImpactLog = (): ReactElement => {
  const { data, error, isLoading, refetch } = useQuery<ImpactDto[] | undefined>({
    queryKey: ['getCompletedActivities'],
    queryFn: async () => await activitiesService.getCompleted(0),
  })
  return (
    <Card>
      <CardHeader title="Impact Log" />
      <CardContent>
        <LogsViewer logs={data!} />
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button size="small">Load more</Button>
      </CardActions>
    </Card>
  )
}

