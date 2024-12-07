import { type AttendanceRequestResponse } from '@/types/activities'
import { createClient } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const ATTENDANCEREQUESTS = 'attendance_requests'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const activityId = searchParams.get('activity_id')
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
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

export async function PUT(req: NextRequest) {
  const updatedAttendanceRequests = (await req.json()) as AttendanceRequestResponse[]
  const response = updatedAttendanceRequests.map((attendanceRequest) => {
    const update = async () => {
      return await updateAttendanceRequest(attendanceRequest)
    }
    return update()
  })
  return NextResponse.json(response)
}

async function updateAttendanceRequest(attendanceRequest: AttendanceRequestResponse) {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { proof_image, ...attendanceRequestWhitoutProofImage } = attendanceRequest
  console.log('Removed ', proof_image?.substring(0, 10))
  console.log('AttendanceRequest: ', attendanceRequestWhitoutProofImage)

  const { data, error } = await supabaseClient
    .from(ATTENDANCEREQUESTS)
    .update(attendanceRequestWhitoutProofImage)
    .eq('id', attendanceRequestWhitoutProofImage.id)
    .select()
  console.log('Data: ', data, 'Error: ', error)
  return { data, error }
}

async function downloadFile(bucketName: string, filePath: string) {
  if (filePath == '' || !filePath) return ''
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabaseClient.storage.from(bucketName).download(filePath)
  console.log('ImageResponse: ', data)

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
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return buffer.toString('base64')
}
