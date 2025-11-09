"use client"

import { useState, useEffect } from "react"
import MasonryGrid from "./MasonryGrid"

export default function EditorialGallery() {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/editorial-images')
        const data = await response.json()
        if (data.images) {
          setImages(data.images)
        }
      } catch (error) {
        console.error('Error fetching editorial images:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-zinc-400">Loading images...</div>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-zinc-400">No images found</div>
      </div>
    )
  }

  return (
    <MasonryGrid 
      images={images}
      heroImage="/images/editorial/editorial-imagery-header.jpg"
    />
  )
}

