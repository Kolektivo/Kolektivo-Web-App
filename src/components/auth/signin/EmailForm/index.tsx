import { login } from '@/features/auth/actions'
import { Button, Stack, TextField } from '@mui/material'
import { type ReactElement } from 'react'

const EmailForm = (): ReactElement => {
  return (
    <form action={login}>
      <Stack gap={4}>
        <TextField name="email" label="Email" placeholder="Email address" />
        <TextField name="password" label="Password" placeholder="Password" type="password" />
        <Button variant="contained" type="submit">
          Log In
        </Button>
      </Stack>
    </form>
  )
}

export default EmailForm
