import { getCommunities } from '@/services/domain/communities.service'

export async function GET() {
  return getCommunities()
}

