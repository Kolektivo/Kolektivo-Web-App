import CreateOrganization from '@/components/organization/CreateOrganization'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Organization',
}

export default async function Page() {
  return <CreateOrganization />
}
