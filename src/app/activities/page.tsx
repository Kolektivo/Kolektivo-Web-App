import ActivitiesActions from '@/components/activities/actions/Actions'
import MyActivitiesCard from '@/components/activities/myActivities/Activities'
import { Stack } from '@mui/material'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activities',
}

export default function Activities() {
  return (
    <Stack gap="24px">
      <ActivitiesActions />
      <MyActivitiesCard />
    </Stack>
  )
}
