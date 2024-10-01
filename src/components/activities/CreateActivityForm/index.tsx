import { Button, Card, CardContent, Divider, Link, Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import React from 'react'

export default function CreateActivityForm() {
  return (
    <Card>
      <CardContent sx={{ padding: '0px' }}>
        <Stack padding="24px">
          <Typography variant="h3">What’s the name of your activity?</Typography>
          <TextField id="activityName" variant="outlined" label="Beach Cleanup" />
        </Stack>
        <Stack padding="24px">
          <Typography variant="h3">When does your activity start and end?</Typography>
        </Stack>
        <Stack padding="24px">
          <Typography variant="h3">Where is it located?</Typography>
        </Stack>
        <Stack padding="24px">
          <Typography variant="h3">What can the attendee expect?</Typography>
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
