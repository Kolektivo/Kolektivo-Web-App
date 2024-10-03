import { type MouseEventHandler, type ReactElement } from 'react'
import { Button, Card, CardActions, CardContent, Stack, TextField } from '@mui/material'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { type OrganizationInfo } from '@/types/organization'
import HeaderCard from '@/components/common/cards/HeaderCard'
import AutocompletePlaces from '@/components/common/inputs/autocomplete/AutocompletePlaces'

const formInfoSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  website: z.string().url({ message: 'Invalid url' }).min(1),
  email: z.string().email({ message: 'Invalid email address' }).min(1),
  description: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  commitment: z.string(),
})

type OrganizationInfoFormProps = {
  defaultValues?: OrganizationInfo
  onCancel?: MouseEventHandler<HTMLButtonElement>
  onSubmit: SubmitHandler<OrganizationInfo>
}

const OrganizationInfoForm = ({ defaultValues, onCancel, onSubmit }: OrganizationInfoFormProps): ReactElement => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OrganizationInfo>({
    resolver: zodResolver(formInfoSchema),
    defaultValues,
    mode: 'onBlur',
  })

  return (
    <Stack gap={4}>
      <HeaderCard title="Organization Info" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Stack maxWidth={592} gap={8}>
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
                    value={value}
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

export default OrganizationInfoForm
