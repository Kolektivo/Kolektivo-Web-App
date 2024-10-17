'use client'

import ActivityUpdate from '@/components/activities/Update'
import ActivityUpdateSekelton from '@/components/activities/Update/Skeleton'
import activitiesService from '@/features/activities/services/activities.service'
import { type ActivityReviewType, type ActivityType } from '@/types/activities'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function UpdateActivity() {
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const [onExecution, setOnExecution] = useState<boolean>(false)

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (activityId: string) => {
      setOnExecution(true)
      return await activitiesService.delete(activityId)
    },
  })

  const { mutate: updateMutate } = useMutation({
    mutationFn: async (activityData: { review: ActivityReviewType; id: string }) => {
      setOnExecution(true)
      return await activitiesService.update(activityData.review, activityData.id)
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

  const handleSave = (review: ActivityReviewType) => {
    console.log('GetReview: ', review)
    console.log('Update')
    updateMutate(
      { review, id: id as string },
      {
        onSuccess: () => {
          setOnExecution(false)
          router.push('/activities/update')
        },
        onError: () => {
          setOnExecution(false)
          console.log('Error')
        },
      },
    )
  }

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
          requirements: data[0].requirements,
          stamps: data[0].stamp as string,
        }}
        submitHandler={handleSave}
        deleteHandler={handleDelete}
        onExecution={onExecution}
      />
    )
  return <ActivityUpdateSekelton />
}
