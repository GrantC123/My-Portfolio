"use client"

import React, { useState, useMemo } from "react"
import Image from "next/image"
import ImageLightbox from "./ImageLightbox"

interface MasonryGridProps {
  images: string[]
  heroImage?: string
}

// Generate random tile sizes for visual variety
const generateTileSizes = (count: number) => {
  const sizes = []
  // Various aspect ratios to create visual variety in the masonry grid
  const aspectRatios = [
    '4/3',    // Landscape
    '3/4',    // Portrait
    '1/1',    // Square
    '16/9',   // Wide landscape
    '9/16',   // Tall portrait
    '5/4',    // Slightly wide
    '4/5',    // Slightly tall
    '3/2',    // Landscape
    '2/3',    // Portrait
    '21/9',   // Ultra wide
    '1/2',    // Very tall
  ]
  
  for (let i = 0; i < count; i++) {
    // Randomly select an aspect ratio
    const randomAspectRatio = aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
    sizes.push({ aspectRatio: randomAspectRatio })
  }
  
  return sizes
}

export default function MasonryGrid({ images, heroImage }: MasonryGridProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Generate randomized tile sizes once when images change
  const tileSizes = useMemo(() => generateTileSizes(images.length), [images.length])

  // Memoize the combined images array - this is what we'll use for the lightbox
  const allImages = useMemo(() => {
    return heroImage ? [heroImage, ...images] : images
  }, [images, heroImage])

  const handleImageClick = (index: number) => {
    // Calculate the correct index in the allImages array
    const lightboxIndex = heroImage ? index + 1 : index
    
    // Ensure the index is valid
    if (lightboxIndex >= 0 && lightboxIndex < allImages.length) {
      setCurrentImageIndex(lightboxIndex)
      setIsLightboxOpen(true)
    }
  }

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {images.map((imageSrc, index) => {
          const tileSize = tileSizes[index]
          
          return (
            <div
              key={`${imageSrc}-${index}`}
              className="break-inside-avoid mb-4 cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <div 
                className="relative rounded-lg overflow-hidden bg-zinc-800 w-full"
                style={{ 
                  aspectRatio: tileSize.aspectRatio
                }}
              >
                <Image
                  src={imageSrc}
                  alt={`Editorial image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg pointer-events-none" />
              </div>
            </div>
          )
        })}
      </div>

      <ImageLightbox
        images={allImages}
        isOpen={isLightboxOpen && allImages.length > 0}
        onClose={() => setIsLightboxOpen(false)}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
      />
    </>
  )
}

