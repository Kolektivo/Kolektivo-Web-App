import { Vendor } from '@/types/vendors'
import FileUtils from '@/utils/files/fileUtils'
import Bucket from '@/utils/supabase/bucket'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
const VENDORS = 'vendors'

export async function getVendors() {
  console.log('Geeting vendors')
  const supabaseClient = await createClient()
  const user = await supabaseClient.auth.getUser()
  const idUser = user.data.user?.id

  const { data, error } = await supabaseClient.from(VENDORS).select('*').eq('created_by', idUser)
  if (error) return NextResponse.json(error, { status: 500 })

  console.log('Geeting vendors logos')
  const vendorsWithLogos = await Promise.all(
    data.map(async (vendor) => {
      const logoSrc = await Bucket.downloadFile(vendor.logo_path)
      return {
        id: vendor.id,
        name: vendor.name,
        location: vendor.location,
        website: vendor.website,
        phone: vendor.phone,
        category: vendor.category,
        openingHours: vendor.opening_hours,
        wifiAvailability: vendor.wifi,
        latitude: vendor.latitude,
        longitude: vendor.longitude,
        logoSrc,
      }
    }),
  )

  return NextResponse.json(vendorsWithLogos)
}

export async function getVendorById(id: string) {
  console.log('Geeting vendor by id: ', id)

  const supabaseClient = await createClient()

  //const supabaseClientAuth = createClient()
  const user = await supabaseClient.auth.getUser()
  const idUser = user.data.user?.id

  const { data, error } = await supabaseClient.from(VENDORS).select('*').eq('id', id).eq('created_by', idUser).single()
  if (error) return NextResponse.json(error, { status: 500 })

  const logoSrc = await Bucket.downloadFile(data.logo_path)

  console.log('Geeting vendor logo')
  const vendorWithLogo = {
    id: data.id,
    name: data.name,
    location: data.location,
    latitude: data.latitude,
    longitude: data.longitude,
    website: data.website,
    phone: data.phone,
    category: data.category,
    openingHours: data.opening_hours,
    wifiAvailability: data.wifi,
    logoSrc,
  }

  return NextResponse.json(vendorWithLogo)
}

export async function createVendor(newVendor: Vendor) {
  console.log('Creating vendor')
  const supabaseClient = await createClient()

  //const supabaseClientAuth = createClient()
  const user = await supabaseClient.auth.getUser()
  const idUser = user.data.user?.id

  const logoSrc = newVendor.logoSrc!
  delete newVendor.logoSrc

  const { data, error } = await supabaseClient
    .from(VENDORS)
    .insert([
      {
        location: newVendor.location,
        latitude: newVendor.latitude,
        longitude: newVendor.longitude,
        wifi: newVendor.wifiAvailability,
        website: newVendor.website,
        phone: newVendor.phone,
        category: newVendor.category,
        name: newVendor.name,
        opening_hours: newVendor.openingHours,
        created_by: idUser,
      },
    ])
    .select()

  if (error) return NextResponse.json(error, { status: 500 })

  const vendorId = data[0].id
  try {
    console.log('Uploading vendor logo')
    const extension = FileUtils.getFileExtensionFromBase64(logoSrc)
    const logoPath = `vendors/logos/${vendorId}.${extension}`
    await Bucket.uploadFile(logoPath, logoSrc)
    await supabaseClient.from(VENDORS).update({ logo_path: logoPath }).eq('id', vendorId)
  } catch (error) {
    await supabaseClient.from(VENDORS).delete().eq('id', vendorId)
    return NextResponse.json(error, { status: 500 })
  }

  return NextResponse.json(data[0])
}

export async function updateVendor(id: string, vendor: any) {
  console.log('Updating vendor')
  const supabaseClient = await createClient()

  //const supabaseClientAuth = createClient()
  const user = await supabaseClient.auth.getUser()
  const idUser = user.data.user?.id

  const { data, error } = await supabaseClient
    .from(VENDORS)
    .update({
      location: vendor.location,
      latitude: vendor.latitude,
      longitude: vendor.longitude,
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
    console.log('Updating vendor logo')
    await Bucket.uploadFile(data.logo_path, vendor.logoSrc)
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }

  revalidatePath('/api/vendors')

  return NextResponse.json(data)
}

export async function deleteVendor(id: string) {
  console.log('Deleting vendor with id: ', id)
  const supabaseClient = await createClient()

  //const supabaseClientAuth = createClient()
  const user = await supabaseClient.auth.getUser()
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
