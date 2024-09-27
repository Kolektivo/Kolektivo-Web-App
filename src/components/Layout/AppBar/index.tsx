import { AppBar, Button, Icon, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { type MouseEventHandler } from 'react'

export default function CustomAppBar({
  onMenuClick,
  drawerWidth,
}: {
  onMenuClick: MouseEventHandler<HTMLButtonElement>
  drawerWidth: number
}) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        padding: 4,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Toolbar disableGutters variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h1" noWrap component="div">
            My Organization
          </Typography>
        </Toolbar>
        <Toolbar disableGutters variant="dense" sx={{ gap: 2 }}>
          <Button variant="contained" color="secondary" sx={{ borderRadius: 100, minWidth: 0, padding: 2 }}>
            <Icon color="primary" sx={{ lineHeight: '22px' }}>
              home
            </Icon>
          </Button>
          <Button variant="contained" color="secondary" sx={{ borderRadius: 100 }}>
            Sig In
          </Button>
        </Toolbar>
      </Stack>
    </AppBar>
  )
}
