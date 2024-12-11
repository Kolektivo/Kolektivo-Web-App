import HeaderCard from '@/components/common/cards/HeaderCard'
import { Card, CardContent, Typography, Stack, Container, TextField, Button, Box } from '@mui/material'
import { type Metadata } from 'next'
import Image from 'next/image'
import IconGoogle from '@/public/images/icons/google.svg?url'
import IconFacebook from '@/public/images/icons/facebook.svg?url'
import IconApple from '@/public/images/icons/apple.svg?url'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function Page() {
  return (
    <Container>
      <Stack gap={4} minWidth={{ xs: 450, md: 520 }}>
        <HeaderCard title="Sign Up" />
        <Card>
          <CardContent>
            <Stack gap={4}>
              <TextField label="Username" placeholder="Your username" />
              <TextField label="Email" placeholder="Email address" type="email" />
              <TextField label="Create a password" placeholder="Must be 8 characters" type="password" />
              <TextField label="Confirm password" placeholder="Repeat password" type="password" />
              <Link href="signup/choose-community">
                <Button variant="contained" fullWidth>
                  Sign Up
                </Button>
              </Link>
              <Typography variant="body2" align="center" color="text.secondary" sx={{ fontSize: '18px' }}>
                Or Sign Up with
              </Typography>
              <Stack direction="row" gap={2}>
                <Box flex={1}>
                  <Button fullWidth variant="outlinedGray">
                    <Image src={IconGoogle} alt="icon-google" width={24} height={24} />
                  </Button>
                </Box>               
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  )
}
