'use client'

import { useState, type ReactElement } from 'react'
import OrganizationLogoForm from './OrganizationLogoForm'
import OrganizationInfoForm from './OrganizationInfoForm'
import { useRouter } from 'next/navigation'
import DialogSuccess from '@/components/common/modals/DialogSuccess'
import { type OrganizationInfo, type Organization } from '@/types/organization'
import { useMutation } from '@tanstack/react-query'
import organizationsService from '@/features/organizations/services/organizations.service'
import DialogError from '@/components/common/modals/DialogError'

const CreateOrganization = (): ReactElement => {
  const [formData, setFormData] = useState<Organization>()
  const [step, setStep] = useState<number>(1)
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (data: Organization) => await organizationsService.create(data),
  })

  const nextStep = () => {
    setStep((step) => step + 1)
  }

  const goBack = () => {
    if (step === 1) {
      router.push('/my-organization')
      return
    }

    setStep((step) => step - 1)
  }

  const handleCompleteInfo = (data: OrganizationInfo) => {
    setFormData({ ...formData, ...data })
    nextStep()
  }

  const handleCompleteLogo = (logoBase64: string) => {
    const data = { ...formData, logoBase64 }
    setFormData(data)
    mutation.mutate(data)
  }

  const handleModalSuccess = () => {
    router.push('/my-organization')
  }

  const handleModalError = () => {
    mutation.reset()
  }

  return (
    <>
      {step === 1 && <OrganizationInfoForm defaultValues={formData} onCancel={goBack} onSubmit={handleCompleteInfo} />}
      {step >= 2 && (
        <OrganizationLogoForm
          defaultLogoBase64={formData?.logoBase64}
          loading={mutation.isPending}
          onCancel={(logoBase64) => {
            setFormData({ ...formData, logoBase64 })
            goBack()
          }}
          onSubmit={handleCompleteLogo}
        />
      )}
      <DialogSuccess
        open={mutation.isSuccess}
        title="Profile Created"
        description="Your organization profile has been successfully created"
        onClickButton={handleModalSuccess}
      />
      <DialogError
        open={mutation.isError}
        title="An error occurred"
        description="Your organization profile could not be created"
        onClickButton={handleModalError}
      />
    </>
  )
}

export default CreateOrganization
