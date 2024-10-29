import HeaderCard from '@/components/common/cards/HeaderCard'
import { type VendorInfo } from '@/types/vendors'
import { Stack, Card, CardContent, TextField, MenuItem, Button, CardActions } from '@mui/material'
import { type MouseEventHandler, type ReactElement } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import AutocompletePlaces from '@/components/common/inputs/autocomplete/AutocompletePlaces'
import PhoneField from '@/components/common/inputs/text/PhoneField'
import { vendorsCategories, wifiAvailability } from '@/constants/vendors/create'
import TableOpeningHours from '../../TableOpeningHours'
import { regexHour } from '@/utils/constants/regex'

const formInfoSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  website: z.string().url({ message: 'Invalid url' }).min(1),
  phone: z.string().min(5),
  category: z.string().min(2),
  wifiAvailability: z.string().min(2),
  openingHours: z.array(
    z.object({
      day: z.number(),
      openingTime: z.string().regex(regexHour),
      closingTime: z.string().regex(regexHour),
      isClosed: z.boolean(),
    }),
  ),
})

type VendorInfoFormProps = {
  defaultValues?: VendorInfo
  onCancel?: MouseEventHandler<HTMLButtonElement>
  onSubmit: SubmitHandler<VendorInfo>
}

const VendorInfoForm = ({ defaultValues, onCancel, onSubmit }: VendorInfoFormProps): ReactElement => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<VendorInfo>({
    resolver: zodResolver(formInfoSchema),
    defaultValues,
    mode: 'onBlur',
  })

  return (
    <Stack gap={4}>
      <HeaderCard title="Vendor Info" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Stack maxWidth={592} gap={8}>
              <TextField
                label="Name"
                placeholder="Vendor name"
                slotProps={{
                  htmlInput: { ...register('name') },
                }}
                error={!!errors?.name}
              ></TextField>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <AutocompletePlaces
                    label="Location"
                    placeholder="Enter location"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ?? ''}
                    error={!!errors?.location}
                  />
                )}
                name="location"
              />
              <TextField
                label="Website"
                placeholder="Enter website URL"
                type="url"
                slotProps={{
                  htmlInput: { ...register('website') },
                }}
                error={!!errors?.website}
                helperText={errors?.website?.message}
              ></TextField>
              <PhoneField
                label="Phone"
                placeholder="+599 99"
                slotProps={{
                  htmlInput: { ...register('phone') },
                }}
                error={!!errors?.phone}
              />
              <TextField
                select
                label="Category"
                defaultValue={defaultValues?.category ?? '0'}
                slotProps={{
                  htmlInput: { ...register('category') },
                }}
                error={!!errors?.category}
              >
                <MenuItem disabled value="0">
                  Select vendor category
                </MenuItem>
                {vendorsCategories.map((stampOption) => (
                  <MenuItem key={stampOption.value} value={stampOption.value}>
                    {stampOption.label}
                  </MenuItem>
                ))}
              </TextField>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                name="openingHours"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TableOpeningHours
                    values={value}
                    onBlur={onBlur}
                    onChange={(value) => {
                      onChange(value)
                    }}
                  />
                )}
              />
              <TextField
                select
                label="Wi-Fi availability"
                defaultValue={defaultValues?.wifiAvailability ?? '0'}
                slotProps={{
                  htmlInput: { ...register('wifiAvailability') },
                }}
                error={!!errors?.wifiAvailability}
              >
                <MenuItem disabled value="0">
                  Select availability
                </MenuItem>
                {wifiAvailability.map((stampOption) => (
                  <MenuItem key={stampOption.value} value={stampOption.value}>
                    {stampOption.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </CardContent>
          <CardActions>
            {onCancel && <Button onClick={onCancel}>Cancel</Button>}
            <Button type="submit" variant="contained" disabled={!isValid}>
              Next
            </Button>
          </CardActions>
        </Card>
      </form>
    </Stack>
  )
}

export default VendorInfoForm
