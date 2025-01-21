import { AttendanceRequestResponse } from "@/types/activities"
import bucket from "@/utils/supabase/bucket"
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

const ATTENDANCEREQUESTS = 'attendance_requests'

export async function getAttendanceRequests(activityId: string) {
  console.log('Getting attendance requests')
  const supabaseClient = await createClient()
  const { data, error } = await supabaseClient.from(ATTENDANCEREQUESTS).select('*').eq('activity_id', activityId)
  if (error) return NextResponse.json(error)
  const attendanceRequestsWithProofImage = await Promise.all(
    data.map(async (request) => {
      const proofImage = await bucket.downloadFile(request.proof_image_path)
      return { ...request, proof_image: proofImage }
    }),
  )
  return NextResponse.json(attendanceRequestsWithProofImage)
}

export async function putAttendanceRequest(updatedAttendanceRequests: AttendanceRequestResponse[]) {
  console.log('Updating attendance requests')
  const response = updatedAttendanceRequests.map((attendanceRequest) => {
    const update = async () => {
      return await updateAttendanceRequest(attendanceRequest)
    }
    return update()
  })
  return NextResponse.json(response)
}

async function updateAttendanceRequest(attendanceRequest: AttendanceRequestResponse) {
  console.log('Updating attendance request')
  const supabaseClient = await createClient()
  const { proof_image, ...attendanceRequestWhitoutProofImage } = attendanceRequest
  console.log('Removed ', proof_image?.substring(0, 10))

  const { data, error } = await supabaseClient
    .from(ATTENDANCEREQUESTS)
    .update(attendanceRequestWhitoutProofImage)
    .eq('id', attendanceRequestWhitoutProofImage.id)
    .select()
  console.log('Data: ', data, 'Error: ', error)
  return { data, error }
}

