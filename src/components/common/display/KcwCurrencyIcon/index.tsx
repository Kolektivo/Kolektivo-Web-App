import Image from 'next/image'
import { type ReactElement } from 'react'
import kttIcon from '@/public/images/kcwcurrency.svg?url'

const KcwCurrencyIcon = ({ size = 32 }: { size?: number }): ReactElement => {
  return <Image src={kttIcon} alt="ktt" height={size} width={size} />
}

export default KcwCurrencyIcon
