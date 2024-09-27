import { type ReactElement } from 'react'
import { Icon, type IconProps } from '@mui/material'

const IconTwoTone = (props: IconProps): ReactElement => {
  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <Icon style={{ fontVariationSettings: '"FILL" 1', opacity: 0.3 }} {...props}>
        {props.children}
      </Icon>
      <Icon sx={{ position: 'absolute', left: 0 }} {...props}>
        {props.children}
      </Icon>
    </div>
  )
}

export default IconTwoTone
