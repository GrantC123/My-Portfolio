"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  // Redirect if already authenticated (client-side check)
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/")
    }
  }, [isAuthenticated, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      // Wait a moment for cookies to be set
      await new Promise((resolve) => setTimeout(resolve, 200))
      
      // Force a full page reload to ensure middleware picks up the session
      window.location.href = "/"
      // Don't set loading to false here - we're redirecting
    } else {
      setError(result.error || "Invalid email or password")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-md">
        <div className="bg-zinc-800 border border-zinc-500 rounded-lg p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/header-logo.svg"
              alt="Grant Crowder Logo"
              width={160}
              height={27}
              className="h-auto"
            />
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
              Welcome back
            </h1>
            <p className="text-base text-zinc-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-500 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-coral-300 transition-all autofill:bg-zinc-900 autofill:text-white"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-500 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-coral-300 transition-all autofill:bg-zinc-900 autofill:text-white"
                placeholder="Enter your password"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="primary"
                className="rounded-lg px-6 py-4 h-auto text-base leading-[27px] w-fit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

