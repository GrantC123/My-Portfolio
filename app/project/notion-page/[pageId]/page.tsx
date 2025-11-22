"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { renderNotionBlocks, type NotionBlock } from "@/lib/notion/block-renderer"
import { extractPageMetadata } from "@/lib/notion/page-properties"
import { collectAllImages } from "@/lib/notion/collect-images"
import ImageLightbox from "../../../components/ImageLightbox"
import ProjectTile from "../../../components/ProjectTile"
import { projects } from "../../../data"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

export default function NotionPageView({ params }: { params: { pageId: string } }) {
  const [pageData, setPageData] = useState<{ page: any; blocks: NotionBlock[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Get all projects except the current one for "More Projects" section
  const otherProjects = projects.filter((p) => p.slug !== params.pageId)
  const [previewStartIndex, setPreviewStartIndex] = useState(0)
  const previewCount = Math.min(2, otherProjects.length)
  const currentPreviewProjects = otherProjects.slice(previewStartIndex, previewStartIndex + previewCount)

  if (currentPreviewProjects.length < previewCount && otherProjects.length > 0) {
    const remaining = previewCount - currentPreviewProjects.length
    const wrappedProjects = otherProjects.slice(0, remaining)
    currentPreviewProjects.push(...wrappedProjects)
  }

  const handlePrevious = () => {
    setPreviewStartIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      return newIndex < 0 ? otherProjects.length - 1 : newIndex
    })
  }

  const handleNext = () => {
    setPreviewStartIndex((prevIndex) => {
      const newIndex = prevIndex + 1
      return newIndex >= otherProjects.length ? 0 : newIndex
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchPage() {
      try {
        setLoading(true)
        const response = await fetch(`/api/notion/pages/${params.pageId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch page')
        }
        
        const data = await response.json()
        setPageData(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching Notion page:', err)
        setError(err instanceof Error ? err.message : 'Failed to load page')
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [params.pageId])

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading page from Notion...</div>
      </div>
    )
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white text-xl">Error: {error || 'Page not found'}</div>
      </div>
    )
  }

  // Extract page metadata (with blocks for fallback extraction)
  const metadata = extractPageMetadata(pageData.page, pageData.blocks)
  const pageTitle = metadata.title
  const heroTitle = metadata.heroTitle || metadata.title

  // Collect all images for lightbox (including featured image and nested images in columns)
  const allImages: string[] = []
  if (metadata.featuredImage) {
    allImages.push(metadata.featuredImage)
  }
  // Recursively collect all images from blocks (including nested ones in columns)
  const blockImages = collectAllImages(pageData.blocks)
  blockImages.forEach((imageUrl) => {
    if (!allImages.includes(imageUrl)) {
      allImages.push(imageUrl)
    }
  })

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
                  <BreadcrumbPage className="text-white">{pageTitle}</BreadcrumbPage>
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

      {/* Project Summary Section - Always show if any property exists */}
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
            {renderNotionBlocks(
              // Filter out blocks used as metadata
              pageData.blocks.filter((block: any) => {
                // Skip first image if used as featured image
                if (block.type === 'image' && metadata.featuredImage) {
                  const imageUrl = block.image?.file?.url || block.image?.external?.url
                  if (imageUrl === metadata.featuredImage) {
                    return false
                  }
                }
                // Skip summary callout if used as summary
                if (block.type === 'callout' && metadata.summary) {
                  const icon = block.callout?.icon
                  const text = block.callout?.rich_text?.map((t: any) => t.plain_text).join('') || ''
                  if ((icon?.emoji === '📋' || icon?.emoji === '📝' || text.toLowerCase().includes('summary')) && 
                      text === metadata.summary) {
                    return false
                  }
                }
                // Skip summary heading + next paragraph if used as summary
                if (block.type === 'heading_2' && metadata.summary) {
                  const text = block.heading_2?.rich_text?.map((t: any) => t.plain_text).join('') || ''
                  if (text.toLowerCase().includes('summary')) {
                    const blockIndex = pageData.blocks.indexOf(block)
                    const nextBlock = pageData.blocks[blockIndex + 1]
                    if (nextBlock && nextBlock.type === 'paragraph') {
                      const nextText = nextBlock.paragraph?.rich_text?.map((t: any) => t.plain_text).join('') || ''
                      if (nextText === metadata.summary) {
                        // Skip both this heading and the next paragraph
                        return false
                      }
                    }
                  }
                }
                // Skip paragraph that follows summary heading
                if (block.type === 'paragraph' && metadata.summary) {
                  const text = block.paragraph?.rich_text?.map((t: any) => t.plain_text).join('') || ''
                  const blockIndex = pageData.blocks.indexOf(block)
                  const prevBlock = pageData.blocks[blockIndex - 1]
                  if (prevBlock && prevBlock.type === 'heading_2') {
                    const prevText = prevBlock.heading_2?.rich_text?.map((t: any) => t.plain_text).join('') || ''
                    if (prevText.toLowerCase().includes('summary') && text === metadata.summary) {
                      return false
                    }
                  }
                }
                return true
              }),
              allImages,
              (index) => {
                setCurrentImageIndex(index)
                setIsLightboxOpen(true)
              }
            )}
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
          <h2 className="font-display font-bold text-[30px] leading-[36px] text-white mb-8">More Projects</h2>
          <div className="flex flex-col gap-8 max-w-[1152px]">
            {currentPreviewProjects.map((previewProject, index) => (
              <ProjectTile key={index} project={previewProject} />
            ))}
          </div>

          {/* Navigation Buttons */}
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
        </div>
      </section>
    </div>
  )
}

