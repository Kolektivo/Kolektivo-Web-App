'use client'

import { type ReactElement, useEffect, useState } from 'react'
import UpdateVendorForm from './UpdateVendorForm'
import { type Vendor } from '@/types/vendors'
import { useMutation, useQuery } from '@tanstack/react-query'
import vendorsService from '@/features/vendors/services/vendors.service'
import ErrorDisplay from '@/components/common/display/ErrorDisplay'
import { useRouter } from 'next/navigation'
import DialogError from '@/components/common/modals/DialogError'
import DialogSuccess from '@/components/common/modals/DialogSuccess'
import UpdateVendorSkeleton from './Skeleton'

const UpdateVendor = ({ id }: { id: string }): ReactElement => {
  const [saving, setSaving] = useState<boolean>(false)
  const { data, error, isLoading, refetch } = useQuery<Vendor | undefined>({
    queryKey: [`getMyVendor-${id}`],
    queryFn: async () => await vendorsService.get(id),
  })

  const mutation = useMutation({
    mutationFn: async (data: Vendor) => {
      setSaving(true)
      await vendorsService.update(data)
    },
  })
  const router = useRouter()

  const handleSave = (data: Vendor) => {
    mutation.mutate(data)
  }

  const handleModalSuccess = () => {
    refetch()
    router.push('/my-vendor')
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
    return <UpdateVendorSkeleton />
  }

  return (
    <>
      <UpdateVendorForm defaultValues={data} onSave={handleSave} onDelete={() => {}} saving={saving} />
      <DialogSuccess
        open={mutation.isSuccess}
        title="Vendor Updated"
        description="Your vendor has been successfully updated"
        onClickButton={handleModalSuccess}
      />
      <DialogError
        open={mutation.isError}
        title="An error occurred"
        description="Your vendor could not be updated"
        onClickButton={handleModalError}
      />
    </>
  )
}

export default UpdateVendor
