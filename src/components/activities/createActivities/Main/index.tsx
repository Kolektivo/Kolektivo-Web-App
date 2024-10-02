import { Card, CardContent, Divider, Icon, InputAdornment, Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function CreateActivityMain({ children }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack gap="48px">
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
        </Stack>
      </CardContent>
      <Divider />
      {children}
    </Card>
  )
}
