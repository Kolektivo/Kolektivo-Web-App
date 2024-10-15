import StatsCommunities from '@/components/communities/StatsCommunities'
import { Card, CardContent, CardHeader, Stack } from '@mui/material'
import { type Metadata } from 'next'
import CardsCommunities from '@/components/communities/CardsCommunities'

export const metadata: Metadata = {
  title: 'Communities',
}

export default function Page() {
  return (
    <Stack gap={4}>
      <StatsCommunities />
      <Card>
        <CardHeader title="Kolektivo Communities" />
        <CardContent>
          <CardsCommunities />
        </CardContent>
      </Card>
    </Stack>
  )
}
