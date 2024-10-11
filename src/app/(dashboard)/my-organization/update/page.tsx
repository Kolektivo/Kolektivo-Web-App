import UpdateOrganization from '@/components/organization/UpdateOrganization'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Update Organization',
}

export default async function Page() {
  return <UpdateOrganization />
}
