import LoadingButton from '@/components/common/buttons/LoadingButton'
import AutocompletePlaces from '@/components/common/inputs/autocomplete/AutocompletePlaces'
import UploadImage from '@/components/common/inputs/image/UploadImage'
import { requirementsOptions, stampsOptions } from '@/constants/activities/commons'
import { reviewFormSchema } from '@/constants/activities/create/schemas'
import { type ActivityReviewType } from '@/types/activities'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Icon,
  InputLabel,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { type ChangeEvent, useEffect, useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

type Props = {
  review: ActivityReviewType
  submitHandler: SubmitHandler<ActivityReviewType>
  deleteHandler: () => void
  deleting: boolean
  saving: boolean
}

export default function ActivityUpdate({ review, submitHandler, deleteHandler, deleting, saving }: Props) {
  const [requirements, setRequirements] = React.useState<string>(review.requirements)
  const [banner, setBanner] = useState<string>(review.banner)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<ActivityReviewType>({
    resolver: zodResolver(reviewFormSchema),
    mode: 'all',
    defaultValues: {
      ...review,
      date: new Date(review.date).toISOString().slice(0, 10),
    },
  })

  const cleanDisabledRequirementsOptions = () => {
    requirementsOptions.forEach((requirementOption) => {
      requirementOption.disabled = false
    })
  }

  function updateDisabledRequirementsOptions(updatedRequirements: string) {
    updatedRequirements.split(',').forEach((requirement) => {
      const selectedRequirementOptionIndex = requirementsOptions.findIndex(
        (requirementOption) => requirementOption.value == requirement,
      )
      if (selectedRequirementOptionIndex != -1) {
        requirementsOptions[selectedRequirementOptionIndex].disabled = true
      }
    })
  }

  const handleRequirementsChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const {
      target: { value },
    } = event
    if (requirements.includes(value)) {
      return
    }
    const updatedRequirements = requirements.split(',')
    updatedRequirements[index] = value

    const updatedRequirementsStr = updatedRequirements.join(',')

    cleanDisabledRequirementsOptions()

    updateDisabledRequirementsOptions(updatedRequirementsStr)

    setRequirements(updatedRequirementsStr)
  }

  const handleAddRequirement = () => {
    if (requirements.split(',').length < requirementsOptions.length) setRequirements(`${requirements},0`)
  }

  const handleBannerChange = (img: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setBanner(reader.result as string)
    }

    reader.readAsDataURL(img)
  }

  useEffect(() => {
    console.log('errors:', errors)
  }, [errors])

  useEffect(() => {
    cleanDisabledRequirementsOptions()
    updateDisabledRequirementsOptions(review.requirements)
  }, [review])
  useEffect(() => {
    console.log('StartTime: ', review.startTime)
  }, [review])
  console.log('Date:', new Date(review.date).toISOString().slice(0, 10))
  return (
    <Card>
      <form onSubmit={handleSubmit((data) => submitHandler({ ...data, requirements, banner }))}>
        <input type="hidden" {...register('latitude')} />
        <input type="hidden" {...register('longitude')} />
        <CardContent>
          <Stack gap="48px">
            <UploadImage onChangeImage={handleBannerChange} previewBase64={banner} />

            <TextField
              id="activityName"
              variant="outlined"
              label="What’s the name of your activity?"
              defaultValue={review.name}
              placeholder="Beach Cleanup"
              slotProps={{
                htmlInput: { ...register('name') },
              }}
              error={!!errors?.name}
            />
            <Stack gap="16px">
              <Typography variant="h3">When does your activity start and end?</Typography>
              <Stack direction="row" gap="16px">
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="date"
                      type="date"
                      variant="outlined"
                      placeholder="Date"
                      error={!!errors?.date}
                    />
                  )}
                />

                <TextField
                  id="startTime"
                  type="time"
                  variant="outlined"
                  placeholder="Start time"
                  defaultValue={review.startTime}
                  slotProps={{
                    htmlInput: { ...register('startTime') },
                  }}
                  error={!!errors?.startTime}
                />
                <TextField
                  id="endTime"
                  type="time"
                  variant="outlined"
                  placeholder="End time"
                  defaultValue={review.endTime}
                  slotProps={{
                    htmlInput: { ...register('endTime') },
                  }}
                  error={!!errors?.endTime}
                />
              </Stack>
            </Stack>

            <Controller
              control={control}
              name="location"
              rules={{ required: true }}
              defaultValue={review.location}
              render={({ field: { onChange, onBlur, value } }) => (
                <AutocompletePlaces
                  label="Where is it located?"
                  placeholder="Enter location"
                  onChange={(val) => {
                    onChange(val)
                  }}
                  onLatLngChange={(lat, lng) => {
                    setValue('latitude', lat)
                    setValue('longitude', lng)
                  }}
                  onBlur={onBlur}
                  value={value ?? ''}
                  lat={review.latitude}
                  lng={review.longitude}
                  error={!!errors?.location}
                />
              )}
            />

            <TextField
              id="description"
              variant="outlined"
              label="What can the attendee expect?"
              placeholder="Describe your activity"
              defaultValue={review.description}
              multiline
              slotProps={{
                htmlInput: { ...register('description') },
              }}
              error={!!errors?.description}
            />
            <TextField
              id="activityName"
              variant="outlined"
              label="How many Kolektivo Points can each attendee earn? "
              placeholder="Enter amount of points"
              defaultValue={review.kolectivoPoints}
              slotProps={{
                htmlInput: { ...register('kolectivoPoints') },
              }}
              error={!!errors?.kolectivoPoints}
            />
            <TextField
              select
              label="Which stamps can the attendee earn?"
              defaultValue={review.stamps}
              sx={{ width: '100%' }}
              slotProps={{
                htmlInput: { ...register('stamps') },
              }}
              error={!!errors?.stamps}
            >
              <MenuItem disabled value="0">
                Select stamp
              </MenuItem>
              {stampsOptions.map((stampOption) => (
                <MenuItem key={stampOption.value} disabled={stampOption.disabled} value={stampOption.value}>
                  {stampOption.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </CardContent>
        <CardActions>
          {deleting && (
            <LoadingButton loading variant="contained" color="warningButton" className="stepperButton">
              Delete
            </LoadingButton>
          )}
          {!deleting && (
            <Button onClick={deleteHandler} variant="contained" color="warningButton" disabled={saving || !isValid}>
              Delete
            </Button>
          )}
          {!saving && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="stepperButton"
              disabled={!isValid || deleting}
            >
              Save
            </Button>
          )}
          {saving && (
            <LoadingButton loading variant="contained" color="primary" className="stepperButton">
              Save
            </LoadingButton>
          )}
        </CardActions>
        <Divider />
      </form>
    </Card>
  )
}
