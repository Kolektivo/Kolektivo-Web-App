import type { NextRequest } from 'next/server'
import { getOrganizations, postOrganization } from '@/services/domain/organizations.service'

export async function GET() {
  return getOrganizations()
}

export async function POST(req: NextRequest) {
  const newOrganization = await req.json()
  return postOrganization(newOrganization)
}
