import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    console.error(error)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        console.log('Redirect ', `${origin}${next}`)
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        console.log('Redirect ', `https://${forwardedHost}${next}`)
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        console.log('Redirect ', `${origin}${next}`)
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
    
  }
  
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
