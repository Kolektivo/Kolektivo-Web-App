'use client'

import { IconButton, Avatar, Menu, MenuItem, ListItemIcon, Icon, ListItemText, Button, Link, Box } from '@mui/material'
import { useState, type ReactElement } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import KTFlag from '@/public/images/kttflag.svg?url'
import Image from 'next/image'

const AccountMenu = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { user, signOut, isLogged } = useAuth()
  const open = Boolean(anchorEl)

  if (!isLogged) {
    return (
      <Link href="signin">
        <Button variant="contained" color="secondary" sx={{ borderRadius: 100 }}>
          Sign In
        </Button>
      </Link>
    )
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    setAnchorEl(null)
    signOut()
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ padding: 0 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Box
          sx={{
            position: 'relative', // Necesario para posicionar la imagen superpuesta
            display: 'inline-block', // Asegura que ocupe solo el espacio del contenido
            width: 48,
            height: 48,
          }}
        ></Box>
        <Avatar
          alt="user-avatar"
          src={user?.user_metadata.avatar_url}
          sx={{ width: 48, height: 48, border: '5px solid' }}
        >
          {user?.email?.charAt(0).toUpperCase()}
        </Avatar>
        <Box
          component="img"
          src={KTFlag.src}
          alt="superposed-icon"
          sx={{            
            objectFit: "cover",
            position: 'absolute', 
            bottom: 0, 
            right: 0, 
            width: 20, 
            height: 20,
            borderRadius: '50%', 
            border: '2px solid white', 
          }}
        />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'account-option',
        }}
      >
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Icon>logout</Icon>
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default AccountMenu
