import { deleteVendor, getVendorById, updateVendor } from '@/services/domain/vendors.service'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  return getVendorById(id)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const vendor = await req.json()
  return updateVendor(id, vendor)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  return deleteVendor(id)
}
