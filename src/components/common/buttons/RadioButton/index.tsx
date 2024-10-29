'use client'

import { ButtonBase, Typography } from '@mui/material'
import { type ReactElement } from 'react'
import Image from 'next/image'
import checkOff from '@/public/images/icons/checkbox/check-off.svg?url'
import checkOn from '@/public/images/icons/checkbox/check-on.svg?url'

type RadioButtonProps = {
  text: string
  value?: boolean
  onChange?: (checked: boolean) => void
}

const RadioButton = ({ text, value = false, onChange }: RadioButtonProps): ReactElement => {
  const handleClick = () => {
    if (onChange) {
      onChange(!value)
    }
  }

  const checkIcon = value ? checkOn : checkOff

  return (
    <ButtonBase onClick={handleClick} sx={{ padding: 2, gap: 1, bgcolor: 'background.default', borderRadius: 1 }}>
      <Image src={checkIcon} alt="radio" height={24} width={24}></Image>
      <Typography variant="body2" fontWeight={700}>
        {text}
      </Typography>
    </ButtonBase>
  )
}

export default RadioButton
