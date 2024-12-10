import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/config/constants'
import { createClient } from '@supabase/supabase-js'

export function createAnonymousClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
