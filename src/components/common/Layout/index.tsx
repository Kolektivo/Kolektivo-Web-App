import { Box, Container } from '@mui/material'
import DashboardLayout from './DashboardLayout'

const drawerWidth = 342

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Box display="flex">
      <DashboardLayout drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, pt: '96px', width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Container maxWidth={false} disableGutters sx={{ padding: 4, marginX: 0 }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}
