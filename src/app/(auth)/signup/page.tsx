'use client'
import HeaderCard from '@/components/common/cards/HeaderCard'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, Typography, Stack, Container, TextField, Button, Box, Alert } from '@mui/material'
import ButtonSignInGoogle from '@/components/auth/signin/ButtonSignInGoogle'
import { useEffect, useState, useTransition, type ReactElement } from 'react'
import { AuthState, signUp } from '@/features/auth/actions'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import LoadingButton from '@/components/common/buttons/LoadingButton'

const formSignUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email({ message: 'Invalid email address' }).min(1),
  password: z.string().min(6),
})

export default function Page() {
  const [state, setState] = useState<AuthState>({ error: false, message: null })
  const [isPending, startTransition] = useTransition()
  const {
    register,
    resetField,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(formSignUpSchema),
    mode: 'onTouched',
  })

  useEffect(() => {
    if (state?.error) {
      resetField('password')
    }
  }, [state, resetField])
  const handleSubmit = async (data: FormData) => {
    startTransition(async () => {
      const resp = await signUp(data)
      setState(resp)
    })
    // <Link href="signup/choose-community">

    //window.location.assign(resp.data?.url ?? '/')
  }
  return (
    <Container>
      <form action={handleSubmit}>
        <Stack gap={4} minWidth={{ xs: 450, md: 520 }}>
          <HeaderCard title="Sign Up" />
          <Card>
            <CardContent>
              <Stack gap={4}>
                <TextField
                  label="Name"
                  placeholder="Your name"
                  slotProps={{
                    htmlInput: { ...register('name') },
                  }}
                  error={!!errors?.name}
                />
                <TextField
                  label="Email"
                  placeholder="Email address"
                  type="email"
                  slotProps={{
                    htmlInput: { ...register('email') },
                  }}
                  error={!!errors?.email}
                />
                <TextField
                  label="Create a password"
                  placeholder="Must be 8 characters"
                  type="password"
                  slotProps={{
                    htmlInput: { ...register('password') },
                  }}
                  error={!!errors?.password}
                />
                <TextField label="Confirm password" placeholder="Repeat password" type="password" />

                <LoadingButton variant="contained" fullWidth type="submit" loading={isPending} disabled={!isValid}>
                  Sign Up
                </LoadingButton>
                {state?.error && !isValid && (
                  <Alert variant="outlined" severity="error">
                    {state.message}
                  </Alert>
                )}
                <Typography variant="body2" align="center" color="text.secondary" sx={{ fontSize: '18px' }}>
                  Or Sign Up with
                </Typography>
                <Stack direction="row" gap={2}>
                  <Box flex={1}>
                    <ButtonSignInGoogle up={true} />
                  </Box>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </form>
    </Container>
  )
}
