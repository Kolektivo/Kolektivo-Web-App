'use client'

import * as React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import { CardActions, Link, Stack } from '@mui/material'
import HeaderCard from '@/components/common/cards/HeaderCard'
import CreateActivityMain from '../Main'
import CreateActivityImage from '../Image'
import CreateActivityRequirementsRewards from '../RequirementsRewards'
import CreateActivityReview from '../Review'
import CreatedActivityModal from '../Modal'

const steps = ['', '', '', '']

export default function CreateActivityStepper() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [open, setOpen] = React.useState<boolean>(false)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleComplete = () => {
    setOpen(true)
  }

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
          <Button onClick={handleNext} variant="contained" color="primary" className="stepperButton">
            Next
          </Button>
        )}
      </CardActions>
    )
  }

  return (
    <Stack gap="24px" sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <CreatedActivityModal open={open} setOpen={setOpen} />
      {activeStep == 0 && (
        <Stack gap="24px">
          <HeaderCard title="Activity Details" />
          <CreateActivityMain>
            <StepperButtons />
          </CreateActivityMain>
        </Stack>
      )}
      {activeStep == 1 && (
        <Stack gap="24px">
          <HeaderCard title="Activity Image" />
          <CreateActivityImage>
            <StepperButtons />
          </CreateActivityImage>
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
          <CreateActivityReview>
            <StepperButtons />
          </CreateActivityReview>
        </Stack>
      )}
    </Stack>
  )
}
