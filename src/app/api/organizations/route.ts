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

  const organizationsWithLogos = await Promise.all(
    data.map(async (organization) => {
      const logoSrc = await downloadFile(supabaseBucket, organization.logoPath)
      return { ...organization, logoSrc }
    }),
  )

  return NextResponse.json(organizationsWithLogos)
}

export async function POST(req: NextRequest) {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const newOrganization = await req.json()
  const logoSrc = newOrganization.logoSrc
  delete newOrganization.logoSrc

  const { data, error } = await supabaseClient.from(ORGANIZATIONS).insert([newOrganization]).select()
  if (error) return NextResponse.json(error)
  const organizationId = data[0].id
  const mimeType = logoSrc.split(';')[0].split(':')[1]
  const extension = mimeType === 'image/png' ? 'png' : 'jpg'
  const logoPath = `${logoBasePath}/${organizationId}.${extension}`
  data[0].logoPath = logoPath
  await uploadFile(supabaseBucket, logoPath, logoSrc)

  updateOrganization(data[0])
  data[0].logoSrc = logoSrc
  return NextResponse.json(data[0])
}

export async function PUT(req: NextRequest) {
  const updateResult = await updateOrganization(await req.json())
  if (updateResult.error) return NextResponse.json(updateResult.error)
  return NextResponse.json(updateResult.data)
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

async function updateOrganization(organization: Organization) {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { logoSrc, ...organizationWithoutLogoSrc } = organization
  console.log('Removed :' + logoSrc)

  const { data, error } = await supabaseClient
    .from(ORGANIZATIONS)
    .update(organizationWithoutLogoSrc)
    .eq('id', organization.id)
    .select()
  return { error, data }
}

interface Organization {
  id: string
  created_at: string
  name: string
  location: string
  website: string
  email: string
  description: string
  commitment: string
  logoPath: string
  logoSrc: string
}
