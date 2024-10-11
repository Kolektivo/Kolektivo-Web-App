import { CardContent, Card, Typography, Stack } from '@mui/material'
import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function Page() {
  return (
    <Stack gap={4}>
      <Card>
        <CardContent>
          <Typography variant="h2" mb={3}>
            Sign Up
          </Typography>
          <Typography variant="body2">
            New User? <Link href="signup">Create an account</Link>
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  )
}
