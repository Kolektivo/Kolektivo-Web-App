import type { NextRequest } from 'next/server'
import { type ActivityType } from '@/types/activities'
import { deleteActivity, getActivities, postActivity, putActivity } from '@/services/domain/activities.service'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const hostId = searchParams.get('hostId')
  return getActivities(hostId as string, id as string)
}

export async function POST(req: NextRequest) {
  const newActivity = (await req.json()) as ActivityType
  return postActivity(newActivity)
}

export async function PUT(req: NextRequest) {
  const updatedActivity = (await req.json()) as ActivityType
  return putActivity(updatedActivity)
}

export async function DELETE(req: NextRequest) {
  const id = await req.json().then((body) => body.id)
  return deleteActivity(id)
}

