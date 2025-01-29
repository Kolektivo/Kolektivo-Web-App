'use client'

import organizationsService from '@/features/organizations/services/organizations.service'
import { type ReactElement } from 'react'
import MyOrganization from '../MyOrganization'
import ActionCard from '@/components/common/cards/ActionCard'
import ErrorDisplay from '@/components/common/display/ErrorDisplay'
import MyOrganizationSkeleton from '../MyOrganization/Skeleton'
import useSWR from 'swr'

const MainOrganization = (): ReactElement => {
  const { data, error, isValidating, mutate } = useSWR('/api/organizations', organizationsService.fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  })

  if (error) {
    return (
      <ErrorDisplay
        onClickButton={() => {
          mutate()
        }}
      />
    )
  }

  if (isValidating) {
    return <MyOrganizationSkeleton />
  }

  if (data && data.id) {
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
