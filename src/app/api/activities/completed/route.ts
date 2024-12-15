import { getCompletedActivities, putCompletedActivitie } from '@/services/domain/activities.service';
import { ActivityType } from '@/types/activities';
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') ?? '1')
    return getCompletedActivities(page)
}

export async function PUT(req: NextRequest) {
  const updatedActivity = (await req.json()) as ActivityType
  return putCompletedActivitie(updatedActivity)
}

