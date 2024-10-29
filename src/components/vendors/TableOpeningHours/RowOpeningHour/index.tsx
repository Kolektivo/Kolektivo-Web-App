import { useEffect, useState, type ReactElement } from 'react'
import { TimePicker } from '@mui/x-date-pickers'
import RadioButton from '@/components/common/buttons/RadioButton'
import { type VendorOpeningHour } from '@/types/vendors'
import styles from '../styles.module.css'
import { Box } from '@mui/material'
import dayjs from 'dayjs'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

type RowOpeningHourProps = {
  value: VendorOpeningHour
  onChange?: (value: VendorOpeningHour | null) => void
  onBlur?: () => void
}

const RowOpeningHour = ({ value, onChange, onBlur }: RowOpeningHourProps): ReactElement => {
  const [state, setState] = useState({
    isClosed: value.isClosed,
    openingTime: dayjs(`2022-04-17T${value.openingTime}`),
    closingTime: dayjs(`2022-04-17T${value.closingTime}`),
  })

  const handleStateChange = (changes: Partial<typeof state>) => {
    setState((prev) => {
      return { ...prev, ...changes }
    })
  }

  useEffect(() => {
    if (onChange) {
      onChange({
        ...value,
        openingTime: state.openingTime.format('HH:mm'),
        closingTime: state.closingTime.format('HH:mm'),
        isClosed: state.isClosed,
      })
    }
  }, [state]) // eslint-disable-line

  return (
    <tr>
      <td className={styles.tableCell} style={{ width: '100%' }}>
        {days[value.day]}
      </td>
      <td className={styles.tableCell}>
        <Box paddingRight={2}>
          <TimePicker
            value={state.openingTime}
            onChange={(newValue) => newValue && handleStateChange({ openingTime: newValue })}
            sx={{ marginRight: 2 }}
            disabled={state.isClosed}
            slotProps={{
              inputAdornment: { position: 'start' },
              textField: { sx: { width: 166 }, onBlur },
            }}
          />
        </Box>
      </td>
      <td className={styles.tableCell}>
        <Box paddingRight={2}>
          <TimePicker
            value={state.closingTime}
            onChange={(newValue) => newValue && handleStateChange({ closingTime: newValue })}
            disabled={state.isClosed}
            slotProps={{
              inputAdornment: { position: 'start' },
              textField: { sx: { width: 166 }, onBlur },
            }}
          />
        </Box>
      </td>
      <td className={styles.tableCell}>
        <RadioButton
          value={state.isClosed}
          onChange={(closed) => handleStateChange({ isClosed: closed })}
          text="Closed"
        />
      </td>
    </tr>
  )
}

export default RowOpeningHour
