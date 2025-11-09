"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageLightboxProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  currentIndex: number
  onIndexChange: (index: number) => void
}

export default function ImageLightbox({
  images,
  isOpen,
  onClose,
  currentIndex,
  onIndexChange,
}: ImageLightboxProps) {
  const [scale, setScale] = React.useState(1)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })
  const imageRef = React.useRef<HTMLDivElement>(null)

  // Reset zoom when image changes
  React.useEffect(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [currentIndex])

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
    onIndexChange(newIndex)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
    onIndexChange(newIndex)
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 1))
  }

  const handleResetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleDoubleClick = () => {
    if (scale === 1) {
      setScale(2)
    } else {
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      setScale((prev) => Math.max(1, Math.min(3, prev + delta)))
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevious(e as any)
    } else if (e.key === "ArrowRight") {
      handleNext(e as any)
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  if (images.length === 0) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[calc(100vw-48px)] h-[calc(100vh-48px)] max-w-[calc(100vw-48px)] max-h-[calc(100vh-48px)] p-0 bg-zinc-800 border-0 shadow-none [&>button]:hidden"
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full h-full">
          {/* Image container with padding */}
          <div 
            className="flex items-center justify-center px-8 py-8 overflow-hidden w-full h-full"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          >
            <div 
              ref={imageRef}
              className="relative max-w-full max-h-[90vh] w-auto h-auto rounded-[4px] transition-transform duration-200"
              style={{
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                transformOrigin: 'center center',
              }}
              onDoubleClick={handleDoubleClick}
            >
              <Image
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1} of ${images.length}`}
                width={2000}
                height={1500}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-[4px] select-none"
                priority
                draggable={false}
              />
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm rounded-lg p-2 border border-zinc-700">
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              disabled={scale <= 1}
              className="h-8 w-8 rounded-full border-zinc-600 text-white hover:bg-zinc-700"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleResetZoom}
              disabled={scale === 1}
              className="h-8 w-8 rounded-full border-zinc-600 text-white hover:bg-zinc-700"
              aria-label="Reset zoom"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              disabled={scale >= 3}
              className="h-8 w-8 rounded-full border-zinc-600 text-white hover:bg-zinc-700"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous button */}
          {images.length > 1 && (
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full border-2 border-coral-300 text-coral-300 hover:bg-coral-300 hover:text-zinc-950 bg-zinc-950 opacity-40 hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full border-2 border-coral-300 text-coral-300 hover:bg-coral-300 hover:text-zinc-950 bg-zinc-950 opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

