import HeaderCard from '@/components/common/cards/HeaderCard'
import { Button, Card, CardActions, CardContent, Icon, InputAdornment, Stack, TextField } from '@mui/material'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Organization',
}

export default async function Page() {
  return (
    <Stack gap={4}>
      <HeaderCard title="Organization Info" />
      <Card>
        <CardContent>
          <Stack maxWidth={592} gap={8}>
            <TextField label="Name" placeholder="Enter organization name"></TextField>
            <TextField
              label="Location"
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
            ></TextField>
            <TextField label="Website" placeholder="Enter website URL" type="url"></TextField>
            <TextField label="Email" placeholder="Enter contact email" type="email"></TextField>
            <TextField label="Description" multiline placeholder="Describe your organization"></TextField>
            <TextField label="Commitment" multiline placeholder="Outline your organization's commitment"></TextField>
          </Stack>
        </CardContent>
        <CardActions>
          <Button>Cancel</Button>
          <Button variant="contained" disabled>
            Next
          </Button>
        </CardActions>
      </Card>
    </Stack>
  )
}
