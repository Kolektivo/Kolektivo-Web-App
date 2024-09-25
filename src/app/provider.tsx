'use client'
import SafeThemeProvider from '@/theme/SafeThemeProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SafeThemeProvider>{children}</SafeThemeProvider>
}
