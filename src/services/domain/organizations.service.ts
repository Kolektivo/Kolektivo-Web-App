import FileUtils from '@/utils/files/fileUtils'
import Bucket from '@/utils/supabase/bucket'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

const ORGANIZATIONS = 'organizations'

export async function getOrganizations() {
  console.log('Getting organizations')
  const supabaseClient = await createClient()
  const user = await supabaseClient.auth.getUser()
  const idUser = user.data.user?.id

  const { data, error } = await supabaseClient.from(ORGANIZATIONS).select().eq('created_by', idUser)
  if (error) return NextResponse.json(error, { status: 500 })

  console.log('Getting organization logos')
  const organizationsWithLogos = await Promise.all(
    data.map(async (organization) => {
      const logoSrc = await Bucket.downloadFile(organization.logoPath)
      return { ...organization, logoSrc }
    }),
  )

  return NextResponse.json(organizationsWithLogos)
}

export async function createOrganization(newOrganization: any) {
  console.log('Creating organization')
  const supabaseClient = await createClient()
  const user = await supabaseClient.auth.getUser()
  const idUser = user.data.user?.id

  const logoSrc = newOrganization.logoSrc
  delete newOrganization.logoSrc

  console.log('Inserting in database')
  const { data, error } = await supabaseClient
    .from(ORGANIZATIONS)
    .insert([{ ...newOrganization, created_by: idUser }])
    .select()
  if (error) return NextResponse.json(error, { status: 500 })

  console.log(data)
  const organizationId = data[0].id

  try {
    console.log('Uploading organization logos ', organizationId)
    const extension = FileUtils.getFileExtensionFromBase64(logoSrc)
    const logoPath = `organizations/logos/${organizationId}.${extension}`
    console.log(logoPath)
    await Bucket.uploadFile(logoPath, logoSrc)
    const resp = await supabaseClient.from(ORGANIZATIONS).update({ logoPath: logoPath }).eq('id', organizationId)

    if (resp.error) {
      console.log(error)
      return NextResponse.json(error, { status: 500 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
  return NextResponse.json(data[0])
}

export async function updateOrganization(id: string, organization: any) {
  console.log('Updating organization')
  const supabaseClient = await createClient()

  const user = await supabaseClient.auth.getUser()
  const idUser = user.data.user?.id


  console.log('Updating organization logos')
  const logoSrc = organization.logoSrc
  delete organization.logoSrc

  const { data, error } = await supabaseClient
    .from(ORGANIZATIONS)
    .update(organization)
    .eq('id', id)
    .eq('created_by', idUser)
    .select()
    .single()

  if (error) return NextResponse.json(error, { status: 500 })

  try {
    await Bucket.uploadFile(data.logoPath, logoSrc)
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }

  revalidatePath('/api/organizations')

  return NextResponse.json(data)
}
