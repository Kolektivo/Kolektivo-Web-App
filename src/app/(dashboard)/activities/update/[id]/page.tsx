'use client'

import ActivityUpdate from '@/components/activities/Update'
import LoadingButton from '@/components/common/buttons/LoadingButton'
import activitiesService from '@/features/activities/services/activities.service'
import { type ActivityType } from '@/types/activities'
import { Button } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function UpdateActivity() {
  const router = useRouter()
  const params = useParams()
  const { id } = params // Get the id from the path params
  const [onExecution, setOnExecution] = useState<boolean>(false)

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (activityId: string) => {
      setOnExecution(true)
      return await activitiesService.delete(activityId)
    },
  })

  const { data } = useQuery<ActivityType[] | undefined>({
    queryKey: ['getMyActivities'],
    queryFn: async () => await activitiesService.get(id as string),
  })

  const handleDelete = () => {
    console.log('Delete')
    deleteMutate(id as string, {
      onSuccess: () => {
        setOnExecution(false)
        router.push('/activities/update')
      },
      onError: () => {
        setOnExecution(false)
        console.log('Error')
      },
    })
  }

  const handleSave = () => {}

  if (data)
    return (
      <ActivityUpdate
        review={{
          name: data[0].title,
          date: data[0].start_date,
          endTime: data[0].end_date,
          description: data[0].description,
          location: data[0].location as string,
          startTime: data[0].start_date,
          banner: data[0].banner_src as string,
          kolectivoPoints: Number(data[0].points),
          requirements: data[0].requirements.split(','),
          stamps: data[0].stamp as string,
        }}
      >
        {onExecution && (
          <>
            <LoadingButton loading variant="contained" color="warningButton" className="stepperButton">
              Delete
            </LoadingButton>
            <LoadingButton loading variant="contained" color="primary" className="stepperButton">
              Save
            </LoadingButton>
          </>
        )}
        {!onExecution && (
          <>
            <Button onClick={handleDelete} variant="contained" color="warningButton">
              Delete
            </Button>
            <Button
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onClick={(_) => handleSave()}
              variant="contained"
              color="primary"
              className="stepperButton"
            >
              Save
            </Button>
          </>
        )}
      </ActivityUpdate>
    )
  return (
    <div>
      <div>IsLoading</div>
    </div>
  )
}
