import AuthProvider from '@/components/auth/AuthProvider'
import Layout from '@/components/common/Layout'
import { createClient } from '@/utils/supabase/server'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()

  return (
    <AuthProvider authUser={data.user}>
      <Layout>{children}</Layout>
    </AuthProvider>
  )
}
