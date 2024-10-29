import MyActivitiesCard from '@/components/activities/MyActivities'
import HeaderCard from '@/components/common/cards/HeaderCard'
import { Button, Stack } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default function UpdateActivities() {
  return (
    <Stack gap={4}>
      <HeaderCard title="Select Activity To Update" />
      <MyActivitiesCard
        actions={
          <Link href="/activities">
            <Button>Go back</Button>
          </Link>
        }
        onlyShowOwnerActivities
      />
    </Stack>
  )
}
