import { type ReactElement } from 'react'
import { Icon, InputAdornment, Stack, TextField } from '@mui/material'

const OrganizationInfo = (): ReactElement => {
  return (
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
  )
}

export default OrganizationInfo
