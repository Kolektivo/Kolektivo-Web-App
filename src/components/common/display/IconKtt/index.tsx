import Image from 'next/image'
import { type ReactElement } from 'react'
import kttIcon from '@/public/images/ktt.svg'

const IconKtt = ({ size = 32 }: { size?: number }): ReactElement => {
  return <Image src={kttIcon} alt="ktt" height={size} width={size}></Image>
}

export default IconKtt
