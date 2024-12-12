import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createAnonymousClient } from '@/utils/supabase/anonymousClient'
import { createClient } from '@/utils/supabase/server'
import Bucket from '@/utils/supabase/bucket'
import FileUtils from '@/utils/files/fileUtils'
import { revalidatePath } from 'next/cache'

const ORGANIZATIONS = 'organizations'

export async function GET() {
}

export async function POST(req: NextRequest) {
  const supabaseClient = createAnonymousClient()
  const newOrganization = await req.json()

  const supabaseClientAuth = createClient()
  const user = await supabaseClientAuth.auth.getUser()
  const idUser = user.data.user?.id

  const logoSrc = newOrganization.logoSrc
  delete newOrganization.logoSrc

  const { data, error } = await supabaseClient
    .from(ORGANIZATIONS)
    .insert([{ ...newOrganization, created_by: idUser }])
    .select()
  if (error) return NextResponse.json(error, { status: 500 })

  const organizationId = data[0].id

  try {
    const extension = FileUtils.getFileExtensionFromBase64(logoSrc)
    const logoPath = `organizations/logos/${organizationId}.${extension}`
    await Bucket.uploadFile(logoPath, logoSrc)
    await supabaseClient.from(ORGANIZATIONS).update({ logoPath }).eq('id', organizationId)
  } catch (error) {
    await supabaseClient.from(ORGANIZATIONS).delete().eq('id', organizationId)
    return NextResponse.json(error, { status: 500 })
  }

  revalidatePath('/api/organizations')

  return NextResponse.json(data[0])
}
