import { AttendanceRequestResponse } from "@/types/activities"
import { createAnonymousClient } from "@/utils/supabase/anonymousClient"
import { NextResponse } from "next/server"

const ATTENDANCEREQUESTS = 'attendance_requests'
const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || ''

export async function getAttendanceRequests(activityId: string) {
  console.log('Getting attendance requests')
  const supabaseClient = createAnonymousClient()
  const { data, error } = await supabaseClient.from(ATTENDANCEREQUESTS).select('*').eq('activity_id', activityId)
  if (error) return NextResponse.json(error)
  const attendanceRequestsWithProofImage = await Promise.all(
    data.map(async (request) => {
      const proofImage = await downloadFile(supabaseBucket, request.proof_image_path)
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
  const supabaseClient = createAnonymousClient()
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

async function downloadFile(bucketName: string, filePath: string) {
  console.log('Dowloading file')
  if (filePath == '' || !filePath) return ''
  const supabaseClient = createAnonymousClient()
  const { data, error } = await supabaseClient.storage.from(bucketName).download(filePath)

  if (error) {
    console.error('Error downloading file:', error.message)
  } else {
    const mimeType = filePath.endsWith('png') ? 'image/png' : 'image/jpeg'
    const base64 = await blobToImageSrc(data)
    const imageSource = `data:${mimeType};base64,${base64}`
    return imageSource
  }
}
async function blobToImageSrc(blob: Blob): Promise<string> {
  console.log('Converting blob to image')
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return buffer.toString('base64')
}