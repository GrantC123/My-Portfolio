"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsAuthenticated(!!user)
      setLoading(false)
    }

    checkUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsAuthenticated(!!session?.user)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('AuthContext: Attempting login...')
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('AuthContext: Login response:', { hasData: !!data, hasError: !!error, hasUser: !!data?.user, hasSession: !!data?.session })

      if (error) {
        console.error('AuthContext: Login error:', error)
        return { success: false, error: error.message }
      }

      if (data.user && data.session) {
        console.log('AuthContext: Login successful, setting user state')
        setUser(data.user)
        setIsAuthenticated(true)
        // The session should be automatically set in cookies by Supabase SSR
        return { success: true }
      }

      console.error('AuthContext: Login failed - no user or session')
      return { success: false, error: "Login failed - no session created" }
    } catch (error) {
      console.error("AuthContext: Login exception:", error)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

