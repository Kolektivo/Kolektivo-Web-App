import {
  Box,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  type ModalProps,
  Stack,
  useTheme,
} from '@mui/material'
import Image from 'next/image'
import { type TransitionEventHandler } from 'react'
import logo from '@/public/images/logo.svg?url'
import NavLinks from './NavLinks'

export default function Menu({
  drawerWidth,
  mobileOpen,
  onTransitionEnd,
  onClose,
}: {
  drawerWidth: number
  mobileOpen: boolean
  onTransitionEnd: TransitionEventHandler
  onClose: ModalProps['onClose']
}) {
  const theme = useTheme()

  const drawer = (
    <Stack height="100%" justifyContent="space-between">
      <Box>
        <Box paddingX={4} paddingY={5}>
          <Image src={logo} alt="logo" width={138} height={36} />
        </Box>
        <List disablePadding>
          <NavLinks />
        </List>
      </Box>
      <Box paddingTop={6}>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon color="primary">volunteer_activism</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Support Kolektivo"
                primaryTypographyProps={{ color: 'primary', fontWeight: 700 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Stack>
  )

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={onTransitionEnd}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderColor: theme.palette.secondary.dark,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderColor: theme.palette.secondary.dark,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  )
}
