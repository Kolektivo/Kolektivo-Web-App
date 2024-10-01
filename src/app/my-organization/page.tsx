import OrganizationCreate from '@/components/my-organization/OrganizationCreate'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Organization',
}

export default async function Page() {
  return <OrganizationCreate />
}
