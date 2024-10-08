'use client'

import organizationsService from '@/features/organizations/services/organizations.service'
import { type Organization } from '@/types/organization'
import { useQuery } from '@tanstack/react-query'
import { type ReactElement } from 'react'
import MyOrganization from '../MyOrganization'
import ActionCard from '@/components/common/cards/ActionCard'
import ErrorDisplay from '@/components/common/display/ErrorDisplay'
import MyOrganizationSkeleton from '../MyOrganization/Skeleton'

const MainOrganization = (): ReactElement => {
  const { data, isLoading, error, refetch } = useQuery<Organization | undefined>({
    queryKey: ['getMyOrganization'],
    queryFn: async () => await organizationsService.get(),
  })

  if (error) {
    return (
      <ErrorDisplay
        onClickButton={() => {
          refetch()
        }}
      />
    )
  }

  if (isLoading) {
    return <MyOrganizationSkeleton />
  }

  if (data) {
    return <MyOrganization organization={data} />
  }

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

export default MainOrganization
