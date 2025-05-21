"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

interface TOCItem {
  id: string
  label: string
}

interface StickyTOCProps {
  items: TOCItem[]
  imageRef: React.RefObject<HTMLDivElement>
}

export default function StickyTOC({ items, imageRef }: StickyTOCProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const bottomSheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the image
      if (imageRef.current) {
        const imageBottom = imageRef.current.getBoundingClientRect().bottom
        setIsVisible(imageBottom < 0)
      }

      // Determine which section is currently in view
      const sectionElements = items.map((item) => document.getElementById(item.id))
      const currentSection = sectionElements.find((element) => {
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 150 && rect.bottom > 150
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items, imageRef])

  useEffect(() => {
    // Close bottom sheet when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (bottomSheetRef.current && !bottomSheetRef.current.contains(event.target as Node)) {
        setIsBottomSheetOpen(false)
      }
    }

    if (isBottomSheetOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevent body scrolling when bottom sheet is open
      document.body.style.overflow = "hidden"
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
      // Re-enable body scrolling when bottom sheet is closed
      document.body.style.overflow = ""
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [isBottomSheetOpen])

  // Handle scrolling to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Adjust this value based on your header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
      setIsBottomSheetOpen(false) // Close the bottom sheet after clicking
    }
  }

  if (!isVisible) return null

  return (
    <>
      <div className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 shadow-sm transition-all duration-300 transform">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:block overflow-x-auto scrollbar-hide">
            <nav className="flex py-3 space-x-8">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`whitespace-nowrap text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.id)
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Navigation Button - Visible only on mobile */}
          <div className="md:hidden flex justify-between items-center py-3">
            <div className="text-sm font-medium text-gray-800">
              {activeSection ? items.find((item) => item.id === activeSection)?.label : "Contents"}
            </div>
            <button
              onClick={() => setIsBottomSheetOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-600 custom-rounded-lg hover:bg-purple-100 transition-colors"
            >
              <span className="text-sm font-medium">Sections</span>
              <Menu size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sheet - Mobile Only */}
      {isBottomSheetOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div
            ref={bottomSheetRef}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg z-50"
            style={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            <div className="flex justify-center p-2 border-b">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Sections</h3>
              <button onClick={() => setIsBottomSheetOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg ${
                        activeSection === item.id
                          ? "bg-purple-50 text-purple-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
