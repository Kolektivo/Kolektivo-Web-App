import { putOrganization } from '@/services/domain/organizations.service'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const organization = await req.json()
  return putOrganization(id, organization)
}
