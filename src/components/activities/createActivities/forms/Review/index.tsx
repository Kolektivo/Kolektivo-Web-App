import { type CreateActivityRequirementsRewardsFormValues } from '@/types/activities'
import { type OrganizationInfo } from '@/types/organization'
import { Box, Card, CardContent, Divider, Icon, InputAdornment, Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { type ReactNode } from 'react'
import { type SubmitHandler } from 'react-hook-form'

type Props = {
  children: ReactNode
  submitHandler: SubmitHandler<CreateActivityRequirementsRewardsFormValues>
  defaultValues?: OrganizationInfo
}
export default function CreateActivityReview({ children }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack gap="48px">
          <Box
            width={285}
            height={160}
            sx={{ backgroundColor: '#F2F2F2', borderRadius: '12px' }}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Typography variant="subtitle2" textTransform="uppercase" color="#A9A9A9">
              Image
            </Typography>
          </Box>
          <TextField
            id="activityName"
            variant="outlined"
            label="What’s the name of your activity?"
            placeholder="Beach Cleanup"
          />
          <Stack gap="16px">
            <Typography variant="h3">When does your activity start and end?</Typography>
            <Stack direction="row" gap="16px">
              <TextField id="date" type="date" variant="outlined" placeholder="Date" />
              <TextField id="startTime" type="time" variant="outlined" placeholder="Start time" />
              <TextField id="endTime" type="time" variant="outlined" placeholder="End time" />
            </Stack>
          </Stack>
          <TextField
            id="location"
            type="search"
            variant="outlined"
            label="Where is it located?"
            placeholder="Enter location"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            id="activityName"
            variant="outlined"
            label="What can the attendee expect?"
            placeholder="Describe your activity"
            multiline
          />
          <TextField
            id="activityName"
            variant="outlined"
            label="What are the requirements for the attendee?"
            placeholder="Select requirement"
          />
          <TextField
            id="activityName"
            variant="outlined"
            label="How many Kolektivo Points can each attendee earn? "
            placeholder="Enter amount of points"
          />
          <TextField
            id="activityName"
            variant="outlined"
            label="Which stamps can the attendee earn?"
            placeholder="Select stamp"
          />
        </Stack>
      </CardContent>
      <Divider />
      {children}
    </Card>
  )
}
