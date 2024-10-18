'use client'

import ActivityUpdate from '@/components/activities/Update'
import ActivityUpdateSekelton from '@/components/activities/Update/Skeleton'
import DialogSuccess from '@/components/common/modals/DialogSuccess'
import activitiesService from '@/features/activities/services/activities.service'
import { type ActivityReviewType, type ActivityType } from '@/types/activities'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function UpdateActivity() {
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const [data, setData] = useState<ActivityType[] | undefined>()
  const [saveonExecution, setSaveOnExecution] = useState<boolean>(false)
  const [deleteOnExecution, setDeleteOnExecution] = useState<boolean>(false)
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false)

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (activityId: string) => {
      setDeleteOnExecution(true)
      return await activitiesService.delete(activityId)
    },
  })

  const { mutate: updateMutate } = useMutation({
    mutationFn: async (activityData: { review: ActivityReviewType; id: string }) => {
      setSaveOnExecution(true)
      return await activitiesService.update(activityData.review, activityData.id)
    },
  })

  const handleDelete = () => {
    deleteMutate(id as string, {
      onSuccess: () => {
        setDeleteOnExecution(false)
        router.push('/activities/update')
      },
      onError: () => {
        setDeleteOnExecution(false)
      },
    })
  }

  const handleSave = (review: ActivityReviewType) => {
    updateMutate(
      { review, id: id as string },
      {
        onSuccess: () => {
          setSaveOnExecution(false)
          setOpenSuccessDialog(true)
        },
        onError: () => {
          setSaveOnExecution(false)
        },
      },
    )
  }
  const handleDialogSuccessClick = () => {
    setOpenSuccessDialog(false)
    router.push('/activities/update')
  }

  useEffect(() => {
    console.log('Component mounted')
    const fetchData = async () => {
      const data = await activitiesService.get(id as string)
      setData(data)
    }
    fetchData()
  }, [id])

  if (data)
    return (
      <>
        <DialogSuccess
          title="Activity Updated"
          description="Your activity has been successfully updated"
          open={openSuccessDialog}
          onClickButton={handleDialogSuccessClick}
        />
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
          deleteOnExecution={deleteOnExecution}
          saveOnExecution={saveonExecution}
        />
      </>
    )
  return <ActivityUpdateSekelton />
}