'use client'

import * as React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Button, Stack } from '@mui/material'
import HeaderCard from '@/components/common/cards/HeaderCard'
import AttendanceRequestsSelectionCard from '@/components/activities/Payout/AttendanceRequests/SelectionCard'
import { type AttendanceRequest } from '@/types/activities'

const steps = Array.from({ length: 4 }, () => '')

export default function StepperActivitiesPayout() {
  const [step, setStep] = React.useState(0)
  const [attendanceRequests, setAttendanceRequests] = React.useState<AttendanceRequest[]>([
    {
      user: 'Luuk Weber',
      checkIn: '10:01AM',
      checkOut: '12:01AM',
      Poc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using. Helped Yolanda with the trash bag transportation to the nearest desp',
      PocImage: '',
      forManagePayout: false,
    },
    {
      user: 'Jhonny Bobs',
      checkIn: '10:01AM',
      checkOut: '12:01AM',
      Poc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using. Helped Yolanda with the trash bag transportation to the nearest desp',
      PocImage: 'imagen',
      forManagePayout: false,
    },
    {
      user: 'Yolanda Wiel',
      checkIn: '10:01AM',
      checkOut: '12:01AM',
      Poc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using. Helped Yolanda with the trash bag transportation to the nearest desp',
      PocImage: '',
      forManagePayout: false,
    },
  ])
  const attendenceRequestsForManagePayout = React.useMemo<AttendanceRequest[]>(
    () => attendanceRequests.filter((request) => request.forManagePayout),
    [attendanceRequests],
  )

  const handleBack = () => {
    setStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNext = () => {
    setStep((prevActiveStep) => prevActiveStep + 1)
  }

  React.useEffect(() => {
    console.log(step)
  }, [step])

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
          <AttendanceRequestsSelectionCard requests={attendanceRequests} setRequests={setAttendanceRequests}>
            <Button
              color="primary"
              variant="contained"
              className="stepperButton"
              onClick={handleNext}
              disabled={!(attendenceRequestsForManagePayout.length > 0)}
            >
              Aprove
            </Button>
          </AttendanceRequestsSelectionCard>
        </Stack>
      )}
    </Stack>
  )
}
