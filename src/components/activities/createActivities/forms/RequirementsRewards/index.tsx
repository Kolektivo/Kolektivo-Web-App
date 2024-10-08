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
  Select,
  type SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { useEffect } from 'react'
// import { requiremetsRewardsFormSchema } from '@/constants/activities/create/schemas'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
import type { CreateActivityRequirementsRewardsFormValues } from '@/types/activities'

type Props = {
  submitHandler: SubmitHandler<CreateActivityRequirementsRewardsFormValues>
  backHandler: () => void
}

const requirementsOptions = [
  {
    value: 'Requirement1',
    label: 'Requirement 1',
    disabled: false,
  },
  {
    value: 'Requirement2',
    label: 'Requirement 2',
    disabled: false,
  },
  {
    value: 'Requirement3',
    label: 'Requirement 3',
    disabled: false,
  },
]

const stampsOptions = [
  {
    value: 'Stamp1',
    label: 'Stamp 1',
    disabled: false,
  },
  {
    value: 'Stamp2',
    label: 'Stamp 2',
    disabled: false,
  },
  {
    value: 'Stamp3',
    label: 'Stamp3',
    disabled: false,
  },
]

export default function CreateActivityRequirementsRewards({ submitHandler, backHandler }: Props) {
  const [requirements, setRequirements] = React.useState<string[]>(['0'])
  const [stamps, setStamps] = React.useState<string>('0')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateActivityRequirementsRewardsFormValues>({
    // resolver: zodResolver(requiremetsRewardsFormSchema),
    mode: 'onBlur',
  })

  const handleRequirementsChange = (event: SelectChangeEvent<string>, index: number) => {
    console.log('Requirements select change')
    const {
      target: { value },
    } = event
    if (requirements.includes(value)) {
      return
    }

    const updatedRequirements = [...requirements]
    updatedRequirements[index] = value

    console.log('Value: ' + value)

    requirementsOptions.forEach((requirementOption) => {
      requirementOption.disabled = false
    })

    updatedRequirements.forEach((requirement) => {
      const selectedRequirementOptionIndex = requirementsOptions.findIndex(
        (requirementOption) => requirementOption.value == requirement,
      )
      console.log('selectedRequirementOptionIndex: ' + selectedRequirementOptionIndex)
      if (selectedRequirementOptionIndex != -1) {
        requirementsOptions[selectedRequirementOptionIndex].disabled = true
      }
    })

    setRequirements(updatedRequirements)
  }

  const handleStampsChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event
    setStamps(value)
    setValue('stamps', value)
  }

  const handleAddRequirement = () => {
    if (requirements.length <= requirementsOptions.length) setRequirements([...requirements, '0'])
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
    if (requirements.includes('0')) {
      setValue('requirements', [])
    } else {
      setValue('requirements', requirements)
    }
    console.log('Requirements: ', requirements)
  }, [setValue, requirements])

  useEffect(() => {
    console.log('Is valid: ' + isValid)
  }, [isValid])

  return (
    <Card>
      <form onSubmit={handleSubmit(submitHandler)}>
        <CardContent>
          <Box width="64%">
            <Stack gap="48px">
              <Box>
                <Box>
                  <InputLabel>What are the requirements for the attendee?</InputLabel>
                  <Stack gap="16px">
                    {requirements.map((requirement, index) => (
                      <Stack key={index} direction="row" gap={2}>
                        <Select onChange={(event) => handleRequirementsChange(event, index)} value={requirement}>
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
                        </Select>
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
              <Stack gap="16px">
                <TextField
                  id="activityName"
                  variant="outlined"
                  label="How many Kolektivo Points can each attendee earn? "
                  placeholder="Enter amount of points"
                  slotProps={{
                    htmlInput: { ...register('kolectivoPoints') },
                  }}
                  error={!!errors?.kolectivoPoints}
                />
              </Stack>
              <Box>
                <InputLabel>Which stamps can the attendee earn?</InputLabel>
                <Select onChange={handleStampsChange} value={stamps}>
                  <MenuItem disabled value="0">
                    Select stamp
                  </MenuItem>
                  {stampsOptions.map((stampOption) => (
                    <MenuItem key={stampOption.value} disabled={stampOption.disabled} value={stampOption.value}>
                      {stampOption.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Stack>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button onClick={backHandler} color="secondary">
            Go Back
          </Button>
          <Button type="submit" variant="contained" color="primary" className="stepperButton">
            Next
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
