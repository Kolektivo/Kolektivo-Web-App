'use client'

import { Box, Container } from '@mui/material'
import { useState } from 'react'
import CustomAppBar from './AppBar'
import Menu from './Menu'

const drawerWidth = 342

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleMenuClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleMenuTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleMenuToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  return (
    <Box display="flex">
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="menu">
        <CustomAppBar drawerWidth={drawerWidth} onMenuClick={handleMenuToggle} />
        <Menu
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          onTransitionEnd={handleMenuTransitionEnd}
          onClose={handleMenuClose}
        />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, pt: '96px', width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Container maxWidth={false} disableGutters sx={{ padding: 4, marginX: 0 }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}
