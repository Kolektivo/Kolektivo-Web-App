import { getCompletedActivities } from '@/services/domain/activities.service';
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') ?? '1')
    return getCompletedActivities(page)
}

