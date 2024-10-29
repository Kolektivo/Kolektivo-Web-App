import HeaderCard from '@/components/common/cards/HeaderCard'
import AutocompletePlaces from '@/components/common/inputs/autocomplete/AutocompletePlaces'
import PhoneField from '@/components/common/inputs/text/PhoneField'
import { vendorsCategories, wifiAvailability } from '@/constants/vendors/create'
import { vendorInfoSchema } from '@/features/vendors/validations'
import { type Vendor } from '@/types/vendors'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardActions, CardContent, MenuItem, Stack, TextField } from '@mui/material'
import { type MouseEventHandler, type ReactElement, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import TableOpeningHours from '../../TableOpeningHours'
import UploadImage from '@/components/common/inputs/image/UploadImage'
import LoadingButton from '@/components/common/buttons/LoadingButton'

type UpdateVendorFormProps = {
  defaultValues?: Vendor
  onDelete?: MouseEventHandler<HTMLButtonElement>
  onSave: (data: Vendor) => void
  saving: boolean
}

const UpdateVendorForm = ({ defaultValues, onDelete, onSave, saving }: UpdateVendorFormProps): ReactElement => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Vendor>({
    resolver: zodResolver(vendorInfoSchema),
    defaultValues,
    mode: 'onBlur',
  })
  const [logoBase64, setLogoBase64] = useState<string | null>(defaultValues?.logoSrc || null)

  const handleChangeLogo = (image: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setLogoBase64(reader.result?.toString() ?? null)
    }
    reader.readAsDataURL(image)
  }

  const handleSave = (data: Vendor) => {
    data.logoSrc = logoBase64!
    data.id = defaultValues?.id
    onSave(data)
  }

  return (
    <Stack gap={4}>
      <HeaderCard title="Update Fields" />
      <form onSubmit={handleSubmit(handleSave)}>
        <Card>
          <CardContent>
            <Stack maxWidth={592} gap={8}>
              <UploadImage
                placeholder="Vendor Logo"
                previewBase64={defaultValues?.logoSrc ?? undefined}
                onChangeImage={handleChangeLogo}
              />
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
            {onDelete && (
              <Button onClick={onDelete} variant="contained" color="error">
                Delete
              </Button>
            )}
            <LoadingButton loading={saving} type="submit" variant="contained" disabled={!isValid}>
              Save
            </LoadingButton>
          </CardActions>
        </Card>
      </form>
    </Stack>
  )
}

export default UpdateVendorForm
