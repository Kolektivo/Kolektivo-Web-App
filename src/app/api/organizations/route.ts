import type { NextRequest } from 'next/server'
import { getOrganizations, createOrganization } from '@/services/domain/organizations.service'

export async function GET() {
  return getOrganizations()
}

export async function POST(req: NextRequest) {
  const newOrganization = await req.json()
  return createOrganization(newOrganization)
}
