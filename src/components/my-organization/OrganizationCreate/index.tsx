import { type ReactElement } from 'react'
import ActionCard from '@/components/common/cards/ActionCard'

const OrganizationCreate = (): ReactElement => {
  return (
    <ActionCard
      icon="add_circle"
      iconColor="primary"
      title="Create Organization Profile"
      description="Build a detailed profile for your organization to provide essential information and connect with the community."
      textButton="Create"
      href="/my-organization/create"
    />
  )
}

export default OrganizationCreate
