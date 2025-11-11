"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import ProjectTile from "../../components/ProjectTile"
import ImageLightbox from "../../components/ImageLightbox"
import { projects } from "../../data"

interface NotionProject {
  title: string
  slug: string
  category: string
  description: string
  heroImageUrl: string
  heroTitle: string
  summary: string[]
  role: string
  timeline: string
  tools: string
  deliverables: string
  outcomes: string
  problemStatement: string
  goals: string[]
  kpis: string[]
  coCreationText: string
  coCreationImages: string[]
  competitiveResearchText: string
  competitiveFeatures: string[]
  allImages: string[]
  // Optional header overrides
  problemStatementHeader?: string
  goalsHeader?: string
  kpisHeader?: string
  coCreationHeader?: string
  competitiveResearchHeader?: string
}

export default function NotionTestPage() {
  const [project, setProject] = useState<NotionProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Get all projects except the current one for "More Projects" section
  const otherProjects = projects.filter((p) => p.slug !== "notion-test")
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
    async function fetchProject() {
      try {
        setLoading(true)
        const response = await fetch('/api/notion/projects/notion-test')
        
        if (!response.ok) {
          throw new Error('Failed to fetch project')
        }
        
        const data = await response.json()
        setProject(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching Notion project:', err)
        setError(err instanceof Error ? err.message : 'Failed to load project')
        // Fallback to static data structure for testing
        setProject({
          title: "Bankrate Review Template (Notion Test)",
          slug: "notion-test",
          category: "PRODUCT DESIGN",
          description: "A test page powered by Notion CMS",
          heroImageUrl: "/images/review-template/bankrate-review-template-header.png",
          heroTitle: "Designing modular review templates that scale across verticals",
          summary: [
            "This is a test page to demonstrate Notion CMS integration. Content is fetched from Notion and rendered with your existing styled components.",
            "If Notion is not configured, this will fallback to static data.",
          ],
          role: "Senior Product Designer",
          timeline: "4 months",
          tools: "Figma, Figjam, Confluence",
          deliverables: "Component Library, Template System, Design Documentation, Interactive Prototypes",
          outcomes: "Revenue per session, time on page, adoption percentage",
          problemStatement: "This is a test of the Notion CMS integration. Configure your Notion database to see real content here.",
          goals: [
            "Test Notion API integration",
            "Verify data transformation",
            "Ensure styling is preserved",
          ],
          kpis: [
            "API response time",
            "Data accuracy",
            "Component rendering",
          ],
          coCreationText: "This section demonstrates how co-creation content from Notion would be displayed.",
          coCreationImages: [],
          competitiveResearchText: "This section demonstrates how competitive research content from Notion would be displayed.",
          competitiveFeatures: [
            "The product image",
            "Product name and rating",
            "Pros and cons",
          ],
          allImages: ["/images/review-template/bankrate-review-template-header.png"],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading project from Notion...</div>
      </div>
    )
  }

  if (error && !project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white text-xl">Project not found</div>
      </div>
    )
  }

  // Build image arrays for lightbox
  const allImages = project.allImages.length > 0 
    ? [project.heroImageUrl, ...project.allImages].filter(Boolean)
    : project.heroImageUrl 
      ? [project.heroImageUrl]
      : []

  const coCreationImages = project.coCreationImages.length > 0
    ? project.coCreationImages
    : []

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Breadcrumbs */}
      <section className="bg-zinc-950 border-b border-zinc-500">
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
                  <BreadcrumbPage className="text-white">{project.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Hero Title */}
          <div className="py-20 md:py-30">
            <h1 className="font-display font-bold text-5xl md:text-6xl leading-[48px] md:leading-[60px] text-white w-full">
              {project.heroTitle || project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Hero Image - Clickable for Lightbox */}
      {project.heroImageUrl && (
        <section className="w-full">
          <div 
            className="relative w-full aspect-[1920/1080] cursor-pointer"
            onClick={() => {
              if (allImages.length > 0) {
                setCurrentImageIndex(0)
                setIsLightboxOpen(true)
              }
            }}
          >
            <Image
              src={project.heroImageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Project Summary Section */}
      <section className="bg-zinc-950 py-16">
        <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
          <div className="max-w-[768px] mx-auto">
            <div className="flex flex-col md:flex-row gap-10">
              {/* Left: Description */}
              <div className="flex-1">
                <h2 className="font-display font-bold text-4xl leading-[40px] text-white mb-6">
                  Project Summary
                </h2>
                <div className="space-y-6">
                  {project.summary.map((text, index) => (
                    <p key={index} className="text-lg leading-[28px] text-zinc-400">
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right: Project Details */}
              <div className="flex-1 flex flex-col gap-6">
                <div>
                  <h4 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Role</h4>
                  <p className="text-lg leading-[28px] text-zinc-400">{project.role}</p>
                </div>
                <Separator className="bg-zinc-600" />
                <div>
                  <h4 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Timeline</h4>
                  <p className="text-lg leading-[28px] text-zinc-400">{project.timeline}</p>
                </div>
                <Separator className="bg-zinc-600" />
                <div>
                  <h4 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Tools</h4>
                  <p className="text-lg leading-[28px] text-zinc-400">{project.tools}</p>
                </div>
                <Separator className="bg-zinc-600" />
                <div>
                  <h4 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Deliverables</h4>
                  <p className="text-lg leading-[28px] text-zinc-400">{project.deliverables}</p>
                </div>
                <Separator className="bg-zinc-600" />
                <div>
                  <h4 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Outcomes</h4>
                  <p className="text-lg leading-[28px] text-zinc-400">{project.outcomes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      {project.problemStatement && (
        <section className="bg-zinc-950 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
            <div className="max-w-[768px] mx-auto">
              <h2 className="font-display font-bold text-4xl leading-[40px] text-white mb-6">
                {project.problemStatementHeader || 'Problem statement'}
              </h2>
              <p className="text-lg leading-[28px] text-zinc-400 mb-12">
                {project.problemStatement}
              </p>

              {/* Goals and KPIs */}
              {(project.goals.length > 0 || project.kpis.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  {/* Goals */}
                  {project.goals.length > 0 && (
                    <div>
                      <h3 className="font-display font-bold text-3xl leading-[36px] text-white mb-6 mt-12">
                        {project.goalsHeader || 'Goals'}
                      </h3>
                      <ol className="list-decimal list-inside space-y-4 pl-4">
                        {project.goals.map((goal, index) => (
                          <li key={index} className="text-lg leading-[28px] text-zinc-400">
                            {goal}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* KPIs */}
                  {project.kpis.length > 0 && (
                    <div>
                      <h3 className="font-display font-bold text-3xl leading-[36px] text-white mb-6 mt-12">
                        {project.kpisHeader || "KPI's"}
                      </h3>
                      <ol className="list-decimal list-inside space-y-4 pl-4">
                        {project.kpis.map((kpi, index) => (
                          <li key={index} className="text-lg leading-[28px] text-zinc-400">
                            {kpi}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Co-creation Session Section */}
      {project.coCreationText && (
        <section className="bg-zinc-950 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
            <div className="max-w-[768px] mx-auto">
              <h2 className="font-display font-bold text-4xl leading-[40px] text-white mb-6">
                {project.coCreationHeader || 'Co-creation session'}
              </h2>
              <div className="space-y-6 mb-8">
                <p className="text-lg leading-[28px] text-zinc-400 whitespace-pre-line">
                  {project.coCreationText}
                </p>
              </div>

              {/* Image Grid - Clickable for Lightbox */}
              {coCreationImages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {coCreationImages.map((imageSrc, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 cursor-pointer group"
                      onClick={() => {
                        // Find the index in the allImages array (skip hero image at index 0)
                        const imageIndex = allImages.findIndex(img => img === imageSrc)
                        if (imageIndex >= 0) {
                          setCurrentImageIndex(imageIndex)
                          setIsLightboxOpen(true)
                        }
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
              )}
            </div>
          </div>
        </section>
      )}

      {/* Competitive Research Section */}
      {project.competitiveResearchText && (
        <section className="bg-zinc-950 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
            <div className="max-w-[768px] mx-auto">
              <h2 className="font-display font-bold text-4xl leading-[40px] text-white mb-6">
                {project.competitiveResearchHeader || 'Competitive research'}
              </h2>
              <div className="space-y-6 mb-8">
                <p className="text-lg leading-[28px] text-zinc-400 whitespace-pre-line">
                  {project.competitiveResearchText}
                </p>
              </div>

              {/* Features List */}
              {project.competitiveFeatures.length > 0 && (
                <ul className="space-y-4 pl-6">
                  {project.competitiveFeatures.map((feature, index) => (
                    <li key={index} className="text-lg leading-[28px] text-zinc-400 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

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

