import ValueCard from '@/components/common/cards/ValueCard'
import Grid from '@mui/material/Grid2'
import { type ReactElement } from 'react'

const StatsCommunities = (): ReactElement => {
  return (
    <Grid container spacing={4} columns={{ xs: 2, md: 4 }}>
      <Grid size={1}>
        <ValueCard icon="ktt" title="Points distributed" value="3925" />
      </Grid>
      <Grid size={1}>
        <ValueCard icon="sync_alt" title="Points transacted" value="5325" />
      </Grid>
      <Grid size={1}>
        <ValueCard icon="groups" title="Members" value="195" />
      </Grid>
      <Grid size={1}>
        <ValueCard icon="storefront" title="Registered merchants" value="12" />
      </Grid>
    </Grid>
  )
}

export default StatsCommunities
