"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { projects } from "../../data"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Get all projects except the current one
  const otherProjects = projects.filter((p) => p.slug !== params.slug)

  // State to track which projects are currently being shown in the preview
  const [previewStartIndex, setPreviewStartIndex] = useState(0)

  // Calculate how many projects to show in the preview (2 or fewer if not enough projects)
  const previewCount = Math.min(2, otherProjects.length)

  // Get the current preview projects
  const currentPreviewProjects = otherProjects.slice(previewStartIndex, previewStartIndex + previewCount)

  // If we don't have enough projects from the current index, wrap around to the beginning
  if (currentPreviewProjects.length < previewCount && otherProjects.length > 0) {
    const remaining = previewCount - currentPreviewProjects.length
    const wrappedProjects = otherProjects.slice(0, remaining)
    currentPreviewProjects.push(...wrappedProjects)
  }

  // Handle previous button click for project previews
  const handlePrevious = () => {
    setPreviewStartIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      return newIndex < 0 ? otherProjects.length - 1 : newIndex
    })
  }

  // Handle next button click for project previews
  const handleNext = () => {
    setPreviewStartIndex((prevIndex) => {
      const newIndex = prevIndex + 1
      return newIndex >= otherProjects.length ? 0 : newIndex
    })
  }

  // Gallery images for Editorial Imagery project
  const galleryImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Next-advisor-lady.jpg-hz9D3Emm39SGLvhk6v98MWLNdO2TsB.jpeg",
      alt: "Woman with financial documents",
      title: "Financial Planning",
      description: "Editorial illustration for NextAdvisor article on personal finance",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-in-3-Americans-say-the-state-of-the-US-economy-is-harming-their-mental-health.jpg-uvcPQaJJq4BsODH77yaLcKXyZJrD30.jpeg",
      alt: "Melting dollar bill illustration with person standing beneath it",
      title: "Economic Anxiety",
      description:
        "Editorial illustration for '1 in 3 Americans say the state of the US economy is harming their mental health'",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-common-types-of-bank-account-fraud-and-how-to-protect-yourself.jpg-BHntnFB9wa05oRV9HLkQSCCmDlQ40b.jpeg",
      alt: "Laptop with binary code and floating check",
      title: "Bank Account Fraud",
      description: "Editorial illustration for '5 common types of bank account fraud and how to protect yourself'",
    },
    {
      src: "/placeholder.svg?key=39rul",
      alt: "Money management illustration",
      title: "Budget Planning",
      description: "Editorial design for budget planning article",
    },
    {
      src: "/placeholder.svg?key=yo2ti",
      alt: "Retirement planning illustration",
      title: "Retirement Planning",
      description: "Magazine feature on retirement strategies",
    },
    {
      src: "/placeholder.svg?key=e1mnn",
      alt: "Mortgage rates illustration",
      title: "Mortgage Guide",
      description: "Visual guide to understanding mortgage rates",
    },
  ]

  // Open lightbox with specific image index
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
  }

  // Navigate to previous image in lightbox
  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      return newIndex < 0 ? galleryImages.length - 1 : newIndex
    })
  }

  // Navigate to next image in lightbox
  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex + 1
      return newIndex >= galleryImages.length ? 0 : newIndex
    })
  }

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return

      if (e.key === "ArrowLeft") {
        prevImage()
      } else if (e.key === "ArrowRight") {
        nextImage()
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen])

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [params.slug])

  if (!project) {
    return <div>Project not found</div>
  }

  // Check if this is the Editorial Imagery project
  const isGalleryProject = project.slug === "editorial-imagery"

  // For Bankrate project, we have a special image
  const bankrateImage =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bankrate-DC-Cover-7B6cx26SzmCuDaMgE8FUqZ8XyQoso5.png"

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#151515]" id="project-top">
      <header className="py-4">
        <div className="container mx-auto px-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-[#595959] hover:text-[#450BEC] transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 text-[#595959]">/</span>
                <span className="text-[#151515]">{project.title}</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {isGalleryProject ? (
          /* Gallery Layout for Editorial Imagery */
          <>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-[#595959] mb-8">{project.category}</p>

            <div className="mb-16">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={1200}
                height={600}
                className="rounded-2xl w-full object-cover"
              />
            </div>

            <div className="mb-16">
              <p className="text-lg text-[#333333] mb-8 max-w-3xl">
                {project.overview ||
                  "A collection of editorial illustrations and designs created for various financial publications and digital platforms. These visuals were designed to complement articles, enhance reader engagement, and communicate complex financial concepts in an accessible way."}
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                      <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-bold text-lg">{image.title}</h3>
                        <p className="text-sm opacity-90">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Details */}
            <div className="bg-gray-50 rounded-xl p-8 mb-16">
              <h2 className="text-2xl font-bold mb-6">Project Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <strong className="block text-[#595959] mb-2">Client</strong>
                  <p>{project.client}</p>
                </div>
                <div>
                  <strong className="block text-[#595959] mb-2">Timeline</strong>
                  <p>{project.timeline}</p>
                </div>
                <div>
                  <strong className="block text-[#595959] mb-2">Role</strong>
                  <p>{project.role}</p>
                </div>
                <div>
                  <strong className="block text-[#595959] mb-2">Deliverables</strong>
                  <p>{project.deliverables}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Case Study Layout for other projects */
          <>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-[#595959] mb-8">{project.category}</p>

            <div className="mb-16">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={1200}
                height={600}
                className="rounded-2xl w-full object-cover"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-[#333333] mb-4">{project.overview || "No overview available."}</p>

                <h2 className="text-2xl font-bold mb-4">Challenge</h2>
                <p className="text-[#333333] mb-4">{project.challenge || "No challenge description available."}</p>
                {project.challengeDetails && (
                  <>
                    <p className="text-[#333333] mb-4">{project.challengeDetails}</p>
                    {project.challengeList && (
                      <ul className="list-disc list-inside mb-4 text-[#333333]">
                        {project.challengeList.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}

                <h2 className="text-2xl font-bold mb-4">Solution</h2>
                <p className="text-[#333333] mb-8">{project.solution || "No solution description available."}</p>
                {project.solutionDetails && <p className="text-[#333333] mb-8">{project.solutionDetails}</p>}
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Project Details</h2>
                <ul className="space-y-4">
                  <li>
                    <strong className="block text-[#595959]">Client</strong>
                    {project.client}
                  </li>
                  <li>
                    <strong className="block text-[#595959]">Timeline</strong>
                    {project.timeline}
                  </li>
                  <li>
                    <strong className="block text-[#595959]">Role</strong>
                    {project.role}
                  </li>
                  <li>
                    <strong className="block text-[#595959]">Deliverables</strong>
                    {project.deliverables}
                  </li>
                </ul>
              </div>
            </div>

            {project.slug === "bankrate-data-center" && (
              <>
                <button
                  onClick={() => {
                    // For Bankrate, we'll use a special case since it's not part of the gallery
                    setCurrentImageIndex(0)
                    setIsLightboxOpen(true)
                  }}
                  className="mt-16 -mx-4 md:-mx-8 lg:-mx-16 w-full cursor-zoom-in"
                >
                  <Image
                    src={bankrateImage || "/placeholder.svg"}
                    alt="Bankrate Data Center interface showing the homepage with search functionality and data visualization"
                    width={1920}
                    height={1080}
                    className="w-full"
                  />
                  <div className="mt-8 w-full overflow-hidden">
                    <iframe
                      style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                      width="100%"
                      height="450"
                      src="https://embed.figma.com/proto/02uA4cdzWuSSIye9lzyTKo/Grant-Crowder---Portfolio?page-id=3490%3A90651&node-id=3581-1994&viewport=-129%2C865%2C0.2&scaling=scale-down-width&content-scaling=fixed&embed-host=share"
                      allowFullScreen
                      className="max-w-full"
                    />
                  </div>
                </button>
              </>
            )}
          </>
        )}

        {/* Lightbox */}
        {isLightboxOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors z-20"
              onClick={(e) => {
                e.stopPropagation()
                setIsLightboxOpen(false)
              }}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Previous button */}
            <button
              className="absolute left-4 md:left-8 text-white p-2 rounded-full hover:bg-white/10 transition-colors z-20"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ArrowLeft size={24} />
            </button>

            {/* Next button */}
            <button
              className="absolute right-4 md:right-8 text-white p-2 rounded-full hover:bg-white/10 transition-colors z-20"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ArrowRight size={24} />
            </button>

            {/* Image container */}
            <div className="max-w-5xl w-full h-auto px-4 relative">
              {isGalleryProject ? (
                <>
                  <Image
                    src={galleryImages[currentImageIndex].src || "/placeholder.svg"}
                    alt={galleryImages[currentImageIndex].alt}
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                    <h3 className="text-xl font-bold">{galleryImages[currentImageIndex].title}</h3>
                    <p className="text-sm opacity-80">{galleryImages[currentImageIndex].description}</p>
                  </div>
                </>
              ) : (
                // For non-gallery projects that might use the lightbox (like Bankrate)
                <Image
                  src={bankrateImage || "/placeholder.svg"}
                  alt="Bankrate Data Center interface"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain"
                />
              )}

              {/* Image counter */}
              {isGalleryProject && (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Project Navigation Section */}
        <div className="mt-32 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold mb-8">More Projects</h2>

          <div className="flex flex-col gap-8">
            {/* Project Previews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {currentPreviewProjects.map((previewProject, index) => (
                <Link key={index} href={`/project/${previewProject.slug}`} className="block w-full">
                  <div className="bg-white rounded-3xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                    <div className="relative mb-4 flex-shrink-0">
                      <div className="bg-[#f1f1f1] aspect-video relative rounded-2xl overflow-hidden">
                        <Image
                          src={previewProject.image || "/placeholder.svg"}
                          alt={previewProject.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#151515] text-white px-4 py-2 rounded-lg text-sm font-medium tracking-[2px]">
                          {previewProject.category === "VISUAL DESIGN" ? "GALLERY" : "CASE STUDY"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <div className="text-sm text-[#595959] mb-2">{previewProject.category}</div>
                      <h3 className="text-2xl font-bold mb-4">{previewProject.title}</h3>
                      <p className="text-[#333333] mb-6 flex-grow line-clamp-3">{previewProject.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Show previous projects"
              >
                <ArrowLeft size={16} />
                <span>Previous</span>
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Show next projects"
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
