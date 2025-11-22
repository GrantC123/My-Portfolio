"use client"

import React from "react"
import Link from "next/link"
import styles from "./Navigation.module.css"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.48162 22.4795H16.5184C20.0988 22.4795 22.5 19.9736 22.5 16.2363V7.72274C22.5 3.98536 20.0988 1.47949 16.5184 1.47949H7.48162C3.90123 1.47949 1.5 3.99607 1.5 7.72274V16.2363C1.5 19.9736 3.90123 22.4795 7.48162 22.4795ZM3.21516 7.73344C3.21516 4.98128 4.88744 3.20361 7.48162 3.20361H16.5184C19.1126 3.20361 20.7848 4.98128 20.7848 7.73344V16.247C20.7848 18.9991 19.1126 20.7768 16.5184 20.7768H7.48162C4.88744 20.7768 3.21516 18.9991 3.21516 16.247V7.73344ZM6.61304 15.5078C6.61304 15.979 6.99895 16.3645 7.47062 16.3645C7.94229 16.3645 8.3282 15.979 8.3282 15.5078V11.4706C8.3282 10.9994 7.94229 10.6139 7.47062 10.6139C6.99895 10.6139 6.61304 10.9994 6.61304 11.4706V15.5078ZM16.5397 16.3649C16.068 16.3649 15.6821 15.9793 15.6821 15.5081V11.8564C15.6821 10.8177 14.8352 9.96098 13.7847 9.96098C12.7342 9.96098 11.898 10.807 11.898 11.8564V15.5081C11.898 15.9793 11.5121 16.3649 11.0404 16.3649C10.5688 16.3649 10.1829 15.9793 10.1829 15.5081V11.8564C10.1829 9.8646 11.8015 8.25828 13.7847 8.25828C15.7679 8.25828 17.3973 9.87531 17.3973 11.8564V15.5081C17.3973 15.9793 17.0113 16.3649 16.5397 16.3649ZM8.37148 8.46181C8.37148 8.95862 7.96833 9.36135 7.47102 9.36135C6.97371 9.36135 6.57056 8.95862 6.57056 8.46181C6.57056 7.96501 6.97371 7.56227 7.47102 7.56227C7.96833 7.56227 8.37148 7.96501 8.37148 8.46181Z"
        fill="currentColor"
      />
    </svg>
  )
}

interface NavigationProps {
  showProgressBar?: boolean
}

export default function Navigation({ showProgressBar }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()
  const isProjectPage = pathname?.startsWith("/project/")
  const shouldShowProgressBar = showProgressBar !== undefined ? showProgressBar : isProjectPage

  useEffect(() => {
    if (!shouldShowProgressBar) return

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [shouldShowProgressBar])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="relative border-b border-zinc-500 bg-zinc-950">
      <div className="container mx-auto px-4 max-w-[1280px] py-4 flex justify-between items-center relative z-20 bg-zinc-950">
        <Link href="/">
          <img
            src="/images/header-logo.svg"
            alt="Grant Crowder Logo"
            width="160"
            height="27"
            className="h-auto"
          />
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden focus:outline-none text-white relative z-30"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/#work" className="text-sm text-white transition-colors hover:text-coral-300">
            Work
          </Link>
          <Link href="/about" className="text-sm text-white transition-colors hover:text-coral-300">
            About
          </Link>
          <Link
            href="https://www.linkedin.com/in/grantcrowder/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white hover:text-coral-300 transition-colors"
          >
            <LinkedInIcon />
          </Link>
        </div>
      </div>

      {/* Mobile navigation */}
      <div 
        className={`md:hidden absolute w-full top-full left-0 z-10 transition-all duration-300 ease-out ${
          isMenuOpen 
            ? 'translate-y-0 max-h-96 opacity-100' 
            : '-translate-y-full max-h-0 opacity-0 pointer-events-none overflow-hidden'
        }`}
      >
        <div className="py-4 px-4 bg-zinc-800 border-t border-b border-zinc-500 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link
              href="/#work"
              className="text-lg py-2 text-white hover:text-coral-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </Link>
            <Link
              href="/about"
              className="text-lg py-2 text-white hover:text-coral-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="https://www.linkedin.com/in/grantcrowder/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg py-2 text-white hover:text-coral-300 transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <LinkedInIcon />
              LinkedIn
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      {shouldShowProgressBar && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800 z-30">
          <div 
            className="h-full bg-coral-300 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}
    </nav>
  )
}
