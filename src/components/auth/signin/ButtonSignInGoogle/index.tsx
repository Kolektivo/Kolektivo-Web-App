'use client'

import { signInWithGoogle } from '@/features/auth/actions'
import { type ReactElement, useState } from 'react'
import IconGoogle from '@/public/images/icons/google.svg?url'
import Image from 'next/image'
import LoadingButton from '@/components/common/buttons/LoadingButton'
import { Stack, Typography } from '@mui/material'

const ButtonSignInGoogle = ({ up }: { up: boolean }): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    setError(null)
    setLoading(true)
    const resp = await signInWithGoogle()
    setLoading(false)

    if (resp.error) {
      setError(resp.message ?? 'An error has occurred')
      return
    }

    window.location.assign(resp.data?.url ?? '/')
  }

  return (
    <Stack gap={1}>
      <LoadingButton
        onClick={handleSignIn}
        startIcon={<Image src={IconGoogle} alt="icon-google" width={24} height={24} />}
        variant="outlinedGray"
        loading={loading}
        fullWidth
        disabledMargin
      >
        {up ? '' : 'Continue with Google'}
      </LoadingButton>
      {error && (
        <Typography variant="body2" color="error" textAlign="center">
          {error}
        </Typography>
      )}
    </Stack>
  )
}

export default ButtonSignInGoogle
