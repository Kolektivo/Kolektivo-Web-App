import { ActivityType, ImpactDto } from '@/types/activities'
import { ActivityHost } from '@/types/activityHosts'
import { createAnonymousClient } from '@/utils/supabase/anonymousClient'
import { createClient } from '@/utils/supabase/server'
import axios from 'axios'
import { NextResponse } from 'next/server'

const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || ''
const bannerBasePath = process.env.NEXT_PUBLIC_ACTIVITIES_BANNER_PATH || ''

const ACTIVITIES = 'activities'
const ORGANIZATIONS = 'organizations'
const pageSize = parseInt(process.env.PAGE_SIZE || '1')

export async function getActivities(id: string) {
  const supabaseClientAuth = createClient()
  const user = await supabaseClientAuth.auth.getUser()
  const hostId = user.data.user?.id

  const supabaseClient = createAnonymousClient()
  if (hostId && id) {
    console.log('Geeting activities with hostId and id')
    const { data, error } = await supabaseClient
      .from(ACTIVITIES)
      .select('*')
      .eq('activity_host_id', hostId)
      .eq('id', id)
    if (error) return NextResponse.json(error)
    console.log('Geeting activities organization data and banner')
    console.log('Geeting activities organization data and banner')
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
    // console.log('Geeting activities organization data and banner')
    // const activitiesWithBanners = await Promise.all(
    //   data.map(async (activity) => {
    //     const { data: organizationData, error: organizationError } = await supabaseClient
    //       .from(ORGANIZATIONS)
    //       .select('*')
    //       .eq('created_by', activity.activity_host_id)
    //     if (organizationError) return NextResponse.json(organizationError)
    //     const organizationName =
    //       organizationData && organizationData[0] && organizationData[0].name ? organizationData[0].name : ''
    //     const banner_src = await downloadFile(supabaseBucket, activity.banner_path)
    //     return { ...activity, organization: organizationName, banner_src }
    //   }),
    // )

    // return NextResponse.json(activitiesWithBanners)
    return NextResponse.json(data)
  } else if (id) {
    console.log('Geeting activities with Id and without hostId')
    const { data, error } = await supabaseClient.from(ACTIVITIES).select('*').eq('id', id)
    if (error) return NextResponse.json(error)
    console.log('Geeting activities organization data and banner')
    // const activitiesWithBanners = await Promise.all(
    //   data.map(async (activity) => {
    //     const { data: organizationData, error: organizationError } = await supabaseClient
    //       .from(ORGANIZATIONS)
    //       .select('*')
    //       .eq('created_by', activity.activity_host_id)
    //     if (organizationError) return NextResponse.json(organizationError)
    //     const organizationName =
    //       organizationData && organizationData[0] && organizationData[0].name ? organizationData[0].name : ''
    //     const banner_src = await downloadFile(supabaseBucket, activity.banner_path)
    //     return { ...activity, organization: organizationName, banner_src }
    //   }),
    // )

    // return NextResponse.json(activitiesWithBanners)
    return NextResponse.json(data)
  } else {
    console.log('Geeting activities without hostId and id')
    const { data, error } = await supabaseClient.from(ACTIVITIES).select('*')
    if (error) return NextResponse.json(error)
    // console.log('Geeting activities organization data and banner')
    // const activitiesWithBanners = await Promise.all(
    //   data.map(async (activity) => {
    //     const { data: organizationData, error: organizationError } = await supabaseClient
    //       .from(ORGANIZATIONS)
    //       .select('*')
    //       .eq('created_by', activity.activity_host_id)
    //     if (organizationError) return NextResponse.json(organizationError)
    //     const organizationName =
    //       organizationData && organizationData[0] && organizationData[0].name ? organizationData[0].name : ''
    //     const banner_src = await downloadFile(supabaseBucket, activity.banner_path)
    //     return { ...activity, organization: organizationName, banner_src }
    //   }),
    // )

    // return NextResponse.json(activitiesWithBanners)
    return NextResponse.json(data)
  }
}

