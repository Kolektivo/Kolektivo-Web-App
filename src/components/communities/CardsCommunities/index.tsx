import { type ReactElement } from 'react'
import CardCommunity from '@/components/communities/CardsCommunities/CardCommunity'
import { Stack } from '@mui/material'
import { communities } from '@/constants/communities/main'

const CardsCommunities = (): ReactElement => {
  return (
    <Stack direction={{ sx: 'column', md: 'row' }} gap={4}>
      {communities.map((community) => (
        <CardCommunity key={community.id} {...community} />
      ))}
    </Stack>
  )
}

export default CardsCommunities
