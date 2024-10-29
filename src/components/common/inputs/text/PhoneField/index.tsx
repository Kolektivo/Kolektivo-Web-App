import { TextField, type TextFieldProps } from '@mui/material'
import { forwardRef, type ReactElement } from 'react'
import { IMaskInput } from 'react-imask'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask="+#00 000000000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })} // eslint-disable-line
      overwrite
    />
  )
})

const PhoneField = (props: TextFieldProps): ReactElement => {
  const allProps = {
    ...props,
    slotProps: { ...props.slotProps, input: { ...props.slotProps?.input, inputComponent: TextMaskCustom as any } }, // eslint-disable-line
  }
  return <TextField {...allProps} />
}

export default PhoneField
