import { type MouseEventHandler, type ReactElement } from 'react'
import { Button, Card, CardActions, CardContent, Icon, InputAdornment, Stack, TextField } from '@mui/material'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { type OrganizationInfo } from '@/types/organization'
import HeaderCard from '@/components/common/cards/HeaderCard'

const formInfoSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  website: z.string().url().min(1),
  email: z.string().email().min(1),
  description: z.string().min(5),
  commitment: z.string(),
})

type OrganizationInfoFormProps = {
  defaultValues?: OrganizationInfo
  onCancel?: MouseEventHandler<HTMLButtonElement>
  onSubmit: SubmitHandler<OrganizationInfo>
}

const OrganizationInfoForm = ({ defaultValues, onCancel, onSubmit }: OrganizationInfoFormProps): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OrganizationInfo>({
    resolver: zodResolver(formInfoSchema),
    defaultValues,
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
              <TextField
                label="Location"
                placeholder="Enter location"
                slotProps={{
                  htmlInput: { ...register('location') },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>search</Icon>
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors?.location}
              ></TextField>
              <TextField
                label="Website"
                placeholder="Enter website URL"
                type="url"
                slotProps={{
                  htmlInput: { ...register('website') },
                }}
                error={!!errors?.website}
              ></TextField>
              <TextField
                label="Email"
                placeholder="Enter contact email"
                type="email"
                slotProps={{
                  htmlInput: { ...register('email') },
                }}
                error={!!errors?.email}
              ></TextField>
              <TextField
                label="Description"
                multiline
                placeholder="Describe your organization"
                slotProps={{
                  htmlInput: { ...register('description') },
                }}
                error={!!errors?.description}
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
