import CardCommunity from '@/components/communities/CardsCommunities/CardCommunity'
import { type Community } from '@/types/communities'
import { Box, Radio } from '@mui/material'
import { type ReactElement } from 'react'

type OptionCommunityProps = {
  isOpacity?: boolean
  checked?: boolean
  onClick?: (community: Community) => void
  community: Community
}

const OptionCommunity = ({
  community,
  isOpacity = false,
  checked = false,
  onClick,
}: OptionCommunityProps): ReactElement => {
  const handleClick = () => {
    if (onClick) {
      onClick(community)
    }
  }

  return (
    <div onClick={handleClick}>
      <Box position="relative">
        <Box position="absolute" padding="20px" right={0} zIndex={10}>
          <Radio value={community.id} name="option-communities" checked={checked} />
        </Box>
        <Box sx={{ opacity: !checked && isOpacity ? 0.4 : 1 }}>
          <CardCommunity {...community} />
        </Box>
      </Box>
    </div>
  )
}

export default OptionCommunity
