'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { createClient } from '@/utils/supabase/server'

export type AuthState = {
  error: boolean
  message: string | null
}

export async function signIn(state: AuthState, formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: true, message: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signInWithGoogle() {
  const headersList = headers()
  const host = headersList.get('x-forwarded-host') || ''
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const supabase = createClient()

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${protocol}://${host}/signin/callback`,
    },
  })

  if (error) {
    return { error: true, message: error.message }
  }

  return { error: false, data }
}

export async function signOut() {
  const supabase = createClient()

  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
