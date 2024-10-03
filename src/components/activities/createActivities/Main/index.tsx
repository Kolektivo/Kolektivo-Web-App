import { Card, CardContent, Divider, Icon, InputAdornment, Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import * as z from 'zod'
import React, { type ReactNode } from 'react'
import type { OrganizationInfo } from '@/types/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const formMainSchema = z.object({
  name: z.string().min(3),
  date: z.date(),
  startTime: z.string().time({ precision: 3 }),
  endTime: z.string().time({ precision: 3 }),
  location: z.string().min(3),
  description: z.string().min(12),
})

type Props = {
  children: ReactNode
  defaultValues?: OrganizationInfo
}

export default function CreateActivityMain({ children, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OrganizationInfo>({
    resolver: zodResolver(formMainSchema),
    defaultValues,
  })
  return (
    <Card>
      <CardContent>
        <Stack gap="48px">
          <TextField
            id="activityName"
            variant="outlined"
            label="What’s the name of your activity?"
            placeholder="Beach Cleanup"
          />
          <Stack gap="16px">
            <Typography variant="h3">When does your activity start and end?</Typography>
            <Stack direction="row" gap="16px">
              <TextField
                label="Date"
                slotProps={{
                  inputLabel: { variant: 'filled' },
                  input: {
                    type: 'date',
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>event</Icon>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Start time"
                slotProps={{
                  inputLabel: { variant: 'filled' },
                  input: {
                    type: 'time',
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>schedule</Icon>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="End time"
                slotProps={{
                  inputLabel: { variant: 'filled' },
                  input: {
                    type: 'time',
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>schedule</Icon>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
          </Stack>
          <TextField
            id="location"
            type="search"
            variant="outlined"
            label="Where is it located?"
            placeholder="Enter location"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            id="activityName"
            variant="outlined"
            label="What can the attendee expect?"
            placeholder="Describe your activity"
            multiline
          />
        </Stack>
      </CardContent>
      <Divider />
      {children}
    </Card>
  )
}
