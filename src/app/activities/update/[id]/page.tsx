'use client'

import ActivityReview from '@/components/activities/createActivities/forms/Review'
import activitiesService from '@/features/activities/services/activities.service'
import { type ActivityType } from '@/types/activities'
import { Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function UpdateActivity() {
  const params = useParams()
  const { id } = params // Get the id from the path params
  const { data, isLoading, error, refetch } = useQuery<ActivityType[] | undefined>({
    queryKey: ['getMyActivities'],
    queryFn: async () => await activitiesService.get(id as string),
  })

  const handleDelete = () => {}
  const handleSave = () => {}
  useEffect(() => {
    console.log(data)
  }, [data])
  if (data)
    return (
      <ActivityReview
        review={{
          detail: {
            name: data[0].title,
            date: data[0].start_date,
            endTime: data[0].end_date,
            description: data[0].description,
            location: data[0].location as string,
            startTime: data[0].start_date,
          },
          banner: data[0].banner_src as string,
          requirementsRewards: {
            kolectivoPoints: Number(data[0].points),
            requirements: data[0].requirements.split(','),
            stamps: data[0].stamp as string,
          },
        }}
      >
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
      </ActivityReview>
    )
  return (
    <div>
      <div>lalala</div>
      paadsasd
    </div>
  )
}
