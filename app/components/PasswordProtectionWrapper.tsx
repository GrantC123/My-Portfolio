"use client"

import type React from "react"

import { useState, useEffect } from "react"
import PasswordProtect from "../password-protect"

interface PasswordProtectionWrapperProps {
  children: React.ReactNode
}

export default function PasswordProtectionWrapper({ children }: PasswordProtectionWrapperProps) {
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For preview purposes, always show the password screen initially
    setHasAccess(false)
    setLoading(false)

    // Uncomment this for production use
    // const accessStatus = localStorage.getItem("site_access")
    // setHasAccess(accessStatus === "granted")
    // setLoading(false)
  }, [])

  const handleAccessGranted = () => {
    setHasAccess(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="animate-pulse text-purple-600">Loading...</div>
      </div>
    )
  }

  if (!hasAccess) {
    return <PasswordProtect onAccessGranted={handleAccessGranted} />
  }

  return <>{children}</>
}
