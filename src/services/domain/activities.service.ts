import { ActivityType } from '@/types/activities'
import { createAnonymousClient } from '@/utils/supabase/anonymousClient'
import { NextResponse } from 'next/server'

const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || ''
const bannerBasePath = process.env.NEXT_PUBLIC_ACTIVITIES_BANNER_PATH || ''

const ACTIVITIES = 'activities'
const ORGANIZATIONS = 'organizations'

export async function getActivities(hostId: string, id: string) {
  const supabaseClient = createAnonymousClient()
  if (hostId && id) {
    console.log('Geeting activities with hostId and id')
    const { data, error } = await supabaseClient
      .from(ACTIVITIES)
      .select('*')
      .eq('activity_host_id', hostId)
      .eq('id', id)
    if (error) return NextResponse.json(error)
    const activitiesWithBanners = await Promise.all(
      data.map(async (activity) => {
        const { data: organizationData, error: organizationError } = await supabaseClient
          .from(ORGANIZATIONS)
          .select('*')
          .eq('created_by', activity.activity_host_id)
        if (organizationError) return NextResponse.json(organizationError)
        const organizationName =
          organizationData && organizationData[0] && organizationData[0].name ? organizationData[0].name : ''
        const banner_src = await downloadFile(supabaseBucket, activity.banner_path)
        return { ...activity, organization: organizationName, banner_src }
      }),
    )

    return NextResponse.json(activitiesWithBanners)
  } else if (hostId) {
    console.log('Geeting activities with hostId and without id')
    const { data, error } = await supabaseClient.from(ACTIVITIES).select('*').eq('activity_host_id', hostId)
    if (error) return NextResponse.json(error)
    const activitiesWithBanners = await Promise.all(
      data.map(async (activity) => {
        console.log('Geeting activities organization data and banner')
        const { data: organizationData, error: organizationError } = await supabaseClient
          .from(ORGANIZATIONS)
          .select('*')
          .eq('created_by', activity.activity_host_id)
        if (organizationError) return NextResponse.json(organizationError)
        const organizationName =
          organizationData && organizationData[0] && organizationData[0].name ? organizationData[0].name : ''
        const banner_src = await downloadFile(supabaseBucket, activity.banner_path)
        return { ...activity, organization: organizationName, banner_src }
      }),
    )

    return NextResponse.json(activitiesWithBanners)
  } else if (id) {
    console.log('Geeting activities with Id and without hostId')
    const { data, error } = await supabaseClient.from(ACTIVITIES).select('*').eq('id', id)
    if (error) return NextResponse.json(error)
    const activitiesWithBanners = await Promise.all(
      data.map(async (activity) => {
        const { data: organizationData, error: organizationError } = await supabaseClient
          .from(ORGANIZATIONS)
          .select('*')
          .eq('created_by', activity.activity_host_id)
        if (organizationError) return NextResponse.json(organizationError)
        const organizationName =
          organizationData && organizationData[0] && organizationData[0].name ? organizationData[0].name : ''
        const banner_src = await downloadFile(supabaseBucket, activity.banner_path)
        return { ...activity, organization: organizationName, banner_src }
      }),
    )

    return NextResponse.json(activitiesWithBanners)
  } else {
    console.log('Geeting activities without hostId and id')
    const { data, error } = await supabaseClient.from(ACTIVITIES).select('*')
    if (error) return NextResponse.json(error)
    const activitiesWithBanners = await Promise.all(
      data.map(async (activity) => {
        const { data: organizationData, error: organizationError } = await supabaseClient
          .from(ORGANIZATIONS)
          .select('*')
          .eq('created_by', activity.activity_host_id)
        if (organizationError) return NextResponse.json(organizationError)
        const organizationName =
          organizationData && organizationData[0] && organizationData[0].name ? organizationData[0].name : ''
        const banner_src = await downloadFile(supabaseBucket, activity.banner_path)
        return { ...activity, organization: organizationName, banner_src }
      }),
    )

    return NextResponse.json(activitiesWithBanners)
  }
}

export async function postActivity(newActivity: ActivityType) {
  const supabaseClient = createAnonymousClient()
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

export async function putActivity(updatedActivity: ActivityType) {
  const bannerSrc = updatedActivity.banner_src
  const reportSrc = updatedActivity.report_src
  delete updatedActivity.banner_src
  delete updatedActivity.report_src

  const { data, error } = await updateActivity(updatedActivity)

  if (error) return NextResponse.json(error)

  if (data) {
    const activityId = data[0].id
    const mimeType = bannerSrc?.split(';')[0].split(':')[1]
    const extension = mimeType === 'image/png' ? 'png' : 'jpg'
    const bannerPath = `${bannerBasePath}/${activityId}.${extension}`
    data[0].banner_path = bannerPath
    await uploadFile(supabaseBucket, bannerPath, bannerSrc as string)
    if (reportSrc) {
      const report_path = `${bannerBasePath}/${activityId}.pdf`
      data[0].report_path = report_path
      updateActivity(data[0])
      await uploadFile(supabaseBucket, report_path, reportSrc as string)
    }
  }
  return NextResponse.json(data)
}

async function updateActivity(activity: ActivityType) {
  const supabaseClient = createAnonymousClient()
  const { banner_src: banner_src, ...organizationWithoutLogoSrc } = activity
  console.log('Removed ', banner_src?.substring(0, 10))

  const { data, error } = await supabaseClient
    .from(ACTIVITIES)
    .update(organizationWithoutLogoSrc)
    .eq('id', activity.id)
    .select()
  return { data, error }
}

async function downloadFile(bucketName: string, filePath: string) {
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
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return buffer.toString('base64')
}

async function uploadFile(bucketName: string, filePath: string, base64File: string) {
  console.log('FilePath: ', filePath)
  const fileBlob = await base64ImageSourceToBlob(base64File)
  const supabaseClient = createAnonymousClient()
  const { data: dataDelete, error: errorDelete } = await supabaseClient.storage.from(bucketName).remove([filePath])
  if (errorDelete) {
    console.error('Error uploading file:', errorDelete.message)
  } else {
    console.log('File deleted successfully', dataDelete.length)
  }
  const { data: dataUpload, error: errorUpload } = await supabaseClient.storage
    .from(bucketName)
    .upload(filePath, fileBlob)

  if (errorUpload) {
    console.error('Error uploading file:', errorUpload.message)
  } else {
    console.log('File uploaded successfully', dataUpload.id)
  }
}

async function base64ImageSourceToBlob(base64imageSource: string): Promise<Blob> {
  const response = await fetch(base64imageSource)
  return await response.blob()
}

