import ItemsCard from '@/components/common/cards/ItemsCard'
import { Box, Button, CardContent, Divider, MenuItem, TextField } from '@mui/material'
import React, { type ChangeEvent } from 'react'
import DeniedRequestCard from '@/components/activities/Payout/AttendanceRequests/ManageDeniedRequests/Card/Request'
import { type AttendanceRequest } from '@/types/activities'
import { useForm } from 'react-hook-form'
import { denialReasons } from '@/constants/activities/payout/deniedRequests'
import { useRouter } from 'next/navigation'
import attendanceRequestsService from '@/features/activities/services/attendanceRequests.service'

type Props = {
  requests: AttendanceRequest[]
  setRequests: React.Dispatch<React.SetStateAction<AttendanceRequest[]>>
  handleNext: () => void
}

export default function DeniedRequestsCard({ requests, setRequests, handleNext }: Props) {
  const { register, handleSubmit } = useForm<string[]>()
  const router = useRouter()

  const handleRequirementsChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const {
      target: { value },
    } = event
    const updatedRequests = [...requests]
    updatedRequests[index].denialReason = value
    updatedRequests[index].state = 'denied'
    setRequests(updatedRequests)
  }

  const handleConfirm = () => {
    attendanceRequestsService.setAttendanceRequest(requests)
    handleNext()
  }

  const handleSkip = () => {
    router.push('/activities')
  }
  return (
    <form onSubmit={handleSubmit(handleConfirm)}>
      <ItemsCard
        title="Attendee"
        actions={
          <>
            <Button onClick={handleSkip}>Skip for now</Button>
            <Button type="submit" color="primary" variant="contained" className="stepperButton">
              Confirm
            </Button>
          </>
        }
      >
        {requests?.map((request, index) => {
          if (request.state == 'denied' || request.state == '')
            return (
              <Box key={index}>
                <Divider />
                <CardContent>
                  <DeniedRequestCard request={request}>
                    <TextField
                      select
                      value={request.denialReason != '' ? request.denialReason : '0'}
                      onChange={(event) => handleRequirementsChange(event, index)}
                      sx={{ width: '60%' }}
                      slotProps={{
                        htmlInput: { ...register(`${index}`) },
                      }}
                    >
                      <MenuItem disabled value="0">
                        Select reason for denying rewards
                      </MenuItem>
                      {denialReasons.map((requirementOption) => (
                        <MenuItem
                          key={requirementOption.value}
                          disabled={requirementOption.disabled}
                          value={requirementOption.value}
                        >
                          {requirementOption.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </DeniedRequestCard>
                </CardContent>
              </Box>
            )
        })}
      </ItemsCard>
    </form>
  )
}
