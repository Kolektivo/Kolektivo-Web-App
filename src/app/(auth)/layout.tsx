import { Box, Stack } from '@mui/material'
import Image from 'next/image'
import logo from '@/public/images/logo.svg'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Stack gap={8} justifyContent="center" alignItems="center" minHeight="100vh" paddingY={3}>
      <Box>{children}</Box>
      <Image src={logo} alt="logo" width={138} height={36} />
    </Stack>
  )
}
