import { type CreateActivityReviewType } from '@/types/activities'
import { type OrganizationInfo } from '@/types/organization'
import { Box, Card, CardActions, CardContent, Divider, Icon, InputAdornment, Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import Image from 'next/image'
import React, { type ReactNode } from 'react'

type Props = {
  review: CreateActivityReviewType
  defaultValues?: OrganizationInfo
  children: ReactNode
}
export default function ActivityReview({ review, children }: Props) {
  const formatRequirements = (requirements: string[]) => {
    console.log(requirements)
    if (requirements.length > 1) {
      return [requirements[0], ...requirements.slice(1).map((requirement) => ` ${requirement}`)]
    }
    return requirements[0]
  }

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
            value={review.detail.name}
            placeholder="Beach Cleanup"
          />
          <Stack gap="16px">
            <Typography variant="h3">When does your activity start and end?</Typography>
            <Stack direction="row" gap="16px">
              <TextField id="date" type="date" variant="outlined" placeholder="Date" value={review.detail.date} />
              <TextField
                id="startTime"
                type="time"
                variant="outlined"
                placeholder="Start time"
                value={review.detail.startTime}
              />
              <TextField
                id="endTime"
                type="time"
                variant="outlined"
                placeholder="End time"
                value={review.detail.endTime}
              />
            </Stack>
          </Stack>
          <TextField
            id="location"
            type="search"
            variant="outlined"
            label="Where is it located?"
            placeholder="Enter location"
            value={review.detail.location}
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
            value={review.detail.description}
            multiline
          />
          <TextField
            id="activityName"
            variant="outlined"
            label="What are the requirements for the attendee?"
            value={formatRequirements(review.requirementsRewards.requirements)}
            placeholder="Select requirement"
          />
          <TextField
            id="activityName"
            variant="outlined"
            label="How many Kolektivo Points can each attendee earn? "
            value={review.requirementsRewards.kolectivoPoints}
            placeholder="Enter amount of points"
          />
          <TextField
            id="activityName"
            variant="outlined"
            label="Which stamps can the attendee earn?"
            value={review.requirementsRewards.stamps}
            placeholder="Select stamp"
          />
        </Stack>
      </CardContent>
      <CardActions>{children}</CardActions>
      <Divider />
    </Card>
  )
}
