'use client'

import { useState, type ReactElement } from 'react'
import OrganizationLogoForm from './OrganizationLogoForm'
import OrganizationInfoForm from './OrganizationInfoForm'
import { useRouter } from 'next/navigation'
import DialogSuccess from '@/components/common/modals/DialogSuccess'
import { type OrganizationInfo, type Organization, type OrganizationLogo } from '@/types/organization'
import { useMutation } from '@tanstack/react-query'
import organizationsService from '@/features/organizations/services/organizations.service'
import DialogError from '@/components/common/modals/DialogError'

type CreateOrganizationSteps = {
  step1?: OrganizationInfo
  step2?: OrganizationLogo
}

const CreateOrganization = (): ReactElement => {
  const [formData, setFormData] = useState<CreateOrganizationSteps>({})
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
    setFormData((formData) => {
      formData.step1 = data
      return formData
    })
    nextStep()
  }

  const handleCompleteLogo = (logoBase64: string) => {
    setFormData((formData) => {
      formData.step2 = { logoSrc: logoBase64 }
      mutation.mutate(createOrganizationFromSteps(formData))
      return formData
    })
  }

  const handleModalSuccess = () => {
    router.push('/my-organization')
  }

  const handleModalError = () => {
    mutation.reset()
  }

  const createOrganizationFromSteps = (steps: CreateOrganizationSteps): Organization => {
    return {
      ...steps.step1,
      ...steps.step2,
    }
  }

  return (
    <>
      {step === 1 && (
        <OrganizationInfoForm defaultValues={formData.step1} onCancel={goBack} onSubmit={handleCompleteInfo} />
      )}
      {step >= 2 && (
        <OrganizationLogoForm
          defaultLogoBase64={formData.step2?.logoSrc ?? null}
          loading={mutation.isPending}
          onCancel={(logoBase64) => {
            setFormData((formData) => {
              formData.step2 = { logoSrc: logoBase64 ?? undefined }
              return formData
            })
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
