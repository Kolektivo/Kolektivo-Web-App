import { type ReactElement } from 'react'
import CardCommunity from '@/components/communities/CardsCommunities/CardCommunity'
import { Stack } from '@mui/material'
import { Communities } from '@/types/communities'

const CardsCommunities = ({communities} : {communities: Communities}): ReactElement => {
  return (
    <Stack direction={{ sx: 'column', md: 'row' }} gap={4}>
      {communities.communities.map((community) => (
        <CardCommunity key={community.id} {...community} />
      ))}
    </Stack>
  )
}

export default CardsCommunities
