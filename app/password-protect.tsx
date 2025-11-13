"use client"

import type React from "react"

import { useState } from "react"

export default function PasswordProtect({ onAccessGranted }: { onAccessGranted: () => void }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

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
        // Wait a moment for cookies to be set
        await new Promise((resolve) => setTimeout(resolve, 200))
        // Reload the page to ensure middleware picks up the cookie
        window.location.href = "/"
      } else {
        setError(data.error || "Incorrect password")
        setLoading(false)
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-900">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div>
          <div className="flex justify-center mb-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Grant%20Crowder%20Logo-ovgYoYejWF3N13GnmpP77JiW4hWGII.svg"
              alt="Grant Crowder Logo"
              width="160"
              height="43"
              className="h-auto"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Password Protected</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Please enter the password to access this site</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="password-input appearance-none !rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder="Enter site password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "0.5rem !important" }}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="password-button !rounded-lg group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: "0.5rem !important" }}
            >
              {loading ? "Verifying..." : "Access Site"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
