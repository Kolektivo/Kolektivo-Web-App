'use client'

import { type ReactElement } from 'react'
import { Button, Card, CardActions, CardContent, Stack, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { type Organization } from '@/types/organization'
import HeaderCard from '@/components/common/cards/HeaderCard'
import AutocompletePlaces from '@/components/common/inputs/autocomplete/AutocompletePlaces'
import UploadImage from '@/components/common/inputs/image/UploadImage'
import { useState } from 'react'
import LoadingButton from '@/components/common/buttons/LoadingButton'

const formInfoSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  website: z.string().url({ message: 'Invalid url' }).min(1),
  email: z.string().email({ message: 'Invalid email address' }).min(1),
  description: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  commitment: z.string(),
})

type OrganizationInfoFormProps = {
  defaultValues?: Organization
  onSave: (data: Organization) => void
  saving: boolean
}

const UpdateOrganizationForm = ({ defaultValues, onSave, saving }: OrganizationInfoFormProps): ReactElement => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Organization>({
    resolver: zodResolver(formInfoSchema),
    defaultValues,
    mode: 'onBlur',
  })
  const [logoBase64, setLogoBase64] = useState<string | null>(defaultValues?.logoSrc || null)

  const handleChangeLogo = (image: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = () => {
      setLogoBase64(reader.result?.toString() ?? null)
    }
  }

  const handleSave = (data: Organization) => {
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
                placeholder="Organization Logo"
                previewBase64={defaultValues?.logoSrc ?? undefined}
                onChangeImage={handleChangeLogo}
              />
              <TextField
                label="Name"
                placeholder="Enter organization name"
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
              <TextField
                label="Email"
                placeholder="Enter contact email"
                type="email"
                slotProps={{
                  htmlInput: { ...register('email') },
                }}
                error={!!errors?.email}
                helperText={errors?.email?.message}
              ></TextField>
              <TextField
                label="Description"
                multiline
                placeholder="Describe your organization"
                slotProps={{
                  htmlInput: { ...register('description') },
                }}
                error={!!errors?.description}
                helperText={errors?.description?.message}
              ></TextField>
              <TextField
                label="Commitment"
                multiline
                placeholder="Outline your organization's commitment"
                slotProps={{
                  htmlInput: { ...register('commitment') },
                }}
                error={!!errors?.commitment}
              ></TextField>
            </Stack>
          </CardContent>
          <CardActions>
            {saving ? (
              <LoadingButton loading variant="contained" color="primary" className="stepperButton">
                Save
              </LoadingButton>
            ) : (
              <Button type="submit" variant="contained" disabled={!isValid}>
                Save
              </Button>
            )}
          </CardActions>
        </Card>
      </form>
    </Stack>
  )
}

export default UpdateOrganizationForm
