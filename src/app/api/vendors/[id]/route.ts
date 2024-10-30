import { NextResponse } from 'next/server'
import Bucket from '@/utils/supabase/bucket'
import { revalidatePath } from 'next/cache'
import { createAnonymousClient } from '@/utils/supabase/anonymousClient'
import { createClient } from '@/utils/supabase/server'

const VENDORS = 'vendors'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabaseClient = createAnonymousClient()
  const id = (await params).id

  const supabaseClientAuth = createClient()
  const user = await supabaseClientAuth.auth.getUser()
  const idUser = user.data.user?.id

  const { data, error } = await supabaseClient.from(VENDORS).select('*').eq('id', id).eq('created_by', idUser).single()
  if (error) return NextResponse.json(error, { status: 500 })

  const logoSrc = await Bucket.downloadFile(data.logo_path)

  const vendorWithLogo = {
    id: data.id,
    name: data.name,
    location: data.location,
    website: data.website,
    phone: data.phone,
    category: data.category,
    openingHours: data.opening_hours,
    wifiAvailability: data.wifi,
    logoSrc,
  }

  return NextResponse.json(vendorWithLogo)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabaseClient = createAnonymousClient()
  const id = (await params).id
  const vendor = await req.json()

  const supabaseClientAuth = createClient()
  const user = await supabaseClientAuth.auth.getUser()
  const idUser = user.data.user?.id

  const { data, error } = await supabaseClient
    .from(VENDORS)
    .update({
      location: vendor.location,
      wifi: vendor.wifiAvailability,
      website: vendor.website,
      phone: vendor.phone,
      category: vendor.category,
      name: vendor.name,
      opening_hours: vendor.openingHours,
    })
    .eq('id', id)
    .eq('created_by', idUser)
    .select()
    .single()

  if (error) return NextResponse.json(error, { status: 500 })

  try {
    await Bucket.uploadFile(data.logo_path, vendor.logoSrc)
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }

  revalidatePath('/api/vendors')

  return NextResponse.json(data)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabaseClient = createAnonymousClient()
  const id = (await params).id

  const supabaseClientAuth = createClient()
  const user = await supabaseClientAuth.auth.getUser()
  const idUser = user.data.user?.id

  const { data, error } = await supabaseClient
    .from(VENDORS)
    .delete()
    .eq('id', id)
    .eq('created_by', idUser)
    .select()
    .single()
  if (error) return NextResponse.json(error, { status: 500 })

  try {
    await Bucket.deleteFile(data.logo_path)
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }

  return NextResponse.json({})
}
