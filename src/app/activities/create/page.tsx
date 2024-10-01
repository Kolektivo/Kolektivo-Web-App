import CreateActivityForm from '@/components/activities/CreateActivityForm'
import { Card, CardHeader, Stack } from '@mui/material'
import React from 'react'

export default function CreateActivity() {
  return (
    <Stack gap="24px">
      <Card>
        <CardHeader title="Activity Details" />
      </Card>
      <CreateActivityForm />
    </Stack>
  )
}
