import { NextResponse } from 'next/server'
import Bucket from '@/utils/supabase/bucket'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

const VENDORS = 'vendors'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabaseClient = createClient()
  const id = (await params).id

  const { data, error } = await supabaseClient.from(VENDORS).select('*').eq('id', id).single()
  if (error) return NextResponse.json(error, { status: 500 })

  const logoSrc = await Bucket.downloadFile(`vendors/logo/${data.id}`)

  const vendorWithLogo = {
    id: data.id,
    name: data.name,
    location: data.location,
    website: data.website,
    phone: data.phone,
    category: data.category,
    openingHours: data.opening_hour,
    wifiAvailability: data.wifi,
    logoSrc,
  }

  return NextResponse.json(vendorWithLogo)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabaseClient = createClient()
  const id = (await params).id
  const vendor = await req.json()

  const { data, error } = await supabaseClient
    .from(VENDORS)
    .update({
      location: vendor.location,
      wifi: vendor.wifiAvailability,
      website: vendor.website,
      phone: vendor.phone,
      category: vendor.category,
      name: vendor.name,
      opening_hour: vendor.openingHours,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json(error, { status: 500 })

  await Bucket.uploadFile(`vendors/logo/${vendor.id}`, vendor.logoSrc)
  revalidatePath('/api/vendors')

  return NextResponse.json(data)
}
