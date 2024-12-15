import type { NextRequest } from 'next/server'
import { type Vendor } from '@/types/vendors'
import { getVendors, postVendor } from '@/services/domain/vendors.service'

export async function GET() {
  return getVendors()
}

export async function POST(req: NextRequest) {
  const newVendor = (await req.json()) as Vendor
  return postVendor(newVendor)
}
