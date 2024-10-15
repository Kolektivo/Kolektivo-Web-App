import { type Community } from '@/types/communities'
import CuracaoFlag from '@/public/images/communities/curacao_flag.png'
import trinidadFlag from '@/public/images/communities/trinidad_flag.png'

export const communities: Community[] = [
  {
    id: 'Trinidad',
    srcImage: trinidadFlag.src,
    name: 'Kolektivo Trinidad',
    members: 133,
    ktts: 2475,
  },
  {
    id: 'Curaçao',
    srcImage: CuracaoFlag.src,
    name: 'Kolektivo Curaçao',
    members: 62,
    ktts: 1450,
  },
]
