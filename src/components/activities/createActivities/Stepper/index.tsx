'use client'

import * as React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import { CardActions, Link, Stack } from '@mui/material'
import HeaderCard from '@/components/common/cards/HeaderCard'
import CreateActivityDetailForm from '../forms/Detail'
import CreateActivityBannerForm from '../forms/Banner'
import CreateActivityRequirementsRewards from '../forms/RequirementsRewards'
import CreateActivityReview from '../forms/Review'
import DialogSuccess from '@/components/common/modals/DialogSuccess'
import { useRouter } from 'next/navigation'
import {
  type CreateActivityRequirementsRewardsFormValues,
  type CreateActivityDetailFormValues,
} from '@/types/activities'

const steps = ['', '', '', '']

export default function CreateActivityStepper() {
  const [activeStep, setActiveStep] = React.useState(1)
  const [open, setOpen] = React.useState<boolean>(false)
  const [mainFormValues, setMainFormValues] = React.useState<CreateActivityDetailFormValues | null>(null)
  const [requirementsRewardsFormValues, setRequirementsRewardsFormValues] =
    React.useState<CreateActivityRequirementsRewardsFormValues | null>(null)
  const [banner, setBanner] = React.useState<string>()
  const router = useRouter()

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const goToNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleDetailFormSubmit = (data: CreateActivityDetailFormValues) => {
    setMainFormValues(data)
    goToNext()
    console.log('Submit')
  }

  const handleBannerSubmit = (img: string) => {
    setBanner(img)
    goToNext()
  }

  const handleRequirementsRewardsFormSubmit = (data: CreateActivityRequirementsRewardsFormValues) => {
    setRequirementsRewardsFormValues(data)
  }

  const handleComplete = () => {
    setOpen(true)
  }

  const handleDialogSuccessClick = () => {
    setOpen(false)
    router.push('/activities')
  }

  React.useEffect(() => {
    console.log(mainFormValues)
    console.log(requirementsRewardsFormValues)
    console.log(banner)
  }, [mainFormValues, banner, requirementsRewardsFormValues])

  const StepperButtons = () => {
    return (
      <CardActions>
        {activeStep == 0 ? (
          <Link href="/activities">
            <Button>Cancel</Button>
          </Link>
        ) : (
          <Button onClick={handleBack} color="secondary">
            Go Back
          </Button>
        )}
        {activeStep == steps.length - 1 ? (
          <Button onClick={handleComplete} variant="contained" color="primary" className="stepperButton">
            Complete
          </Button>
        ) : (
          <Button type="submit" variant="contained" color="primary" className="stepperButton">
            Next
          </Button>
        )}
      </CardActions>
    )
  }

  return (
    <Stack gap="24px" sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <DialogSuccess
        title="Activity Created"
        description="Your activity has been successfully created"
        open={open}
        onClickButton={handleDialogSuccessClick}
      />
      {activeStep == 0 && (
        <Stack gap="24px">
          <HeaderCard title="Activity Details" />
          <CreateActivityDetailForm submitHandler={handleDetailFormSubmit} />
        </Stack>
      )}
      {activeStep == 1 && (
        <Stack gap="24px">
          <HeaderCard title="Activity Image" />
          <CreateActivityBannerForm handleSubmit={handleBannerSubmit} handleBack={handleBack} />
        </Stack>
      )}
      {activeStep == 2 && (
        <Stack gap="24px">
          <HeaderCard title="Requirements & Rewards" />
          <CreateActivityRequirementsRewards>
            <StepperButtons />
          </CreateActivityRequirementsRewards>
        </Stack>
      )}
      {activeStep == 3 && (
        <Stack gap="24px">
          <HeaderCard title="Review" />
          <CreateActivityReview submitHandler={handleRequirementsRewardsFormSubmit}>
            <StepperButtons />
          </CreateActivityReview>
        </Stack>
      )}
    </Stack>
  )
}
