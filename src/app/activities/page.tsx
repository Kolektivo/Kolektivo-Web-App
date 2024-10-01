import ActivitiesActions from '@/components/activities/ActivitiesActions'
import MyActivitiesCard from '@/components/activities/MyActivities'
import { Stack } from '@mui/material'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activities',
}

export default function Activities() {
  return (
    <Stack gap={4}>
      <ActivitiesActions />
      <MyActivitiesCard />
    </Stack>
  )
}
