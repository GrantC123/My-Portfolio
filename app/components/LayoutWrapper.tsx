"use client"

import { usePathname } from "next/navigation"
import Navigation from "./Navigation"
import Footer from "./Footer"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}

