'use client'

import * as React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Stack } from '@mui/material'
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
import { useMemo } from 'react'

const steps = ['', '', '', '']

export default function CreateActivityStepper() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)

  const [detailFormValues, setDetailFormValues] = React.useState<CreateActivityDetailFormValues | null>(null)
  const [banner, setBanner] = React.useState<string>()
  const [requirementsRewardsFormValues, setRequirementsRewardsFormValues] =
    React.useState<CreateActivityRequirementsRewardsFormValues | null>(null)

  const getReview = (
    detailFormValues: CreateActivityDetailFormValues,
    banner: string,
    requirementsRewardsFormValues: CreateActivityRequirementsRewardsFormValues,
  ) => {
    return { detail: detailFormValues, banner, requirementsRewards: requirementsRewardsFormValues }
  }

  const review = useMemo(
    () =>
      getReview(
        detailFormValues as CreateActivityDetailFormValues,
        banner as string,
        requirementsRewardsFormValues as CreateActivityRequirementsRewardsFormValues,
      ),
    [detailFormValues, requirementsRewardsFormValues, banner],
  )

  const router = useRouter()

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const goToNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleDetailFormSubmit = (data: CreateActivityDetailFormValues) => {
    setDetailFormValues(data)
    goToNext()
  }

  const handleBannerSubmit = () => {
    setBanner('')
    goToNext()
  }

  const handleRequirementsRewardsFormSubmit = (data: CreateActivityRequirementsRewardsFormValues) => {
    setRequirementsRewardsFormValues(data)
    goToNext()
  }

  const handleComplete = () => {
    setOpenDialog(true)
  }

  const handleDialogSuccessClick = () => {
    setOpenDialog(false)
    router.push('/activities')
  }

  React.useEffect(() => {
    console.log(review)
  }, [review])

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
        open={openDialog}
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
          <CreateActivityRequirementsRewards
            submitHandler={handleRequirementsRewardsFormSubmit}
            backHandler={handleBack}
          />
        </Stack>
      )}
      {activeStep == 3 && (
        <Stack gap="24px">
          <HeaderCard title="Review" />
          <CreateActivityReview review={review} submitHandler={handleComplete} handleBack={handleBack} />
        </Stack>
      )}
    </Stack>
  )
}
