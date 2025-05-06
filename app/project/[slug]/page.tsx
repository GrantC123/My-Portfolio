"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { projects } from "../../data"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState("")
  const [lightboxAlt, setLightboxAlt] = useState("")

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

  // Handle previous button click
  const handlePrevious = () => {
    setPreviewStartIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      return newIndex < 0 ? otherProjects.length - 1 : newIndex
    })
  }

  // Handle next button click
  const handleNext = () => {
    setPreviewStartIndex((prevIndex) => {
      const newIndex = prevIndex + 1
      return newIndex >= otherProjects.length ? 0 : newIndex
    })
  }

  // Open lightbox with specific image
  const openLightbox = (src: string, alt: string) => {
    setLightboxImage(src)
    setLightboxAlt(alt)
    setIsLightboxOpen(true)
  }

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [params.slug])

  if (!project) {
    return <div>Project not found</div>
  }

  // Check if this is the Editorial Imagery project
  const isGalleryProject = project.slug === "editorial-imagery"

  // Gallery images for Editorial Imagery project
  const galleryImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Next-advisor-lady.jpg-hz9D3Emm39SGLvhk6v98MWLNdO2TsB.jpeg",
      alt: "Woman with financial documents",
      title: "Financial Planning",
      description: "Editorial illustration for NextAdvisor article on personal finance",
    },
    {
      src: "/placeholder.svg?key=j32nz",
      alt: "Credit card illustration",
      title: "Credit Card Comparison",
      description: "Magazine spread design for credit card feature",
    },
    {
      src: "/placeholder.svg?key=wxhmx",
      alt: "Financial advisor illustration",
      title: "Investment Strategies",
      description: "Digital illustration for investment guide",
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
                  onClick={() => openLightbox(image.src, image.alt)}
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
                  onClick={() =>
                    openLightbox(
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bankrate-DC-Cover-7B6cx26SzmCuDaMgE8FUqZ8XyQoso5.png",
                      "Bankrate Data Center interface",
                    )
                  }
                  className="mt-16 -mx-4 md:-mx-8 lg:-mx-16 w-full cursor-zoom-in"
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bankrate-DC-Cover-7B6cx26SzmCuDaMgE8FUqZ8XyQoso5.png"
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
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setIsLightboxOpen(false)
              }}
            >
              <X size={24} />
            </button>
            <div className="max-w-5xl w-full h-auto px-4">
              <Image
                src={lightboxImage || "/placeholder.svg"}
                alt={lightboxAlt}
                width={1920}
                height={1080}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}

        {/* Project Navigation Section */}
        <div className="mt-32 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold mb-8">More Projects</h2>

          <div className="flex flex-col gap-8">
            {/* Project Previews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentPreviewProjects.map((previewProject, index) => (
                <Link key={index} href={`/project/${previewProject.slug}`} className="block group">
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full">
                    <div className="relative aspect-video">
                      <Image
                        src={previewProject.image || "/placeholder.svg"}
                        alt={previewProject.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#151515] text-white px-3 py-1 rounded-lg text-xs font-medium tracking-[1px]">
                          {previewProject.category === "VISUAL DESIGN" ? "GALLERY" : "CASE STUDY"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[#595959] mb-1">EXPLORE PROJECT</p>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-[#450BEC] transition-colors">
                        {previewProject.title}
                      </h3>
                      <p className="text-sm text-[#333333] line-clamp-2">{previewProject.description}</p>
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
