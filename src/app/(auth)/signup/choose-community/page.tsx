import { Container, Stack } from '@mui/material'
import ChooseCommunity from '@/components/auth/signup/ChooseCommunity'

export default function Page() {
  return (
    <Container>
      <Stack gap={4} width={{ xs: 450, md: 520 }}>
        <ChooseCommunity />
      </Stack>
    </Container>
  )
}
