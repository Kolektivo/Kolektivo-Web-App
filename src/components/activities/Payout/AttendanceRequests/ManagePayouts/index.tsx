'use client'

import { Box, Button, CardContent, Divider, TextField } from '@mui/material'
import ItemsCard from '@/components/common/cards/ItemsCard'
import { type AttendanceRequest } from '@/types/activities'
import ManagePayoutRequestCard from '@/components/activities/Payout/AttendanceRequests/ManagePayouts/RequestCard'
import { useForm } from 'react-hook-form'

type Props = {
  requests: AttendanceRequest[]
  setRequests: React.Dispatch<React.SetStateAction<AttendanceRequest[]>>
  handleBack: () => void
  handleNext: () => void
}

export default function ManagePayoutsCard({ requests, setRequests, handleBack, handleNext }: Props) {
  const { register, handleSubmit } = useForm<string[]>()
  const submitHandler = (event: { [key: number]: string }) => {
    const updatedRequests = [...requests]
    Object.keys(event).forEach((key) => {
      const numberKey = Number(key)
      updatedRequests[numberKey].payoutTransactionLink = event[numberKey]
    })
    setRequests(updatedRequests)
    handleNext()
  }
  if (!requests)
    return (
      <ItemsCard title="My Activities">
        {Array.from({ length: 3 }).map((_, index) => (
          <Box key={index}>
            <Divider />
            <Box paddingLeft={4}></Box>
          </Box>
        ))}
      </ItemsCard>
    )
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <ItemsCard
        title="Attendee"
        actions={
          <>
            <Button onClick={handleBack}>Go Back</Button>
            <Button type="submit" color="primary" variant="contained" className="stepperButton">
              Confirm
            </Button>
          </>
        }
      >
        {requests?.map((request, index) => {
          if (request.state)
            return (
              <Box key={index}>
                <Divider />
                <CardContent>
                  <ManagePayoutRequestCard request={request}>
                    <TextField
                      id="activityName"
                      variant="outlined"
                      placeholder="Transaction link"
                      slotProps={{
                        htmlInput: { ...register(`${index}`) },
                      }}
                      sx={{ width: '60%' }}
                    />
                  </ManagePayoutRequestCard>
                </CardContent>
              </Box>
            )
        })}
      </ItemsCard>
    </form>
  )
}
