import { AppBar, Button, Icon, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type MouseEventHandler } from 'react'
import AccountMenu from './AccountMenu'

const routesNames: { [key: string]: string }[] = [
  {
    '/my-organization/create': 'Create Organization',
  },
  { '/my-organization/update': 'Update Organization' },
  { '/my-vendor/update': 'Update Vendor' },
  { '/my-vendor/create': 'Create Vendor' },
  { '/activities/update': 'Update Activity' },
  { '/activities/payout': 'Verify Activity' },
  { '/activities/create': 'Create Activity' },
]

function getRouteName(pathname: string) {
  let foundRouteName = ''
  routesNames.forEach((routeName) => {
    Object.keys(routeName).forEach((key) => {
      if (pathname.includes(key)) {
        foundRouteName = routeName[key]
      }
    })
  })

  if (foundRouteName) return foundRouteName

  let result = pathname.replace(/\//g, '')
  result = result.replace(/-/g, ' ')
  result = result.replace(/\b\w/g, (char) => char.toUpperCase())

  return result
}

export default function CustomAppBar({
  onMenuClick,
  drawerWidth,
}: {
  onMenuClick: MouseEventHandler<HTMLButtonElement>
  drawerWidth: number
}) {
  const pathname = usePathname()

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
            {getRouteName(pathname)}
          </Typography>
        </Toolbar>
        <Toolbar disableGutters variant="dense" sx={{ gap: 2 }}>
          <Link href="/communities">
            <Button variant="contained" color="secondary" sx={{ borderRadius: 100, minWidth: 0, padding: 2 }}>
              <Icon color="primary" sx={{ lineHeight: '22px' }}>
                home
              </Icon>
            </Button>
          </Link>
          <AccountMenu />
        </Toolbar>
      </Stack>
    </AppBar>
  )
}
