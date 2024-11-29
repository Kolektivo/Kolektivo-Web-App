'use client'

import * as React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Stack } from '@mui/material'
import HeaderCard from '@/components/common/cards/HeaderCard'
import AttendanceRequestsSelectionCard from '../AttendanceRequests/SelectionCard'

const steps = Array.from({ length: 4 }, () => '')

export default function StepperActivitiesPayout() {
  const [step, setStep] = React.useState(0)

  const handleBack = () => {
    setStep((prevActiveStep) => prevActiveStep - 1)
  }

  const goToNext = () => {
    setStep((prevActiveStep) => prevActiveStep + 1)
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
      {step == 0 && (
        <Stack gap="24px">
          <HeaderCard
            title="Proof of completion"
            subtitle="Select the users you want to accept and payout rewards to"
          />
          <AttendanceRequestsSelectionCard />
        </Stack>
      )}
    </Stack>
  )
}
