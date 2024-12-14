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
import React, { type ChangeEvent, useEffect } from 'react'
import { requiremetsRewardsFormSchema } from '@/constants/activities/create/schemas'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ActivityReviewType, CreateActivityRequirementsRewardsFormValues } from '@/types/activities'
import { requirementsOptions, stampsOptions } from '@/constants/activities/commons'

type Props = {
  review: ActivityReviewType
  submitHandler: SubmitHandler<CreateActivityRequirementsRewardsFormValues>
  backHandler: () => void
}

export default function CreateActivityRequirementsRewards({ review, submitHandler, backHandler }: Props) {
  const [requirements, setRequirements] = React.useState<string>(review.requirements || '0')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateActivityRequirementsRewardsFormValues>({
    resolver: zodResolver(requiremetsRewardsFormSchema),
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
  }, [])

  return (
    <Card>
      <form onSubmit={handleSubmit((data) => submitHandler({ ...data, requirements }))}>
        <CardContent>
          <Box width="64%">
            <Stack gap="48px">
              <TextField
                id="activityName"
                variant="outlined"
                label="How many Kolektivo Points can each attendee earn? "
                placeholder="Enter amount of points"
                defaultValue={review.kolectivoPoints ?? '0'}
                slotProps={{
                  htmlInput: { ...register('kolectivoPoints') },
                }}
                error={!!errors?.kolectivoPoints}
              />
              <TextField
                select
                label="Which stamps can the attendee earn?"
                defaultValue={review.stamps ?? '0'}
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
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button onClick={backHandler} color="secondary">
            Go Back
          </Button>
          <Button type="submit" variant="contained" color="primary" className="stepperButton" disabled={!isValid}>
            Next
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
