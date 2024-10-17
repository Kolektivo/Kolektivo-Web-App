'use client'
import { signOut as supabaseSingOut } from '@/features/auth/actions'
import { type User } from '@supabase/supabase-js'
import { createContext, type ReactElement, type ReactNode, useState } from 'react'

interface AuthContextType {
  user: User | null
  signIn: (user: User) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children, authUser }: { children: ReactNode; authUser: User | null }): ReactElement => {
  const [user, setUser] = useState<User | null>(authUser)

  const signIn = (user: User) => setUser(user)
  const signOut = async () => {
    await supabaseSingOut()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

export default AuthProvider
