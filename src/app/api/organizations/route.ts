import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || ''
const logoBasePath = process.env.NEXT_PUBLIC_ORGANIZATIONS_LOGO_PATH || ''

const ORGANIZATIONS = 'organizations'

export async function GET() {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabaseClient.from(ORGANIZATIONS).select('*')
  if (error) return NextResponse.json(error)
  data.forEach((organization) => {
    const organizationId = organization.id
    const logoPath = `${logoBasePath}/${organizationId}`
    organization.logoSrc = downloadFile(supabaseBucket, logoPath)
  })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const newOrganization = await req.json()
  const logoSrc = newOrganization.logoSrc
  delete newOrganization.logoSrc

  const { data, error } = await supabaseClient.from(ORGANIZATIONS).insert([newOrganization]).select()
  if (error) return NextResponse.json(error)

  const organizationId = data[0].id
  const logoPath = `${logoBasePath}/${organizationId}`

  await uploadFile(supabaseBucket, logoPath, logoSrc)

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
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabaseClient.storage.from(bucketName).download(filePath)

  if (error) {
    console.error('Error downloading file:', error.message)
  } else {
    console.log('File downloaded successfully:')
    const imageSource = blobToImageSrc(data)
    return imageSource
  }
}

function blobToImageSrc(blob: Blob): string {
  return URL.createObjectURL(blob)
}

async function base64ImageSourceToBlob(base64imageSource: string): Promise<Blob> {
  const response = await fetch(base64imageSource)
  return await response.blob()
}

export async function PUT(req: NextRequest) {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabaseClient
    .from(ORGANIZATIONS)
    .upsert(await req.json())
    .select()

  if (error) return NextResponse.json(error)
  return NextResponse.json(data)
}
