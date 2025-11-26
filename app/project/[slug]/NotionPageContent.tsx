"use client"

import React, { useState } from "react"
import { renderNotionBlocks, type NotionBlock } from "@/lib/notion/block-renderer"
import { extractPageMetadata } from "@/lib/notion/page-properties"
import { collectAllImages } from "@/lib/notion/collect-images"
import { normalizeImageUrl } from "@/lib/notion/image-url-utils"
import ImageLightbox from "../../components/ImageLightbox"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ProjectTile, { Project } from "../../components/ProjectTile"
import { projects } from "../../data"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface NotionPageContentProps {
  page: any
  blocks: NotionBlock[]
  slug?: string
  nextProject?: Project | null
}

export default function NotionPageContent({ page, blocks, slug, nextProject }: NotionPageContentProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Extract page metadata
  const metadata = extractPageMetadata(page, blocks)
  const pageTitle = metadata.title
  const heroTitle = metadata.heroTitle || metadata.title
  
  // Format slug for breadcrumb (convert hyphens to spaces and capitalize)
  const formatSlug = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  const breadcrumbText = slug ? formatSlug(slug) : pageTitle

  // Collect all images for lightbox (including featured image and nested images in columns)
  // Normalize all URLs to ensure consistent matching between collection and rendering
  const allImages: string[] = []
  if (metadata.featuredImage) {
    const normalizedFeaturedImage = normalizeImageUrl(metadata.featuredImage)
    if (normalizedFeaturedImage && !allImages.includes(normalizedFeaturedImage)) {
      allImages.push(normalizedFeaturedImage)
    }
  }
  // Recursively collect all images from blocks (including nested ones in columns)
  // Note: collectAllImages already normalizes URLs, but we normalize again here for extra safety
  const blockImages = collectAllImages(blocks)
  blockImages.forEach((imageUrl) => {
    const normalizedUrl = normalizeImageUrl(imageUrl)
    if (normalizedUrl && !allImages.includes(normalizedUrl)) {
      allImages.push(normalizedUrl)
    }
  })

  // Determine which projects to show in "More Projects" section
  // If nextProject is specified from Notion, use it; otherwise use default behavior
  let displayProjects: Project[] = []
  let showNavigation = false
  
  if (nextProject) {
    // Show only the specified next project
    displayProjects = [nextProject]
    showNavigation = false
  } else {
    // Fallback to default behavior: show first 2 projects (excluding current)
    const otherProjects = projects.filter(p => p.slug !== slug).slice(0, 2)
    displayProjects = otherProjects
    showNavigation = otherProjects.length > 2
  }
  
  const [previewStartIndex, setPreviewStartIndex] = useState(0)
  const previewCount = Math.min(2, displayProjects.length)
  const currentPreviewProjects = displayProjects.slice(previewStartIndex, previewStartIndex + previewCount)

  const handlePrevious = () => {
    setPreviewStartIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      return newIndex < 0 ? displayProjects.length - 1 : newIndex
    })
  }

  const handleNext = () => {
    setPreviewStartIndex((prevIndex) => {
      const newIndex = prevIndex + 1
      return newIndex >= displayProjects.length ? 0 : newIndex
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Breadcrumbs */}
      <section className="bg-zinc-950 border-b border-zinc-500 relative z-0">
        <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
          {/* Breadcrumbs */}
          <div className="pt-16 pb-4">
            <Breadcrumb>
              <BreadcrumbList className="text-zinc-400">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="text-zinc-400 hover:text-white underline">
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-zinc-600">
                  <span>/</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/#work" className="text-zinc-400 hover:text-white underline">
                      Work
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-zinc-600">
                  <span>/</span>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">{breadcrumbText}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Hero Title */}
          <div className="py-20 md:py-30">
            <h1 className="font-display font-bold text-5xl md:text-6xl leading-[48px] md:leading-[60px] text-white w-full">
              {heroTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {metadata.featuredImage && typeof metadata.featuredImage === 'string' && (
        <section className="w-full">
          <div className="relative w-full aspect-[1920/1080]">
            <Image
              src={metadata.featuredImage}
              alt={pageTitle}
              fill
              className="object-cover"
              priority
              unoptimized={metadata.featuredImage.startsWith('http') ? false : true}
            />
          </div>
        </section>
      )}

      {/* Project Summary Section */}
      {(metadata.summary || metadata.role || metadata.timeline || metadata.tools || metadata.deliverables || metadata.outcomes) && (
        <section className="bg-zinc-950 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
            <div className="max-w-[768px] mx-auto">
              <div className="flex flex-col md:flex-row gap-10">
                {/* Left: Summary */}
                <div className="flex-1">
                  <h2 className="font-display font-bold text-4xl leading-[40px] text-white mb-6">
                    Project Summary
                  </h2>
                  {metadata.summary ? (
                    <p className="text-lg leading-[28px] text-zinc-400">
                      {metadata.summary}
                    </p>
                  ) : (
                    <p className="text-lg leading-[28px] text-zinc-400 italic text-zinc-500">
                      Add a summary in Notion using the "Summary", "Project Summary", or "Summary Text 1" property.
                    </p>
                  )}
                </div>

                {/* Right: Project Details */}
                <div className="flex-1 flex flex-col gap-6">
                  {metadata.role ? (
                    <>
                      <div>
                        <h4 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Role</h4>
                        <p className="text-lg leading-[28px] text-zinc-400">{metadata.role}</p>
                      </div>
                      <Separator className="bg-zinc-600" />
                    </>
                  ) : null}
                  {metadata.timeline ? (
                    <>
                      <div>
                        <h4 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Timeline</h4>
                        <p className="text-lg leading-[28px] text-zinc-400">{metadata.timeline}</p>
                      </div>
                      <Separator className="bg-zinc-600" />
                    </>
                  ) : null}
                  {metadata.tools ? (
                    <>
                      <div>
                        <h4 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Tools</h4>
                        <p className="text-lg leading-[28px] text-zinc-400">{metadata.tools}</p>
                      </div>
                      <Separator className="bg-zinc-600" />
                    </>
                  ) : null}
                  {metadata.deliverables ? (
                    <>
                      <div>
                        <h4 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Deliverables</h4>
                        <p className="text-lg leading-[28px] text-zinc-400">{metadata.deliverables}</p>
                      </div>
                      <Separator className="bg-zinc-600" />
                    </>
                  ) : null}
                  {metadata.outcomes ? (
                    <div>
                      <h4 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Outcomes</h4>
                      <p className="text-lg leading-[28px] text-zinc-400">{metadata.outcomes}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="bg-zinc-950 py-16">
        <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
          <div className="max-w-[768px] mx-auto">
            {(() => {
              const filteredBlocks = blocks.filter((block: any) => {
                // Skip first image if used as featured image
                if (block.type === 'image' && metadata.featuredImage) {
                  const imageUrl = block.image?.file?.url || block.image?.external?.url
                  if (imageUrl === metadata.featuredImage) {
                    return false
                  }
                }
                return true
              })
              
              return renderNotionBlocks(
                filteredBlocks,
                allImages,
                (index) => {
                  setCurrentImageIndex(index)
                  setIsLightboxOpen(true)
                }
              )
            })()}
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

      {/* More Projects Section */}
      <section className="bg-zinc-900 py-16 border-t border-zinc-500">
        <div className="container mx-auto px-6 md:px-36 max-w-[1280px]">
          <h2 className="font-display font-bold text-[30px] leading-[36px] text-white mb-8">Next Project</h2>
          <div className="flex flex-col gap-8 max-w-[1152px]">
            {currentPreviewProjects.map((previewProject, index) => (
              <ProjectTile key={index} project={previewProject} />
            ))}
          </div>

          {/* Navigation Buttons - only show if there are multiple projects to cycle through */}
          {showNavigation && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-4 py-2 border border-zinc-500 rounded-lg hover:bg-zinc-800 text-white transition-colors"
                aria-label="Show previous projects"
              >
                <ArrowLeft size={16} />
                <span>Previous</span>
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 border border-zinc-500 rounded-lg hover:bg-zinc-800 text-white transition-colors"
                aria-label="Show next projects"
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

