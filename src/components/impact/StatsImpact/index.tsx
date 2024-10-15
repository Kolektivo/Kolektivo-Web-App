import ValueCard from '@/components/common/cards/ValueCard'
import Grid from '@mui/material/Grid2'
import { type ReactElement } from 'react'

const StatsImpact = (): ReactElement => {
  return (
    <Grid container spacing={4} columns={{ xs: 2, md: 4 }}>
      <Grid size={1}>
        <ValueCard icon="volunteer_activism" title="Points donated" value="300" />
      </Grid>
      <Grid size={1}>
        <ValueCard icon="local_activity" title="Activities completed" value="16" />
      </Grid>
      <Grid size={1}>
        <ValueCard icon="approval" title="Stamps distributed" value="30" />
      </Grid>
      <Grid size={1}>
        <ValueCard icon="award_star" title="Badges unlocked" value="7" />
      </Grid>
    </Grid>
  )
}

export default StatsImpact
