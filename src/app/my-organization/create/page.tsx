import { Typography } from '@mui/material'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Organization',
}

export default async function Page() {
  return <Typography variant="h1">Create</Typography>
}
