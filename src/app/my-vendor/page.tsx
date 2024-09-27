import { Typography } from '@mui/material'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Vendor',
}

export default function Page() {
  return <Typography variant="h2">My Vendor Page</Typography>
}
