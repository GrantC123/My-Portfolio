import type React from "react"
import { inter } from "./fonts"
import "./globals.css"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
