'use client'

import * as React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Button, Stack, Typography } from '@mui/material'
import HeaderCard from '@/components/common/cards/HeaderCard'
import AttendanceRequestsSelectionCard from '@/components/activities/Payout/AttendanceRequests/SelectionCard'
import { type AttendanceRequest } from '@/types/activities'
import ManagePayoutsCard from '@/components/activities/Payout/AttendanceRequests/ManagePayouts'

const steps = Array.from({ length: 4 }, () => '')

export default function StepperActivitiesPayout() {
  const [step, setStep] = React.useState<number>(0)
  const [attendanceRequests, setAttendanceRequests] = React.useState<AttendanceRequest[]>([
    {
      user: 'Luuk Weber',
      checkIn: '10:01AM',
      checkOut: '12:01AM',
      address: '0x23523535d3Dd121865956F7845g3523f33f17394',
      Poc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using. Helped Yolanda with the trash bag transportation to the nearest desp',
      PocImage: '',
      forManagePayout: false,
      payoutTransactionLink: '',
    },
    {
      user: 'Jhonny Bobs',
      checkIn: '10:01AM',
      checkOut: '12:01AM',
      address: '0x23523535d3Dd121865956F7845g3523f33f17394',
      Poc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using. Helped Yolanda with the trash bag transportation to the nearest desp',
      PocImage: 'imagen',
      forManagePayout: false,
      payoutTransactionLink: '',
    },
    {
      user: 'Yolanda Wiel',
      checkIn: '10:01AM',
      checkOut: '12:01AM',
      address: '0x23523535d3Dd121865956F7845g3523f33f17394',
      Poc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using. Helped Yolanda with the trash bag transportation to the nearest desp',
      PocImage: '',
      forManagePayout: false,
      payoutTransactionLink: '',
    },
  ])

  const attendanceRequestsForManagePayouts = React.useMemo(
    () => attendanceRequests.filter((request) => request.forManagePayout),
    [attendanceRequests],
  )

  const handleBack = () => {
    setStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNext = () => {
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
          <AttendanceRequestsSelectionCard requests={attendanceRequests} setRequests={setAttendanceRequests}>
            <Button
              color="primary"
              variant="contained"
              className="stepperButton"
              onClick={handleNext}
              disabled={!(attendanceRequestsForManagePayouts.length > 0)}
            >
              Aprove
            </Button>
          </AttendanceRequestsSelectionCard>
        </Stack>
      )}
      {step == 1 && (
        <Stack gap="24px">
          <HeaderCard
            title="Manage Payouts"
            subtitleComponent={
              <Stack gap="4px" marginTop={4}>
                <Typography variant="body1" color="text.secondary">
                  1. Send Kolektivo Points and Stamps to the users through the Safe Wallet
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  2. Paste the transaction link for each user OR paste a bulk transaction link
                </Typography>
              </Stack>
            }
          />
          <ManagePayoutsCard
            requests={attendanceRequests}
            setRequests={setAttendanceRequests}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </Stack>
      )}
    </Stack>
  )
}
