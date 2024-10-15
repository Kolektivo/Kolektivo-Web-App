import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { type ActivityType } from '@/types/activities'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const bannerBasePath = process.env.NEXT_PUBLIC_ACTIVITIES_BANNER_PATH || ''

const ACTIVITIES = 'activities'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  if (id) {
    const { data, error } = await supabaseClient.from(ACTIVITIES).select('*').eq('id', id)
    if (error) return NextResponse.json(error)
    const activitiesWithBanners = await Promise.all(
      data.map(async (activity) => {
        const banner_src = await downloadFile(supabaseBucket, activity.banner_path)
        return { ...activity, banner_src }
      }),
    )

    return NextResponse.json(activitiesWithBanners)
  } else {
    const { data, error } = await supabaseClient.from(ACTIVITIES).select('*')
    if (error) return NextResponse.json(error)
    const activitiesWithBanners = await Promise.all(
      data.map(async (activity) => {
        const banner_src = await downloadFile(supabaseBucket, activity.banner_path)
        return { ...activity, banner_src }
      }),
    )

    return NextResponse.json(activitiesWithBanners)
  }
}

export async function POST(req: NextRequest) {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

  const newActivity = (await req.json()) as ActivityType

  const bannerSrc = newActivity.banner_src
  delete newActivity.banner_src

  const { data, error } = await supabaseClient.from(ACTIVITIES).insert([newActivity]).select()
  if (error) return NextResponse.json(error)

  const activityId = data[0].id
  const mimeType = bannerSrc?.split(';')[0].split(':')[1]
  const extension = mimeType === 'image/png' ? 'png' : 'jpg'
  const bannerPath = `${bannerBasePath}/${activityId}.${extension}`
  data[0].banner_path = bannerPath
  await uploadFile(supabaseBucket, bannerPath, bannerSrc as string)
  updateActivity(data[0])
  data[0].banner_src = bannerSrc
  return NextResponse.json(data[0])
}

export async function PUT(req: NextRequest) {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabaseClient
    .from(ACTIVITIES)
    .upsert(await req.json())
    .select()
  if (error) return NextResponse.json(error)
  return NextResponse.json(data)
}

async function uploadFile(bucketName: string, filePath: string, base64File: string) {
  const fileBlob = await base64ImageSourceToBlob(base64File)
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabaseClient.storage.from(bucketName).upload(filePath, fileBlob)

  if (error) {
    console.error('Error uploading file:', error.message)
  } else {
    console.log('File uploaded successfully:', data)
  }
}

async function downloadFile(bucketName: string, filePath: string) {
  if (filePath == '' || !filePath) return ''
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
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
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return buffer.toString('base64')
}

async function base64ImageSourceToBlob(base64imageSource: string): Promise<Blob> {
  const response = await fetch(base64imageSource)
  return await response.blob()
}

async function updateActivity(activity: ActivityType) {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { banner_src: banner_src, ...organizationWithoutLogoSrc } = activity
  console.log('Removed :' + banner_src)

  const { data, error } = await supabaseClient
    .from(ACTIVITIES)
    .update(organizationWithoutLogoSrc)
    .eq('id', activity.id)
    .select()
  return { error, data }
}
