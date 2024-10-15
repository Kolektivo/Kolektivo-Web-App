import { requirementsOptions } from '@/constants/activities/commons'
import { type CreateActivityReviewType } from '@/types/activities'
import { type OrganizationInfo } from '@/types/organization'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Icon,
  InputAdornment,
  InputLabel,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import Image from 'next/image'
import React, { type ReactNode } from 'react'

type Props = {
  review: CreateActivityReviewType
  children: ReactNode
  defaultValues?: OrganizationInfo
}

export default function ActivityUpdate({ review, children }: Props) {
  return (
    <Card>
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
            <Image src={review.banner} alt="Selected" width={285} height={160} style={{ borderRadius: '12px' }} />
          </Box>
          <TextField
            id="activityName"
            variant="outlined"
            label="What’s the name of your activity?"
            value={review.name}
            placeholder="Beach Cleanup"
          />
          <Stack gap="16px">
            <Typography variant="h3">When does your activity start and end?</Typography>
            <Stack direction="row" gap="16px">
              <TextField id="date" type="date" variant="outlined" placeholder="Date" value={review.date} />
              <TextField
                id="startTime"
                type="time"
                variant="outlined"
                placeholder="Start time"
                value={review.startTime}
              />
              <TextField id="endTime" type="time" variant="outlined" placeholder="End time" value={review.endTime} />
            </Stack>
          </Stack>
          <TextField
            id="location"
            type="search"
            variant="outlined"
            label="Where is it located?"
            placeholder="Enter location"
            value={review.location}
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
            id="description"
            variant="outlined"
            label="What can the attendee expect?"
            placeholder="Describe your activity"
            value={review.description}
            multiline
          />
          <Box>
            <Box>
              <InputLabel>What are the requirements for the attendee?</InputLabel>
              <Stack gap="8px">
                {review.requirements.map((requirement, index) => (
                  <Stack key={index} direction="row" gap={2}>
                    <TextField
                      select
                      // onChange={(event) => handleRequirementsChange(event, index)}
                      // slotProps={{
                      //   htmlInput: { ...register('requirements') },
                      // }}
                      // error={!!errors.requirements}
                      value={requirement}
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
              // onClick={handleAddRequirement}
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
            label="Which stamps can the attendee earn?"
            value={review.stamps}
            placeholder="Select stamp"
          />
        </Stack>
      </CardContent>
      <CardActions>{children}</CardActions>
      <Divider />
    </Card>
  )
}
