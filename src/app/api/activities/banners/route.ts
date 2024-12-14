import { getActivitiesBanners } from '@/services/domain/activities.service'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json() as any
  console.log('ActivitiesData: ', data)
  return getActivitiesBanners(data)
}
