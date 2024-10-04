import { Box, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import { type ReactElement } from 'react'
import InfoCard from '@/components/common/cards/InfoCard'
import FallbackImage from '@/components/common/display/FallbackImage'
import { type Organization } from '@/types/organization'
import Link from 'next/link'

const MyOrganization = ({ organization }: { organization: Organization }): ReactElement => {
  const InfoItem = ({ title, value }: { title: string; value: string }) => (
    <Box flex={1}>
      <Typography variant="body2" color="text.secondary" marginBottom={2}>
        {title}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  )

  return (
    <Card>
      <CardHeader title="My Organization" />
      <CardContent>
        <Stack gap={4}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            gap={2}
            alignItems={{ xs: 'center', sm: 'start' }}
          >
            <FallbackImage src={organization.logoSrc ?? ''} alt="my-organization-logo" width={284} height={160} />
            <Box>
              <Link href="/my-organization/update">
                <Button variant="contained" color="secondary">
                  Update
                </Button>
              </Link>
            </Box>
          </Stack>
          <Card variant="outlined">
            <CardContent>
              <Stack gap={4}>
                <Typography variant="h3">Organization Info</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={4}>
                  <InfoItem title="Name" value={organization.name ?? ''} />
                  <InfoItem title="Location" value={organization.location ?? ''} />
                  <InfoItem title="Website" value={organization.website ?? ''} />
                  <InfoItem title="Email" value={organization.email ?? ''} />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
          <Stack direction={{ xs: 'column', md: 'row' }} gap={4}>
            <Box flex={1}>
              <InfoCard variant="outlined" title="Description" information={organization.description ?? ''} />
            </Box>
            <Box flex={1}>
              <InfoCard variant="outlined" title="Commitment" information={organization.commitment ?? ''} />
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MyOrganization
