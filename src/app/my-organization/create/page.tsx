import Create from '@/components/my-organization/Create'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Organization',
}

export default async function Page() {
  return <Create></Create>
}
