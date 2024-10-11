import { Card, CardContent, Typography, Stack } from '@mui/material'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function Page() {
  return (
    <Stack gap={4}>
      <Card>
        <CardContent>
          <Typography variant="h2">Sign Up</Typography>
        </CardContent>
      </Card>
    </Stack>
  )
}
