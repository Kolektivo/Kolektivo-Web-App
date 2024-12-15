import { CardContent, Card, Typography, Stack, Link as MUILink, Button, Container } from '@mui/material'
import { type Metadata } from 'next'
import NextLink from 'next/link'
import Image from 'next/image'
import IconFacebook from '@/public/images/icons/facebook.svg?url'
import IconApple from '@/public/images/icons/apple.svg?url'
import EmailForm from '@/components/auth/signin/EmailForm'
import ButtonSignInGoogle from '@/components/auth/signin/ButtonSignInGoogle'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function Page() {
  return (
    <Container>
      <Stack gap={4} minWidth={{ xs: 450, md: 520 }}>
        <Card>
          <CardContent>
            <Typography variant="h2" mb={3}>
              Sign In
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New User?{' '}
              <MUILink component={NextLink} href="signup">
                Create an account
              </MUILink>
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Stack gap={4}>
              <EmailForm />
              <Typography variant="body2" align="center" color="text.secondary" sx={{ fontSize: '18px' }}>
                Or
              </Typography>
              <Stack gap={2}>
                <ButtonSignInGoogle up={false} />               
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  )
}
