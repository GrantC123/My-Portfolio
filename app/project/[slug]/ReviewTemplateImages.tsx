"use client"

import React, { useState } from "react"
import Image from "next/image"
import ImageLightbox from "../../components/ImageLightbox"

interface ReviewTemplateImagesProps {
  heroImage: string
  heroAlt: string
  coCreationImages: string[]
  allImages: string[]
}

export default function ReviewTemplateImages({
  heroImage,
  heroAlt,
  coCreationImages,
  allImages,
}: ReviewTemplateImagesProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <>
      {/* Hero Image */}
      <section className="w-full">
        <div className="relative w-full aspect-[1920/1080]">
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Co-creation Session Images */}
      <section className="bg-zinc-950 py-16">
        <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
          <div className="max-w-[768px] mx-auto">
            <h2 className="font-display font-bold text-4xl leading-[40px] text-white mb-6">
              Co-creation session
            </h2>
            <div className="space-y-6 mb-8">
              <p className="text-lg leading-[28px] text-zinc-400">
                We began the project with a one-hour, cross-functional co-creation workshop, bringing together design, UX research, SEO, editorial, and engineering to surface high-impact opportunities and set a unified project direction. I facilitated the session to ensure every discipline had a voice, mapping pain points, open questions, and feature ideas that directly shaped our next steps.
              </p>
              <p className="text-lg leading-[28px] text-zinc-400">
                Artifacts from this session included:
              </p>
              <p className="text-lg leading-[28px] text-zinc-400">
                Potential Opportunities: Identified and prioritized critical areas for improvement and innovation.
              </p>
              <p className="text-lg leading-[28px] text-zinc-400">
                "I Wonder": Open questions and ideas tracked to guide ongoing discovery.
              </p>
              <p className="text-lg leading-[28px] text-zinc-400">
                "State of the Union": screenshots showing review templates from each vertical
              </p>
              <p className="text-lg leading-[28px] text-zinc-400">
                This early collaboration drove alignment, secured stakeholder buy-in, and ensured that our prototypes and feature priorities were grounded in real user and business needs.
              </p>
            </div>

            {/* Image Grid - Clickable for Lightbox */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {coCreationImages.map((imageSrc, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 cursor-pointer group"
                  onClick={() => {
                    // Set index to the co-creation image (hero is not in lightbox)
                    setCurrentImageIndex(index)
                    setIsLightboxOpen(true)
                  }}
                >
                  <div className="aspect-square relative bg-zinc-800 rounded-lg overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={`Co-creation session image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ImageLightbox Component */}
      {allImages.length > 0 && (
        <ImageLightbox
          images={allImages}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          currentIndex={currentImageIndex}
          onIndexChange={setCurrentImageIndex}
        />
      )}
    </>
  )
}

