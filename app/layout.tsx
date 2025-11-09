import type React from "react"
import { inter, syne } from "./fonts"
import "./globals.css"
import { AuthProvider } from "./contexts/AuthContext"
import LayoutWrapper from "./components/LayoutWrapper"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className={inter.className}>
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
