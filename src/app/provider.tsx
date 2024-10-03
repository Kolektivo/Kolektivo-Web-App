'use client'
import SafeThemeProvider from '@/theme/SafeThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SafeThemeProvider>{children}</SafeThemeProvider>
    </QueryClientProvider>
  )
}
