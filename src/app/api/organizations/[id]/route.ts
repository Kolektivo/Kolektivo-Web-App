import { createAnonymousClient } from '@/utils/supabase/anonymousClient'
import Bucket from '@/utils/supabase/bucket'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

const ORGANIZATIONS = 'organizations'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabaseClient = createAnonymousClient()
  const id = (await params).id
  const organization = await req.json()

  const supabaseClientAuth = createClient()
  const user = await supabaseClientAuth.auth.getUser()
  const idUser = user.data.user?.id

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
