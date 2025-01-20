import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/config/constants'
import { createBrowserClient } from '@supabase/ssr'


export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

