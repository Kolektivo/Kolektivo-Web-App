'use client'

import HeaderCard from '@/components/common/cards/HeaderCard'
import { Card, CardContent, Stack, Button, Box } from '@mui/material'
import { type ReactElement } from 'react'
import OptionCommunity from './OptionCommunity'
import { useState } from 'react'
import { type Community } from '@/types/communities'
import CardCommunity from '@/components/communities/CardsCommunities/CardCommunity'
import Link from 'next/link'
import communitiesService from '@/features/communities/services/communities.service'
import useSWR from 'swr'

const ChooseCommunity = (): ReactElement => {
  const { data, error, isValidating, mutate } = useSWR('/api/communities', communitiesService.fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  })

  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null)
  const [step, setStep] = useState<number>(1)

  const handleChange = (community: Community) => {
    if (community.id == 'Trinidad') setSelectedCommunity(community)
  }

  const handleNextStep = () => {
    setStep((step) => step + 1)
  }

  const handleBackStep = () => {
    setStep((step) => step - 1)
  }

  if (step == 2) {
    return (
      <>
        <HeaderCard
          title="Confirm your Communtiy"
          subtitle={`Are you sure you want to join the ${selectedCommunity?.name} community? This decision is permanent and cannot be changed.`}
          align="center"
        />
        <Card>
          <CardContent>
            <Stack gap={4}>
              <CardCommunity {...selectedCommunity!} />
              <Stack gap={2} direction="row">
                <Box flex={1}>
                  <Button onClick={handleBackStep} variant="contained" color="secondary" fullWidth>
                    Go Back
                  </Button>
                </Box>
                <Box flex={1}>
                  <Link href="/">
                    <Button variant="contained" fullWidth>
                      Confirm
                    </Button>
                  </Link>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </>
    )
  }

  return (
    <>
      <HeaderCard title="Choose Your Community" />
      <Card>
        <CardContent>
          <Stack gap={4}>
            {data?.communities.map((community) => (
              <OptionCommunity
                key={community.id}
                isOpacity={selectedCommunity !== null}
                checked={selectedCommunity === community}
                community={community}
                onClick={handleChange}
              />
            ))}
            <Button onClick={handleNextStep} variant="contained" disabled={selectedCommunity === null}>
              Continue
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default ChooseCommunity
