import ActionCard from '@/components/common/cards/ActionCard'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Organization',
}

export default function Page() {
  return (
    <ActionCard
      icon="add_circle"
      title="Create Organization Profile"
      description="Build a detailed profile for your organization to provide essential information and connect with the community."
      textButton="Create"
    />
  )
}
