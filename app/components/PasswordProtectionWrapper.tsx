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
    const accessStatus = localStorage.getItem("site_access")
    setHasAccess(accessStatus === "granted")
    setLoading(false)
  }, [])

  const handleAccessGranted = () => {
    setHasAccess(true)
  }

  if (loading) {
    return null // or a loading spinner
  }

  if (!hasAccess) {
    return <PasswordProtect onAccessGranted={handleAccessGranted} />
  }

  return <>{children}</>
}
