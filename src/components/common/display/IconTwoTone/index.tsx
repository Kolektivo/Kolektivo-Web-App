import { type ReactElement } from 'react'
import { Icon, type IconProps } from '@mui/material'

interface IconTwoToneProps extends IconProps {
  fill?: boolean
}

const IconTwoTone = ({ fill, children, ...props }: IconTwoToneProps): ReactElement => {
  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      {fill && (
        <Icon style={{ fontVariationSettings: '"FILL" 1', opacity: 0.3 }} {...props}>
          {children}
        </Icon>
      )}
      <Icon sx={{ position: fill ? 'absolute' : 'auto', left: 0 }} {...props}>
        {children}
      </Icon>
    </div>
  )
}

export default IconTwoTone
