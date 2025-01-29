'use client'

import { Communities } from '@/types/communities'
import { Stack, Card, CardHeader, CardContent, Skeleton } from '@mui/material'
import { type ReactElement } from 'react'
import CardsCommunities from '../CardsCommunities'
import StatsCommunities from '../StatsCommunities'
import ErrorDisplay from '@/components/common/display/ErrorDisplay'
import useSWR from 'swr'
import communitiesService from '@/features/communities/services/communities.service'

const StackCommunities = (): ReactElement => {
  const { data, error, isValidating, mutate } = useSWR('/api/communities', communitiesService.fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  })

  if (error) {
    return (
      <ErrorDisplay
        onClickButton={() => {
          mutate()
        }}
      />
    )
  }

  if (isValidating) {
    return (
      <Stack gap={4}>
        <StatsCommunities communities={undefined} />
        <Card>
          <CardHeader title="Kolektivo Communities" />
          <CardContent>
            <Skeleton width={800} height={180}></Skeleton>
          </CardContent>
        </Card>
      </Stack>
    )
  }

  if (data && data.communities && data.communities.length > 0) {
    return (
      <Stack gap={4}>
        <StatsCommunities communities={data!} />
        <Card>
          <CardHeader title="Kolektivo Communities" />
          <CardContent>
            <CardsCommunities communities={data!} />
          </CardContent>
        </Card>
      </Stack>
    )
  }
  return (
    <Stack gap={4}>
      <Card>
        <CardHeader title="Kolektivo Communities" />
        <CardContent></CardContent>
      </Card>
    </Stack>
  )
}

export default StackCommunities
