import { getAttendanceRequests, putAttendanceRequest } from '@/services/domain/attendanceRequests.service'
import { type AttendanceRequestResponse } from '@/types/activities'
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const activityId = searchParams.get('activity_id')

  return getAttendanceRequests(activityId as string)
}

export async function PUT(req: NextRequest) {
  const updatedAttendanceRequests = (await req.json()) as AttendanceRequestResponse[]
  return putAttendanceRequest(updatedAttendanceRequests)
}
