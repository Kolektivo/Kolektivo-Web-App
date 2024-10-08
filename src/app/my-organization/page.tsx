import MainOrganization from '@/components/organization/MainOrganization'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Organization',
}

export default async function Page() {
  return <MainOrganization />
}
