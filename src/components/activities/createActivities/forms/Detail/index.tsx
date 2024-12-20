import { Button, Card, CardActions, CardContent, Divider, Link, Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { type ActivityReviewType, type CreateActivityDetailFormValues } from '@/types/activities'
import { detailFormShema } from '@/constants/activities/create/schemas'
import AutocompletePlaces from '@/components/common/inputs/autocomplete/AutocompletePlaces'

type Props = {
  review: ActivityReviewType
  submitHandler: SubmitHandler<CreateActivityDetailFormValues>
}

export default function CreateActivityDetailForm({ review, submitHandler }: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateActivityDetailFormValues>({
    resolver: zodResolver(detailFormShema),
    mode: 'all',
  })
  
  return (
    <Card>
      <form onSubmit={handleSubmit(submitHandler)}>
        <CardContent>
          <Stack gap="48px">
            <TextField
              id="activityName"
              variant="outlined"
              label="What’s the name of your activity?"
              placeholder="Beach Cleanup"
              defaultValue={review.name}
              slotProps={{
                htmlInput: { ...register('name') },
              }}
              error={!!errors?.name}
            />
            <Stack gap="16px">
              <Typography variant="h3">When does your activity start and end?</Typography>
              <Stack direction="row" gap="16px">
                <TextField
                  label="Date"
                  defaultValue={review.date}
                  slotProps={{
                    inputLabel: { variant: 'filled' },
                    input: {
                      type: 'date',
                    },
                    htmlInput: { ...register('date') },
                  }}
                  error={!!errors?.date}
                />
                <TextField
                  label="Start time"
                  defaultValue={review.startTime}
                  slotProps={{
                    inputLabel: { variant: 'filled' },
                    input: {
                      type: 'time',
                    },
                    htmlInput: { ...register('startTime') },
                  }}
                  error={!!errors?.startTime}
                />
                <TextField
                  label="End time"
                  defaultValue={review.endTime}
                  slotProps={{
                    inputLabel: { variant: 'filled' },
                    input: {
                      type: 'time',
                    },
                    htmlInput: { ...register('endTime') },
                  }}
                  error={!!errors?.endTime}
                />
              </Stack>
            </Stack>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={review.location}
              render={({ field: { onChange, onBlur, value } }) => (
                <AutocompletePlaces
                  label="Where is it located?"
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
              id="description"
              variant="outlined"
              label="What can the attendee expect?"
              placeholder="Describe your activity"
              multiline
              defaultValue={review.description}
              error={!!errors?.description}
              slotProps={{
                htmlInput: { ...register('description') },
              }}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Link href="/activities">
            <Button>Cancel</Button>
          </Link>
          <Button type="submit" variant="contained" color="primary" className="stepperButton" disabled={!isValid}>
            Next
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
