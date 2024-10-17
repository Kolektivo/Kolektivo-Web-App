'use client'
import { type AuthState, signIn } from '@/features/auth/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Stack, TextField } from '@mui/material'
import { useEffect, type ReactElement } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).min(1),
  password: z.string().min(3),
})

const EmailForm = (): ReactElement => {
  const initialState: AuthState = { error: false, message: null }
  const [state, formAction] = useFormState(signIn, initialState)
  const {
    register,
    resetField,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(formSignInSchema),
    mode: 'onTouched',
  })

  useEffect(() => {
    if (state.error) {
      resetField('password')
    }
  }, [state, resetField])

  return (
    <form action={formAction}>
      <Stack gap={4}>
        <TextField
          label="Email"
          placeholder="Email address"
          slotProps={{
            htmlInput: { ...register('email') },
          }}
          error={!!errors?.email}
        />
        <TextField
          label="Password"
          placeholder="Password"
          type="password"
          slotProps={{
            htmlInput: { ...register('password') },
          }}
          error={!!errors?.password}
        />
        {state.error && !isValid && (
          <Alert variant="outlined" severity="error">
            {state.message}
          </Alert>
        )}
        <Button variant="contained" type="submit" disabled={!isValid}>
          Log In
        </Button>
      </Stack>
    </form>
  )
}

export default EmailForm
