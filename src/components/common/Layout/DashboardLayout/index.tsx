'use client'

import { Box } from '@mui/material'
import CustomAppBar from '../AppBar'
import { useState } from 'react'
import Menu from '../Menu'

export default function DashboardLayout({ drawerWidth }: { drawerWidth: number }) {
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
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="menu">
      <CustomAppBar drawerWidth={drawerWidth} onMenuClick={handleMenuToggle} />
      <Menu
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onTransitionEnd={handleMenuTransitionEnd}
        onClose={handleMenuClose}
      />
    </Box>
  )
}
