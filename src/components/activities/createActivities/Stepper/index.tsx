'use client'

import * as React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Button, Stack } from '@mui/material'
import HeaderCard from '@/components/common/cards/HeaderCard'
import CreateActivityDetailForm from '../forms/Detail'
import CreateActivityBannerForm from '../forms/Banner'
import CreateActivityRequirementsRewards from '../forms/RequirementsRewards'
import DialogSuccess from '@/components/common/modals/DialogSuccess'
import { useRouter } from 'next/navigation'
import ActivityReview from '../forms/Review'
import {
  type CreateActivityRequirementsRewardsFormValues,
  type CreateActivityDetailFormValues,
  type ActivityReviewType,
} from '@/types/activities'
import { useMemo } from 'react'
import { useMutation } from '@tanstack/react-query'
import activitiesService from '@/features/activities/services/activities.service'
import LoadingButton from '@/components/common/buttons/LoadingButton'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { type User } from '@supabase/supabase-js'

const steps = ['', '', '', '']

export default function StepperActivitiesCreate() {
  const { user } = useAuth()
  const [step, setStep] = React.useState(0)
  const [openSuccessDialog, setOpenSuccessDialog] = React.useState<boolean>(false)

  const [detailFormValues, setDetailFormValues] = React.useState<CreateActivityDetailFormValues | null>(null)
  const [banner, setBanner] = React.useState<string>()
  const [requirementsRewardsFormValues, setRequirementsRewardsFormValues] =
    React.useState<CreateActivityRequirementsRewardsFormValues | null>(null)
  const [creatingActivity, setCreatingActivity] = React.useState<boolean>(false)

  const review = useMemo<ActivityReviewType>(
    () => ({
      ...(detailFormValues as CreateActivityDetailFormValues),
      banner: banner as string,
      ...(requirementsRewardsFormValues as CreateActivityRequirementsRewardsFormValues),
    }),
    [detailFormValues, banner, requirementsRewardsFormValues],
  )

  const { mutate } = useMutation({
    mutationFn: async (review: ActivityReviewType) => {
      setCreatingActivity(true)
      return await activitiesService.create(review, user as User)
    },
  })

  const router = useRouter()

  const handleBack = () => {
    setStep((prevActiveStep) => prevActiveStep - 1)
  }

  const goToNext = () => {
    setStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleDetailFormSubmit = (data: CreateActivityDetailFormValues) => {
    setDetailFormValues(data)
    goToNext()
  }

  const handleBannerSubmit = (img: string) => {
    setBanner(img)
    goToNext()
  }

  const handleRequirementsRewardsFormSubmit = (data: CreateActivityRequirementsRewardsFormValues) => {
    data.requirements = data.requirements
      .split(',')
      .filter((requirement) => requirement != '0')
      .join(',')
    setRequirementsRewardsFormValues(data)
    goToNext()
  }

  const handleComplete = () => {
    mutate(review, {
      onSuccess: () => {
        setCreatingActivity(false)
        setOpenSuccessDialog(true)
      },
      onError: () => {
        setCreatingActivity(false)
      },
    })
  }

  const handleDialogSuccessClick = () => {
    setOpenSuccessDialog(false)
    router.push('/activities')
  }

  return (
    <Stack gap="24px" sx={{ width: '100%' }}>
      <Stepper activeStep={step}>
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
        open={openSuccessDialog}
        onClickButton={handleDialogSuccessClick}
      />
      {step == 0 && (
        <Stack gap="24px">
          <HeaderCard title="Activity Details" />
          <CreateActivityDetailForm submitHandler={handleDetailFormSubmit} review={review} />
        </Stack>
      )}
      {step == 1 && (
        <Stack gap="24px">
          <HeaderCard title="Activity Image" />
          <CreateActivityBannerForm
            handleSubmit={handleBannerSubmit}
            handleBack={handleBack}
            reviewBanner={review.banner}
          />
        </Stack>
      )}
      {step == 2 && (
        <Stack gap="24px">
          <HeaderCard title="Requirements & Rewards" />
          <CreateActivityRequirementsRewards
            review={review}
            submitHandler={handleRequirementsRewardsFormSubmit}
            backHandler={handleBack}
          />
        </Stack>
      )}
      {step == 3 && (
        <Stack gap="24px">
          <HeaderCard title="Review" />
          <ActivityReview review={review}>
            <>
              <Button onClick={handleBack} color="secondary">
                Go Back
              </Button>
              {creatingActivity && (
                <LoadingButton loading variant="contained" color="primary" className="stepperButton">
                  Complete
                </LoadingButton>
              )}
              {!creatingActivity && (
                <Button
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  onClick={(_) => handleComplete()}
                  variant="contained"
                  color="primary"
                  className="stepperButton"
                  disabled={!review}
                >
                  Complete
                </Button>
              )}
            </>
          </ActivityReview>
        </Stack>
      )}
    </Stack>
  )
}
