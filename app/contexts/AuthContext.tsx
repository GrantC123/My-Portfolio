"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => Promise<{ success: boolean; error?: string; identifier?: string }>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated on mount by checking cookie
    const checkAuth = () => {
      const authCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('site_access='))
      
      const isAuth = authCookie?.split('=')[1] === 'granted'
      setIsAuthenticated(isAuth)
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (password: string): Promise<{ success: boolean; error?: string; identifier?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
        return { success: true, identifier: data.identifier }
      } else {
        return { success: false, error: data.error || 'Authentication failed' }
      }
    } catch (error) {
      console.error("AuthContext: Login exception:", error)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  const logout = async () => {
    // Remove the cookie
    document.cookie = 'site_access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
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

