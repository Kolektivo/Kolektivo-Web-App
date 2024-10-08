import IconKtt from '@/components/common/display/IconKtt'
import { Paper, Stack, Typography, Icon } from '@mui/material'
import { type ReactElement } from 'react'

type CardCommunityProps = {
  srcImage: string
  name: string
  members: number
  ktts: number
}

const CardCommunity = ({ srcImage, name, members, ktts }: CardCommunityProps): ReactElement => {
  const textColor = '#FFF'

  return (
    <Paper
      style={{
        backgroundImage: `url(${srcImage})`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Stack justifyContent="space-between" padding="20px" sx={{ minHeight: '168px' }}>
        <Typography variant="subtitle1" color={textColor}>
          {name}
        </Typography>
        <Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <Icon sx={{ fontSize: '32px', lineHeight: '32px', color: textColor }}>groups</Icon>
            <Typography variant="subtitle1" color={textColor} sx={{ height: '18px' }}>
              {members}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <IconKtt />
            <Typography variant="subtitle1" color={textColor} sx={{ height: '18px' }}>
              {ktts}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default CardCommunity
