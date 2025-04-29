import type React from "react"
import { inter } from "./fonts"
import "./globals.css"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import PasswordProtectionWrapper from "./components/PasswordProtectionWrapper"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <PasswordProtectionWrapper>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </PasswordProtectionWrapper>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
