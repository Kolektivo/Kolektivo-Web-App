import { type ReactElement } from 'react'
import CuracaoFlag from '@/public/images/communities/curacao_flag.png'
import trinidadFlag from '@/public/images/communities/trinidad_flag.png'
import CardCommunity from '@/components/communities/CardsCommunities/CardCommunity'
import { Stack } from '@mui/material'

const CardsCommunities = (): ReactElement => {
  return (
    <Stack direction={{ sx: 'column', md: 'row' }} gap={4}>
      <CardCommunity srcImage={trinidadFlag.src} name="Kolektivo Trinidad" members={133} ktts={2475} />
      <CardCommunity srcImage={CuracaoFlag.src} name="Kolektivo Curaçao" members={62} ktts={1450} />
    </Stack>
  )
}

export default CardsCommunities
