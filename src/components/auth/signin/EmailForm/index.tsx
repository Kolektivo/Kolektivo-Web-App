'use client'
import LoadingButton from '@/components/common/buttons/LoadingButton'
import { type AuthState, signIn } from '@/features/auth/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Stack, TextField } from '@mui/material'
import { useEffect, useState, useTransition, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).min(1),
  password: z.string().min(3),
})

const EmailForm = (): ReactElement => {
  const [state, setState] = useState<AuthState>({ error: false, message: null })
  const [isPending, startTransition] = useTransition()
  const {
    register,
    resetField,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(formSignInSchema),
    mode: 'onTouched',
  })

  useEffect(() => {
    if (state?.error) {
      resetField('password')
    }
  }, [state, resetField])

  const handleSubmit = async (data: FormData) => {
    startTransition(async () => {
      const resp = await signIn(data)
      setState(resp)
    })
  }

  return (
    <form action={handleSubmit}>
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
        {state?.error && !isValid && (
          <Alert variant="outlined" severity="error">
            {state.message}
          </Alert>
        )}
        <LoadingButton
          variant="contained"
          type="submit"
          loading={isPending}
          disabled={!isValid}
          fullWidth
          disabledMargin
        >
          Log In
        </LoadingButton>
      </Stack>
    </form>
  )
}

export default EmailForm
