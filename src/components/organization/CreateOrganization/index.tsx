'use client'

import { useState, type ReactElement } from 'react'
import OrganizationLogoForm from './OrganizationLogoForm'
import OrganizationInfoForm from './OrganizationInfoForm'
import { useRouter } from 'next/navigation'
import DialogSuccess from '@/components/common/modals/DialogSuccess'
import { type Organization } from '@/types/organization'

const CreateOrganization = (): ReactElement => {
  const [formData, setFormData] = useState<Organization>()
  const [step, setStep] = useState<number>(1)
  const [showModalComplete, setShowModalComplete] = useState<boolean>(false)
  const router = useRouter()

  const nextStep = () => {
    if (step === 2) {
      setShowModalComplete(true)
      return
    }

    setStep((step) => step + 1)
  }

  const goBack = () => {
    if (step === 1) {
      router.push('/my-organization')
      return
    }

    setStep((step) => step - 1)
  }

  const handleModalClose = () => {
    setShowModalComplete(false)
    router.push('/my-organization')
  }

  return (
    <>
      {step === 1 && (
        <OrganizationInfoForm
          defaultValues={formData}
          onCancel={goBack}
          onSubmit={(data) => {
            setFormData({ ...formData, ...data })
            nextStep()
          }}
        />
      )}
      {step >= 2 && (
        <OrganizationLogoForm
          defaultLogoBase64={formData?.logoBase64}
          onCancel={(logoBase64) => {
            setFormData({ ...formData, logoBase64 })
            goBack()
          }}
          onSubmit={(logoBase64) => {
            setFormData({ ...formData, logoBase64 })
            nextStep()
          }}
        />
      )}
      <DialogSuccess
        open={showModalComplete}
        title="Profile Created"
        description="Your organization profile has been successfully created"
        onClickButton={handleModalClose}
      />
    </>
  )
}

export default CreateOrganization