export async function getActivitiesBanners(data: any) {
  const supabaseClient = createAnonymousClient()
  const activitiesWithBanners = await Promise.all(
    data.map(async (activity: any) => {
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

export async function getCompletedActivities(page: number) {
  const supabaseClient = createAnonymousClient()

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error } = await supabaseClient
    .from(ACTIVITIES)
    .select('start_date,title')
    .eq('state', 'completed')
    .range(0, to)
    .order('start_date', { ascending: false })

  if (error) return NextResponse.json(error)

  let lastDate: any = null
  const impactDto: ImpactDto[] = []
  data?.forEach((activity) => {
    if (lastDate === activity.start_date) {
      impactDto.push({ text: activity.title, isPrincipal: false })
    } else {
      lastDate = activity.start_date
      impactDto.push(
        { text: formatDateToReadable(activity.start_date), isPrincipal: true },
        { text: activity.title, isPrincipal: false },
      )
    }
  })
  return NextResponse.json(impactDto)
}

export async function postActivity(newActivity: ActivityType) {
  console.log('Creating activity')

  const supabaseClient = createAnonymousClient()

  const bannerSrc = newActivity.banner_src
  delete newActivity.banner_src
  const activityHost: ActivityHost = {
    id: newActivity.activity_host_id,
    name: newActivity.user_created,
    wallet_address: 'X'
  }
  console.log('Creating activity host')
  const { data: activityHostData, error: activityHostError } = await supabaseClient.from('activity_hosts').insert([activityHost]).select()
  console.log('Error: ', activityHostData)
  console.log('ActivityHostData: ', activityHostError)
  const { data, error } = await supabaseClient.from(ACTIVITIES).insert([newActivity]).select()
  if (error) return NextResponse.json(error)
  console.log('Activity created successfully')

  const activityId = data[0].id
  const mimeType = bannerSrc?.split(';')[0].split(':')[1]
  const extension = mimeType === 'image/png' ? 'png' : 'jpg'
  const bannerPath = `${bannerBasePath}/${activityId}.${extension}`
  data[0].banner_path = bannerPath
  console.log('Uploading activity banner')
  await uploadFile(supabaseBucket, bannerPath, bannerSrc as string)
  console.log('Setting activity banner path')
  updateActivity(data[0])
  data[0].banner_src = bannerSrc
  return NextResponse.json(data[0])
}

export async function putActivity(updatedActivity: ActivityType) {
  console.log('Updating activity')
  const bannerSrc = updatedActivity.banner_src
  delete updatedActivity.banner_src

  const { data, error } = await updateActivity(updatedActivity)

  if (error) return NextResponse.json(error)

  if (data) {
    console.log('Updating activity banner')
    const activityId = data[0].id
    const mimeType = bannerSrc?.split(';')[0].split(':')[1]
    const extension = mimeType === 'image/png' ? 'png' : 'jpg'
    const bannerPath = `${bannerBasePath}/${activityId}.${extension}`
    data[0].banner_path = bannerPath
    await uploadFile(supabaseBucket, bannerPath, bannerSrc as string)
  }
  return NextResponse.json(data)
}

export async function putCompletedActivitie(updatedActivity: ActivityType) {
  console.log('Updating activity')
  const bannerSrc = updatedActivity.banner_src
  const reportSrc = updatedActivity.report_src
  delete updatedActivity.banner_src
  delete updatedActivity.report_src

  const { data, error } = await updateActivity(updatedActivity)

  if (error) return NextResponse.json(error)

  if (data) {
    console.log('Updating activity banner')
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

export async function deleteActivity(id: string) {
  console.log('Removing activity')
  const supabaseClient = createAnonymousClient()
  const { data, error } = await supabaseClient.from(ACTIVITIES).delete().eq('id', id)
  if (error) return NextResponse.json(error)
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
  console.log('Downloading file')
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
  console.log('Converting file blob to image')
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return buffer.toString('base64')
}

async function uploadFile(bucketName: string, filePath: string, base64File: string) {
  console.log('Uploading file')
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
  console.log('Converting base64 image to blob')
  const response = await fetch(base64imageSource)
  return await response.blob()
}

function formatDateToReadable(dateString: Date) {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }
  return date.toLocaleDateString('en-US', options).replace(',', '')
}
