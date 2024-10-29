'use client'

import { useState, type ReactElement } from 'react'
import VendorInfoForm from './VendorInfoForm'
import { type Vendor, type VendorInfo, type VendorLogo } from '@/types/vendors'
import { useRouter } from 'next/navigation'
import VendorLogoForm from './VendorLogoForm'
import { useMutation } from '@tanstack/react-query'
import DialogSuccess from '@/components/common/modals/DialogSuccess'
import DialogError from '@/components/common/modals/DialogError'

type CreateVendorSteps = {
  step1?: VendorInfo
  step2?: VendorLogo
}

const CreateVendor = (): ReactElement => {
  const [formData, setFormData] = useState<CreateVendorSteps>({})
  const [step, setStep] = useState<number>(1)
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (data: Vendor) => {
      console.log(data)
    },
  })

  const nextStep = () => {
    setStep((step) => step + 1)
  }

  const goBack = () => {
    if (step === 1) {
      router.push('/my-vendor')
      return
    }

    setStep((step) => step - 1)
  }

  const handleCompleteInfo = (data: VendorInfo) => {
    setFormData((formData) => {
      formData.step1 = data
      return formData
    })
    nextStep()
  }

  const handleCompleteLogo = (logoBase64: string) => {
    setFormData((formData) => {
      formData.step2 = { logoSrc: logoBase64 }
      mutation.mutate(createVendorFromSteps(formData))
      return formData
    })
  }

  const handleModalSuccess = () => {
    router.push('/my-vendor')
  }

  const handleModalError = () => {
    mutation.reset()
  }

  const createVendorFromSteps = (steps: CreateVendorSteps): Vendor => {
    return {
      ...steps.step1,
      ...steps.step2,
    }
  }

  return (
    <>
      {step === 1 && <VendorInfoForm defaultValues={formData.step1} onCancel={goBack} onSubmit={handleCompleteInfo} />}
      {step >= 2 && (
        <VendorLogoForm
          defaultLogoBase64={formData.step2?.logoSrc ?? null}
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
        title="Vendor Created"
        description="Your vendor has been successfully created"
        onClickButton={handleModalSuccess}
      />
      <DialogError
        open={mutation.isError}
        title="An error occurred"
        description="Your vendor could not be created"
        onClickButton={handleModalError}
      />
    </>
  )
}

export default CreateVendor
