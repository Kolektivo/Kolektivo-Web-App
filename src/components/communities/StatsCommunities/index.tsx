import ValueCard from '@/components/common/cards/ValueCard'
import { Communities } from '@/types/communities'
import { Skeleton } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { type ReactElement } from 'react'

const StatsCommunities = ({ communities }: { communities: Communities | undefined }): ReactElement => {
  if (communities)
    return (
      <Grid container spacing={4} columns={{ xs: 2, md: 4 }}>
        <Grid size={1}>
          <ValueCard icon="ktt" title="Tokens in Circulation" value={communities.tokensInCirculation.toString()} />
        </Grid>
        <Grid size={1}>
          <ValueCard icon="sync_alt" title="Token Transfers" value={communities.tokenTransfers.toString()} />
        </Grid>
        <Grid size={1}>
          <ValueCard icon="groups" title="Members" value={communities.members.toString()} />
        </Grid>
        <Grid size={1}>
          <ValueCard icon="storefront" title="Active Vendors" value={communities.activeVendors.toString()} />
        </Grid>
      </Grid>
    )
  else
    return (
      <Grid container spacing={4} columns={{ xs: 2, md: 4 }}>
        <Grid size={1}>
          <ValueCard icon="ktt" title="Tokens in Circulation" value={''} />
        </Grid>
        <Grid size={1}>
          <ValueCard icon="sync_alt" title="Token Transfers"  value={''} />
        </Grid>
        <Grid size={1}>
          <ValueCard icon="groups" title="Members"  value={''} />
        </Grid>
        <Grid size={1}>
          <ValueCard icon="storefront" title="Active Vendors"  value={''} />
        </Grid>
      </Grid>
    )
}

export default StatsCommunities
