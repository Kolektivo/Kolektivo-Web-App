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

      const { data: { user } } = await supabase.auth.getUser()

      const last_sign_in_at = new Date(user!.last_sign_in_at ?? 0)
      const createdAt = new Date(user!.created_at)

      const isNewUser = (Date.now() - createdAt.getTime()) < 60000 && (last_sign_in_at.getTime() - createdAt.getTime()) < 3000
      let redirectURL = ""
      if (isNewUser) {
        redirectURL = '/signup/choose-community'
      }
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        console.log('Redirect ', `${origin}${next}${redirectURL}`)
        return NextResponse.redirect(`${origin}${next}${redirectURL}`)
      } else if (forwardedHost) {
        console.log('Redirect ', `https://${forwardedHost}${next}${redirectURL}`)
        return NextResponse.redirect(`https://${forwardedHost}${next}${redirectURL}`)
      } else {
        console.log('Redirect ', `${origin}${next}${redirectURL}`)
        return NextResponse.redirect(`${origin}${next}${redirectURL}`)
      }
    }

  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
