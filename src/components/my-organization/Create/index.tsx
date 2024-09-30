'use client'

import { useState, type ReactElement } from 'react'
import OrganizationLogo from './OrganizationLogo'
import OrganizationInfo from './OrganizationInfo'
import HeaderCard from '@/components/common/cards/HeaderCard'
import { Stack, Card, CardActions, Button, CardContent } from '@mui/material'
import { useRouter } from 'next/navigation'
import DialogSuccess from '@/components/common/modals/DialogSuccess'

interface StepInfo {
  title: string
  form?: React.ReactElement
  backButtonText: string
  nextButtonText: string
}

const Form = (): ReactElement => {
  const [step, setStep] = useState(1)
  const [showModalComplete, setShowModalComplete] = useState(false)
  const router = useRouter()

  const nextStep = () => {
    if (step === 2) {
      setShowModalComplete(true)
      return
    }

    setStep(step + 1)
  }

  const goBack = () => {
    if (step === 1) {
      router.push('/my-organization')
      return
    }

    setStep(step - 1)
  }

  const handleModalClose = () => {
    setShowModalComplete(false)
    router.push('/my-organization')
  }

  const infoStep: StepInfo = {
    title: '',
    backButtonText: 'Go Back',
    nextButtonText: 'Next',
  }

  switch (step) {
    case 1: {
      infoStep.title = 'Organization Info'
      infoStep.form = <OrganizationInfo />
      infoStep.backButtonText = 'Cancel'
      break
    }
    case 2: {
      infoStep.title = 'Organization Logo'
      infoStep.form = <OrganizationLogo />
      infoStep.nextButtonText = 'Complete'
      break
    }
  }

  return (
    <Stack gap={4}>
      <HeaderCard title={infoStep.title} />
      <Card>
        <CardContent>{infoStep.form}</CardContent>
        <CardActions>
          <Button onClick={goBack}>{infoStep.backButtonText}</Button>
          <Button variant="contained" onClick={nextStep}>
            {infoStep.nextButtonText}
          </Button>
        </CardActions>
      </Card>
      <DialogSuccess
        open={showModalComplete}
        title="Profile Created"
        description="Your organization profile has been successfully created"
        onClickButton={handleModalClose}
      />
    </Stack>
  )
}

export default Form
