'use client'

import IconTwoTone from '@/components/common/display/IconTwoTone'
import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

const links = [
  { name: 'Communities', href: '/communities', icon: 'communities' },
  {
    name: 'Impact',
    href: '/impact',
    icon: 'target',
  },
  { name: 'Activities', href: '/activities', icon: 'local_activity' },
  { name: 'My Organization', href: '/my-organization', icon: 'work' },
  { name: 'My Vendor', href: '/my-vendor', icon: 'storefront' },
]

export default function NavLinks() {
  const pathname = usePathname()
  const router = useRouter()
  const theme = useTheme()

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href
        return (
          <ListItem key={link.name} disablePadding>
            <ListItemButton
              onClick={() => {
                router.push(link.href)
              }}
            >
              <ListItemIcon>
                <IconTwoTone color={isActive ? 'primary' : undefined} fill={isActive}>
                  {link.icon}
                </IconTwoTone>
              </ListItemIcon>
              <ListItemText
                primary={link.name}
                primaryTypographyProps={{
                  color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
                  fontWeight: 700,
                }}
                sx={{
                  marginTop: 0,
                }}
              />
            </ListItemButton>
          </ListItem>
        )
      })}
    </>
  )
}
