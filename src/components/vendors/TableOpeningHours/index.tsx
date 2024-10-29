import { Box, Stack, Typography } from '@mui/material'
import { type ReactElement } from 'react'
import styles from './styles.module.css'
import { type VendorOpeningHour } from '@/types/vendors'
import { defaultOpeningHours } from '@/constants/vendors/create'
import RowOpeningHour from './RowOpeningHour'

type TableOpeningHours = {
  onChange?: (values: VendorOpeningHour[] | null) => void
  values?: readonly VendorOpeningHour[]
  onBlur?: () => void
}

const TableOpeningHours = ({ values = defaultOpeningHours, onChange, onBlur }: TableOpeningHours): ReactElement => {
  const handleChange = (newValue?: VendorOpeningHour | null) => {
    if (onChange) {
      if (!newValue) {
        onChange([...values])
        return
      }

      const newValueCopy = [...values]
      const day = newValue.day
      newValueCopy[day] = newValue
      onChange(newValueCopy)
    }
  }

  return (
    <Stack>
      <Typography variant="subtitle1" marginBottom={2}>
        Opening Hours
      </Typography>
      <Box>
        <table>
          <thead className={styles.tableHead}>
            <tr>
              <th>Day</th>
              <th>Opening time</th>
              <th>Closing time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {values.map((value: VendorOpeningHour, index) => (
              <RowOpeningHour key={index} value={value} onChange={handleChange} onBlur={onBlur} />
            ))}
          </tbody>
        </table>
      </Box>
    </Stack>
  )
}

export default TableOpeningHours
