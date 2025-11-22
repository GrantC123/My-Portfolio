"use client"

import React, { useState } from "react"
import { renderNotionBlocks, type NotionBlock } from "@/lib/notion/block-renderer"
import { extractPageMetadata } from "@/lib/notion/page-properties"
import { normalizeImageUrl } from "@/lib/notion/image-url-utils"
import ImageLightbox from "../components/ImageLightbox"
import Image from "next/image"

interface AboutNotionContentProps {
  page: any
  blocks: NotionBlock[]
  allImages: string[]
}

export default function AboutNotionContent({ page, blocks, allImages }: AboutNotionContentProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const metadata = extractPageMetadata(page, blocks)
  const pageTitle = metadata.title || "About"
  const featuredImage = metadata.featuredImage

  const handleImageClick = (imageUrl: string) => {
    const normalizedUrl = normalizeImageUrl(imageUrl)
    const imageIndex = allImages.findIndex(
      (img) => normalizeImageUrl(img) === normalizedUrl
    )
    if (imageIndex >= 0) {
      setCurrentImageIndex(imageIndex)
      setIsLightboxOpen(true)
    }
  }

  const handleClose = () => {
    setIsLightboxOpen(false)
  }

  const handleIndexChange = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <main>
        {/* Hero Section with Featured Image */}
        {featuredImage && typeof featuredImage === 'string' && (
          <section className="pt-16 pb-16 bg-zinc-950">
            <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
              <div className="max-w-[768px] mx-auto">
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900">
                  <Image
                    src={featuredImage}
                    alt={pageTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-contain object-top rounded-xl cursor-pointer"
                    priority
                    unoptimized={featuredImage.startsWith('http') ? false : true}
                    onClick={() => handleImageClick(featuredImage)}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Notion Content */}
        <section className="bg-zinc-950 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
            <div className="max-w-[768px] mx-auto">
                {(() => {
                  // Filter out featured image if it exists
                  const filteredBlocks = blocks.filter((block: any) => {
                    if (block.type === 'image' && featuredImage) {
                      const imageUrl = block.image?.file?.url || block.image?.external?.url
                      if (imageUrl === featuredImage) {
                        return false
                      }
                    }
                    return true
                  })
                  
                  return renderNotionBlocks(
                    filteredBlocks,
                    allImages,
                    (index: number) => {
                      setCurrentImageIndex(index)
                      setIsLightboxOpen(true)
                    }
                  )
                })()}
            </div>
          </div>
        </section>
      </main>

      {/* Image Lightbox */}
      {allImages.length > 0 && (
        <ImageLightbox
          images={allImages}
          isOpen={isLightboxOpen}
          currentIndex={currentImageIndex}
          onClose={handleClose}
          onIndexChange={handleIndexChange}
        />
      )}
    </div>
  )
}
