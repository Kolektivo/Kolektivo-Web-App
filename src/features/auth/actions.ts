'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'


export type AuthState = {
  error: boolean
  message: string | null
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error)
    return { error: true, message: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signInWithGoogle() {
  const headersList = headers()
  const host = headersList.get('x-forwarded-host') || ''
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const supabase = await createClient()

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
  const supabase = await createClient()

  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/communities')
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()
  console.log('Creating')
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        name: formData.get('name') as string,
      },
    }
  }

  const { data, error } = await supabase.auth.signUp(userData)

  if (error) {
    console.log(error)
    return { error: true, message: error.message }
  }
  console.log('Singing')
  return await signIn(formData)
 
}
