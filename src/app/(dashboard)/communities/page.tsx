import { type Metadata } from 'next'
import StackCommunities from '@/components/communities/StackCommunities'
export const metadata: Metadata = {
  title: 'Communities',
}

export default function Page() {
 
  return <StackCommunities />
}
