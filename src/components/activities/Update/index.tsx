import LoadingButton from '@/components/common/buttons/LoadingButton'
import AutocompletePlaces from '@/components/common/inputs/autocomplete/AutocompletePlaces'
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
import Image from 'next/image'
import React, { type ChangeEvent, useEffect } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

type Props = {
  review: ActivityReviewType
  submitHandler: SubmitHandler<ActivityReviewType>
  deleteHandler: () => void
  onExecution: boolean
}

export default function ActivityUpdate({ review, submitHandler, deleteHandler, onExecution }: Props) {
  const [requirements, setRequirements] = React.useState<string>(review.requirements)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ActivityReviewType>({
    resolver: zodResolver(reviewFormSchema),
    mode: 'onBlur',
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
    console.log('Requirements select change')
    const {
      target: { value },
    } = event
    if (requirements.includes(value)) {
      return
    }
    const updatedRequirements = requirements.split(',')
    updatedRequirements[index] = value

    const updatedRequirementsStr = updatedRequirements.join(',')

    console.log('UpdatedRequirementsStr: ', updatedRequirementsStr)

    cleanDisabledRequirementsOptions()

    updateDisabledRequirementsOptions(updatedRequirementsStr)

    setRequirements(updatedRequirementsStr)
  }

  const handleAddRequirement = () => {
    if (requirements.split(',').length < requirementsOptions.length) setRequirements(`${requirements},0`)
  }

  // const handleRemoverequirements = (_: unknown, index: number) => {
  //   if (requirements.length > 1) {
  //     const updatedRequirements = requirements.filter((_, i) => i !== index)
  //     setRequirements(updatedRequirements)
  //   } else {
  //     setRequirements(['0'])
  //   }
  // }

  useEffect(() => {
    cleanDisabledRequirementsOptions()
    updateDisabledRequirementsOptions(review.requirements)
  }, [review])

  return (
    <Card>
      <form onSubmit={handleSubmit((data) => submitHandler({ ...data, requirements }))}>
        <CardContent>
          <Stack gap="48px">
            <Box
              width={285}
              height={160}
              sx={{ backgroundColor: '#F2F2F2', borderRadius: '12px' }}
              justifyContent="center"
              alignItems="center"
              display="flex"
            >
              {review.banner ? (
                <Image src={review.banner} alt="Selected" width={285} height={160} style={{ borderRadius: '12px' }} />
              ) : (
                <Stack
                  sx={{ backgroundColor: '#F2F2F2', borderRadius: '12px' }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography fontWeight={700} fontSize={20} textTransform="uppercase" color="#A9A9A9">
                    Activity Banner
                  </Typography>
                </Stack>
              )}
            </Box>
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
                <TextField
                  id="date"
                  type="date"
                  variant="outlined"
                  placeholder="Date"
                  defaultValue={new Date(review.date).toISOString().split('T')[0]}
                  slotProps={{
                    htmlInput: { ...register('date') },
                  }}
                  error={!!errors?.date}
                />
                <TextField
                  id="startTime"
                  type="time"
                  variant="outlined"
                  placeholder="Start time"
                  defaultValue={new Date(review.startTime).toISOString().split('T')[1].substring(0, 5)}
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
                  defaultValue={new Date(review.endTime).toISOString().split('T')[1].substring(0, 5)}
                  slotProps={{
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
              defaultValue={review.description}
              multiline
              slotProps={{
                htmlInput: { ...register('description') },
              }}
              error={!!errors?.description}
            />
            <Box>
              <Box>
                <InputLabel>What are the requirements for the attendee?</InputLabel>
                <Stack gap="8px">
                  {requirements.split(',').map((requirement, index) => (
                    <Stack key={index} direction="row" gap={2}>
                      <TextField
                        select
                        onChange={(event) => handleRequirementsChange(event, index)}
                        slotProps={{
                          htmlInput: { ...register('requirements') },
                        }}
                        error={!!errors.requirements}
                        defaultValue={requirement}
                        sx={{ width: '100%' }}
                      >
                        <MenuItem disabled value="0">
                          Select requirement
                        </MenuItem>
                        {requirementsOptions.map((requirementOption) => (
                          <MenuItem
                            key={requirementOption.value}
                            disabled={requirementOption.disabled}
                            value={requirementOption.value}
                          >
                            {requirementOption.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      {/* {requirements.length > 1 && (
                          <Button onClick={(event) => handleRemoverequirements(event, index)} sx={{ padding: '8px' }}>
                            <Icon>close</Icon>
                          </Button>
                        )} */}
                    </Stack>
                  ))}
                </Stack>
              </Box>
              <Button
                onClick={handleAddRequirement}
                variant="contained"
                color="secondary"
                size="small"
                sx={{ marginTop: '16px', padding: '6px 12px' }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                  <Icon color="primary" sx={{ fontSize: '16px', lineHeight: '16px' }}>
                    add_circle
                  </Icon>
                  <Typography fontWeight={700} fontSize={14}>
                    Add other requirement
                  </Typography>
                </Stack>
              </Button>
            </Box>
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
          {onExecution && (
            <>
              <LoadingButton loading variant="contained" color="warningButton" className="stepperButton">
                Delete
              </LoadingButton>
              <LoadingButton loading variant="contained" color="primary" className="stepperButton">
                Save
              </LoadingButton>
            </>
          )}
          {!onExecution && (
            <>
              <Button onClick={deleteHandler} variant="contained" color="warningButton">
                Delete
              </Button>
              <Button type="submit" variant="contained" color="primary" className="stepperButton" disabled={!isValid}>
                Save
              </Button>
            </>
          )}
        </CardActions>
        <Divider />
      </form>
    </Card>
  )
}
