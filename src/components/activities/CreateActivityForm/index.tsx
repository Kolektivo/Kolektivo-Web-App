import { Button, Card, CardContent, Divider, Icon, InputAdornment, Link, Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import React from 'react'

export default function CreateActivityForm() {
  return (
    <Card>
      <CardContent sx={{ padding: '0px' }}>
        <Stack padding="24px">
          <TextField
            id="activityName"
            variant="outlined"
            label="What’s the name of your activity?"
            placeholder="Beach Cleanup"
          />
        </Stack>
        <Stack padding="24px" gap="16px">
          <Typography variant="h3">When does your activity start and end?</Typography>
          <Stack direction="row" gap="16px">
            <TextField id="date" type="date" variant="outlined" placeholder="Date" />
            <TextField id="startTime" type="time" variant="outlined" placeholder="Start time" />
            <TextField id="endTime" type="time" variant="outlined" placeholder="End time" />
          </Stack>
        </Stack>
        <Stack padding="24px">
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
        </Stack>
        <Stack padding="24px">
          <TextField
            id="activityName"
            variant="outlined"
            label="What can the attendee expect?"
            placeholder="Describe your activity"
            multiline
          />
        </Stack>
        <Divider />
        <Stack direction="row" padding="24px 24px 0px 24px" justifyContent="end">
          <Link href="/activities">
            <Button>Cancel</Button>
          </Link>
          <Link href="/activities">
            <Button color="secondary">Next</Button>
          </Link>
        </Stack>
      </CardContent>
    </Card>
  )
}
