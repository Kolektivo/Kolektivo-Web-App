'use client'

import ErrorDisplay from '@/components/common/display/ErrorDisplay'
import organizationsService from '@/features/organizations/services/organizations.service'
import { type Organization } from '@/types/organization'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState, type ReactElement } from 'react'
import UpdateOrganizationForm from './UpdateOrganizationForm'
import DialogError from '@/components/common/modals/DialogError'
import DialogSuccess from '@/components/common/modals/DialogSuccess'
import { useRouter } from 'next/navigation'
import HeaderCard from '@/components/common/cards/HeaderCard'
import { Stack } from '@mui/material'
import UpdateOrganizationSkeleton from './Skeleton'

const UpdateOrganization = (): ReactElement => {
  const [saving, setSaving] = useState<boolean>(false)
  const { data, error, isLoading, refetch } = useQuery<Organization | undefined>({
    queryKey: ['getMyOrganization'],
    queryFn: async () => await organizationsService.get(),
  })

  const mutation = useMutation({
    mutationFn: async (data: Organization) => {
      setSaving(true)
      await organizationsService.update(data)
    },
  })
  const router = useRouter()

  const handleSave = (data: Organization) => {
    mutation.mutate(data)
  }

  const handleModalSuccess = () => {
    router.push('/my-organization')
  }

  const handleModalError = () => {
    mutation.reset()
  }

  useEffect(() => {
    setSaving(false)
  }, [mutation.isSuccess, mutation.isError])

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
    return (
      <>
        <Stack gap={4}>
          <HeaderCard title="Update Fields" />
          <UpdateOrganizationSkeleton />
        </Stack>
      </>
    )
  }

  return (
    <>
      <UpdateOrganizationForm defaultValues={data} onSave={handleSave} saving={saving} />
      <DialogSuccess
        open={mutation.isSuccess}
        title="Profile Updated"
        description="Your organization profile has been successfully updated"
        onClickButton={handleModalSuccess}
      />
      <DialogError
        open={mutation.isError}
        title="An error occurred"
        description="Your organization profile could not be updated"
        onClickButton={handleModalError}
      />
    </>
  )
}

export default UpdateOrganization
