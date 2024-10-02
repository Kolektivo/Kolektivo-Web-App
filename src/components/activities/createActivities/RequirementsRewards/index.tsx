import { Button, Card, CardContent, Divider, Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function CreateActivityRequirementsRewards({ children }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack gap="48px">
          <TextField
            id="activityName"
            variant="outlined"
            label="What are the requirements for the attendee?"
            placeholder="Select requirement"
          />
          <Stack>
            <TextField
              id="activityName"
              variant="outlined"
              label="How many Kolektivo Points can each attendee earn? "
              placeholder="Enter amount of points"
            />
            <Button variant="contained" color="secondary" size="small">
              Add other requirement
            </Button>
          </Stack>
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
