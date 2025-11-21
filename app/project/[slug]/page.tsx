import { getNotionClient } from "@/lib/notion/client"
import { fetchAllBlocks } from "@/lib/notion/fetch-blocks"
import { projects } from "../../data"
import NotionPageContent from "./NotionPageContent"
import Link from "next/link"
import Image from "next/image"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import EditorialGallery from "../../components/EditorialGallery"
import ProjectTile from "../../components/ProjectTile"
import ReviewTemplateImages from "./ReviewTemplateImages"

// Fetch all Notion project slugs at build time for static generation
export async function generateStaticParams() {
  const params: { slug: string }[] = []
  
  // Add static project slugs
  try {
    const { projects } = await import('../../data')
    projects.forEach(project => {
      if (project.slug) {
        params.push({ slug: project.slug })
      }
    })
  } catch (error) {
    console.error('Error loading static projects:', error)
  }
  
  // Fetch all Notion project slugs at build time
  if (process.env.NOTION_API_KEY && process.env.NOTION_PROJECTS_DB_ID) {
    try {
      const databaseId = process.env.NOTION_PROJECTS_DB_ID
      const apiKey = process.env.NOTION_API_KEY
      
      const response = await fetch(
        `https://api.notion.com/v1/databases/${databaseId}/query`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}), // No filter - get all pages
          cache: 'force-cache', // Cache at build time for static generation
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        const pages = data.results || []
        
        pages.forEach((page: any) => {
          if (page.properties?.Slug?.rich_text?.[0]?.plain_text) {
            const slug = page.properties.Slug.rich_text[0].plain_text
            // Only add if not already in params (avoid duplicates with static projects)
            if (!params.find(p => p.slug === slug)) {
              params.push({ slug })
            }
          }
        })
      }
    } catch (error) {
      // Silently fail - Notion projects will be generated on-demand if build fails
      console.warn('Could not fetch Notion slugs at build time:', error)
    }
  }
  
  return params
}

// Enable ISR - pages are pre-generated at build time
// Revalidation is controlled via cache tags and on-demand revalidation
// export const revalidate = 3600 // Removed to allow tag-based revalidation

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  // Try to fetch from Notion first (server-side)
  let notionPageData: { page: any; blocks: any[] } | null = null
  
  const notion = getNotionClient()
  if (notion && process.env.NOTION_PROJECTS_DB_ID) {
    try {
      // Query database by slug
      const databaseId = process.env.NOTION_PROJECTS_DB_ID || ''
      const apiKey = process.env.NOTION_API_KEY || ''
      
      const queryResponse = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: {
            property: 'Slug',
            rich_text: {
              equals: params.slug,
            },
          },
        }),
        next: { 
          revalidate: 0, // Always respect tag invalidation
          tags: ['notion-projects', `notion-project-${params.slug}`]
        },
      })
      
      if (queryResponse.ok) {
        const queryData = await queryResponse.json()
        const pages = queryData.results || []
        
        if (pages.length > 0) {
          const page = pages[0]
          const pageId = 'id' in page ? page.id : ''
          
          if (pageId) {
            // Fetch all blocks (including nested children for columns)
            const allBlocks = await fetchAllBlocks(notion, pageId)
            notionPageData = { page, blocks: allBlocks }
          }
        }
      }
    } catch (err) {
      console.error('Error fetching Notion page:', err)
      // Fall through to static project data
    }
  }

  // If Notion page found, render it
  if (notionPageData && 'id' in notionPageData.page) {
    return <NotionPageContent page={notionPageData.page} blocks={notionPageData.blocks} slug={params.slug} />
  }

  // Fallback to static project data
  const project = projects.find(p => p.slug === params.slug)
  if (!project) {
    return <div>Project not found</div>
  }

  // Check if this is the Bankrate Data Center case study
  const isBankrateCaseStudy = project.slug === "bankrate-data-center"
  const isReviewTemplate = project.slug === "bankrate-review-template"
  const isGalleryProject = project.slug === "editorial-imagery"

  // Bankrate-specific data
  const bankrateImage = "/images/data-center/bankrate-data-center-hero.jpg"
  const reviewTemplateImage = "/images/review-template/bankrate-review-template-header.png"
  
  // For Bankrate case study, use the new template
  if (isBankrateCaseStudy) {
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
                    <BreadcrumbPage className="text-white">Bankrate Data Center</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Hero Title */}
            <div className="py-20 md:py-30">
              <h1 className="font-display font-bold text-5xl md:text-6xl leading-[48px] md:leading-[60px] text-white w-full">
                Centralizing Bankrate's historical proprietary data into one Data Center
              </h1>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="w-full">
          <div className="relative w-full h-[880px]">
            <Image
              src={bankrateImage}
              alt="Bankrate Data Center"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

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
                  <p className="text-lg leading-[28px] text-zinc-400">
                    Bankrate—a trusted financial website—had a wealth of underutilized and fragmented proprietary data on
                    financial subject that was hard to find and source. To solve this, I led the creation of Bankrate's
                    centralized Data Center—a new hub designed to make proprietary rate indices and survey data accessible and
                    engaging for media outlets, journalists, content creators and curious consumers. This resulted in 100
                    referring domain backlinks in a 2 month span.
                  </p>
                </div>

                {/* Right: Project Details */}
                <div className="flex-1 flex flex-col gap-6">
                  <div>
                    <h3 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Role</h3>
                    <p className="text-lg leading-[28px] text-zinc-400">{project.role}</p>
                  </div>
                  <Separator className="bg-zinc-600" />
                  <div>
                    <h3 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Timeline</h3>
                    <p className="text-lg leading-[28px] text-zinc-400">November 2024 - February 2025</p>
                  </div>
                  <Separator className="bg-zinc-600" />
                  <div>
                    <h3 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Tools</h3>
                    <p className="text-lg leading-[28px] text-zinc-400">Figma, Figma Slides, Figjam</p>
                  </div>
                  <Separator className="bg-zinc-600" />
                  <div>
                    <h3 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Deliverables</h3>
                    <p className="text-lg leading-[28px] text-zinc-400">{project.deliverables}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section className="bg-zinc-950 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
            <div className="max-w-[768px] mx-auto">
              <h2 className="font-display font-bold text-4xl leading-[40px] text-white mb-6">
                Problem statement
              </h2>
              <p className="text-lg leading-[28px] text-zinc-400 mb-12">
                Prior to this project, Bankrate's valuable financial data was scattered across multiple survey pages and
                formats, making it difficult for journalists and content creators to discover, access, and cite authoritative
                information. This fragmentation limited our visibility in the media and reduced opportunities for earning
                backlinks, ultimately impacting Bankrate's search ranking and authority.
              </p>

              {/* Goals and KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Goals */}
                <div>
                  <h3 className="font-display font-bold text-3xl leading-[36px] text-white mb-6 mt-12">Goals</h3>
                  <ol className="list-decimal list-inside space-y-4 pl-4">
                    <li className="text-lg leading-[28px] text-zinc-400">
                      Support journalists, content creators, and consumers with interactive, visually compelling charts that
                      would drive backlinks and boost Bankrate's authority in the finance space.
                    </li>
                    <li className="text-lg leading-[28px] text-zinc-400">
                      Signaling to Google that we are the authority on this personal finance data
                    </li>
                  </ol>
                </div>

                {/* KPIs */}
                <div>
                  <h3 className="font-display font-bold text-3xl leading-[36px] text-white mb-6 mt-12">KPI's</h3>
                  <ol className="list-decimal list-inside space-y-4 pl-4">
                    <li className="text-lg leading-[28px] text-zinc-400">Links to data charts</li>
                    <li className="text-lg leading-[28px] text-zinc-400">Clicks to articles or other resources</li>
                    <li className="text-lg leading-[28px] text-zinc-400">Number of interactions with charts</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Co-creation Session Section */}
        <section className="bg-zinc-950 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
            <div className="max-w-[768px] mx-auto text-center mb-8">
              <h2 className="font-display font-bold text-4xl leading-[40px] text-white mb-6">
                Co-creation session
              </h2>
              <p className="text-lg leading-[28px] text-zinc-400">
                We kicked off the project in a structured co-creation session to align on product vision and prioritize key
                features. The session began with goal setting and competitor analysis, helping us understand user needs and
                market positioning. Through collaborative activities such as reviewing user breakdowns, analyzing competitor
                screenshots, and sketching design ideas, we identified important outcomes including the inclusion of a search
                bar, use of Highcharts, and the creation of hub and chart pages. This co-creation session played a crucial
                role in clarifying priorities and setting a solid foundation for the next phases of the project.
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex flex-col gap-2">
                  <div className="aspect-square relative bg-zinc-800 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                      Image {item}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 text-center">
                    {item === 1 && "User breakdowns"}
                    {item === 2 && "Screenshots of competitors and inspiration"}
                    {item === 3 && "Sketches from stakeholders"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Competitive Analysis Section */}
        <section className="bg-zinc-950 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
            <div className="max-w-[768px] mx-auto mb-8">
              <h2 className="font-display font-bold text-4xl leading-[40px] text-white mb-6">
                Competitive analysis
              </h2>
              <p className="text-lg leading-[28px] text-zinc-400 mb-6">
                After the co-creation session, I decided to conduct my own competitive analysis to better understand the data
                industry landscape. I examined several leading sites and documenting both strengths and pain points. My deep
                dive focused on navigation structures, content organization, and feature sets that would inform later design
                decisions. (You can find a link to the full deck here.)
              </p>
            </div>

            {/* Image Grids */}
            <div className="space-y-8">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Statista: Hub page", "Exploding Topics: Hub page", "Various brands: site search"].map(
                  (caption, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <div className="aspect-square relative bg-zinc-800 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                          Image {index + 1}
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 text-center">{caption}</p>
                    </div>
                  )
                )}
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Fig 1: Caption component", "FRED: Hub page", "FRED: Hub page pt. 2"].map((caption, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="aspect-square relative bg-zinc-800 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                        Image {index + 4}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 text-center">{caption}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features List */}
            <div className="max-w-[768px] mx-auto mt-8">
              <p className="text-lg leading-[28px] text-zinc-400 mb-6">
                Through this analysis, I identified a set of core features commonly present in effective data experiences:
              </p>
              <ul className="space-y-4 pl-6">
                {[
                  "Search bar for rapid discoverability",
                  "Centralized hub pages to anchor key content",
                  "Category and topic pages for deeper segmentation",
                  "Tagging systems to support flexible filtering",
                  "A dedicated chart page",
                ].map((feature, index) => (
                  <li key={index} className="text-lg leading-[28px] text-zinc-400 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* More Projects Section */}
        <section className="bg-zinc-900 py-16 border-t border-zinc-500">
          <div className="container mx-auto px-6 md:px-36 max-w-[1280px]">
            <h2 className="font-display font-bold text-[30px] leading-[36px] text-white mb-8">More Projects</h2>
            <div className="flex flex-col gap-8 max-w-[1152px]">
              {projects
                .filter((p) => p.slug !== project.slug)
                .slice(0, 2)
                .map((previewProject, index) => (
                  <ProjectTile key={previewProject.slug || index} project={previewProject} />
                ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  // For Bankrate Review Template, use the case study template structure
  if (isReviewTemplate) {
    // Images for lightbox
    const reviewTemplateImages = [
      "/images/review-template/bankrate-review-template-header.png",
      "/images/review-template/co-creation/image5.png",
      "/images/review-template/co-creation/image6.png",
      "/images/review-template/co-creation/image7.png",
    ]
    
    // Co-creation session images
    const coCreationImages = [
      "/images/review-template/co-creation/image5.png",
      "/images/review-template/co-creation/image6.png",
      "/images/review-template/co-creation/image7.png",
    ]
    
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
                Designing modular review templates that scale across verticals
              </h1>
            </div>
          </div>
        </section>

        {/* Hero Image and Co-creation Images with Lightbox */}
        <ReviewTemplateImages
          heroImage={reviewTemplateImage}
          heroAlt={project.title}
          coCreationImages={coCreationImages}
          allImages={coCreationImages}
        />

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
                    <p className="text-lg leading-[28px] text-zinc-400">
                      I had the opportunity to lead the end-to-end redesign of the review template system, which resulted in greater alignment, readability, and effectiveness for product review pages at Bankrate. Our goal was to build scalable, flexible, and monetizable templates that unify our design language while respecting each team's unique needs. By introducing a modular component system, I enabled verticals to move quickly, collaborate smoothly, and deliver a more cohesive experience across the platform. As a result, vertical teams accelerated the adoption of templates and improved consistency in user experience.
                    </p>
                    <p className="text-lg leading-[28px] text-zinc-400">
                      Partner logos have been redacted for confidentiality.
                    </p>
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
                    <p className="text-lg leading-[28px] text-zinc-400">Figma, Figjam, Confluence</p>
                  </div>
                  <Separator className="bg-zinc-600" />
                  <div>
                    <h4 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Deliverables</h4>
                    <p className="text-lg leading-[28px] text-zinc-400">{project.deliverables}</p>
                  </div>
                  <Separator className="bg-zinc-600" />
                  <div>
                    <h4 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Outcomes</h4>
                    <p className="text-lg leading-[28px] text-zinc-400">Revenue per session, time on page, adoption percentage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section className="bg-zinc-950 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
            <div className="max-w-[768px] mx-auto">
              <h2 className="font-display font-bold text-4xl leading-[40px] text-white mb-6">
                Problem statement
              </h2>
              <p className="text-lg leading-[28px] text-zinc-400 mb-12">
                Bankrate's review pages suffered from inconsistent layouts and fragmented user experiences due to a lack of a unified template system. Vertical teams faced duplicated work and slowdowns without reusable building blocks, making it hard to maintain quality and brand consistency at scale. We needed a modular, flexible template system to empower teams to build effective, cohesive review pages quickly while supporting custom needs.
              </p>

              {/* Goals and KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Goals */}
                <div>
                  <h3 className="font-display font-bold text-3xl leading-[36px] text-white mb-6 mt-12">Goals</h3>
                  <ol className="list-decimal list-inside space-y-4 pl-4">
                    <li className="text-lg leading-[28px] text-zinc-400">
                      Empower vertical teams to assemble components to meet their unique needs
                    </li>
                    <li className="text-lg leading-[28px] text-zinc-400">
                      Maintain a shared visual language and cohesive user experience across all review pages
                    </li>
                    <li className="text-lg leading-[28px] text-zinc-400">
                      Provide flexible components that enable ongoing improvements without sacrificing consistency
                    </li>
                  </ol>
                </div>

                {/* KPIs */}
                <div>
                  <h3 className="font-display font-bold text-3xl leading-[36px] text-white mb-6 mt-12">KPI's</h3>
                  <ol className="list-decimal list-inside space-y-4 pl-4">
                    <li className="text-lg leading-[28px] text-zinc-400">Revenue per session</li>
                    <li className="text-lg leading-[28px] text-zinc-400">Time on page</li>
                    <li className="text-lg leading-[28px] text-zinc-400">Scroll depth</li>
                    <li className="text-lg leading-[28px] text-zinc-400">Engagement with FHE / UGC</li>
                    <li className="text-lg leading-[28px] text-zinc-400">Bounce rate</li>
                    <li className="text-lg leading-[28px] text-zinc-400">Adoption % across verticals</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Research Section */}
        <section className="bg-zinc-950 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
            <div className="max-w-[768px] mx-auto">
              <h2 className="font-display font-bold text-4xl leading-[40px] text-white mb-6">
                Competitive research
              </h2>
              <div className="space-y-6 mb-8">
                <p className="text-lg leading-[28px] text-zinc-400">
                  I conducted my own competitive analysis to familiarize myself with the data industry landscape. During my research, I observed several common features across many sites, including CNET, NerdWallet, TPG, Capterra, G2, Wallethub, and LendingTree.
                </p>
                <p className="text-lg leading-[28px] text-zinc-400">
                  Based on that analysis, I discovered that there were common components across each site including:
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 pl-6">
                {[
                  "The product image",
                  "Product name and rating",
                  "Pros and cons",
                  "Key features",
                  "Pricing information",
                  "Comparison tables",
                  "User reviews and testimonials",
                ].map((feature, index) => (
                  <li key={index} className="text-lg leading-[28px] text-zinc-400 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* More Projects Section */}
        <section className="bg-zinc-900 py-16 border-t border-zinc-500">
          <div className="container mx-auto px-6 md:px-36 max-w-[1280px]">
            <h2 className="font-display font-bold text-[30px] leading-[36px] text-white mb-8">More Projects</h2>
            <div className="flex flex-col gap-8 max-w-[1152px]">
              {projects
                .filter((p) => p.slug !== project.slug)
                .slice(0, 2)
                .map((previewProject, index) => (
                  <ProjectTile key={previewProject.slug || index} project={previewProject} />
                ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  // For Editorial Imagery gallery project - Visual Design case study
  if (isGalleryProject) {
    // This will be handled by the MasonryGrid component with dynamic loading

    return (
      <div className="min-h-screen bg-zinc-950">
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
                    <BreadcrumbPage className="text-white">Visual Design</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Hero Title */}
            <div className="py-20 md:py-30">
              <h1 className="font-display font-bold text-5xl md:text-6xl leading-[48px] md:leading-[60px] text-white w-full">
                A collection of visual design work
              </h1>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="w-full bg-zinc-950">
          <div className="relative w-full h-[880px]">
            <Image
              src="/images/editorial/editorial-imagery-header.jpg"
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Project Summary Section */}
        <section className="bg-zinc-950 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
            <div className="max-w-[768px] mx-auto">
              <div className="flex flex-col md:flex-row gap-10">
                {/* Left: Description */}
                <div className="flex-1">
                  <h2 className="font-display font-bold text-2xl leading-[32px] text-white mb-6">
                    Project Summary
                  </h2>
                  <p className="text-lg leading-[28px] text-zinc-400">
                    Over my time at Redventures, I've had the opportunity to work on several brand heavy companies including NextAdvisor and Bankrate. When working on imagery, I have utilized AI to help me ideate and create final imagery assets.
                  </p>
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
                    <p className="text-lg leading-[28px] text-zinc-400">Figma, Figma Slides, Figjam</p>
                  </div>
                  <Separator className="bg-zinc-600" />
                  <div>
                    <h4 className="font-display font-bold text-xl leading-[28px] text-white mb-4">Deliverables</h4>
                    <p className="text-lg leading-[28px] text-zinc-400">{project.deliverables}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Masonry Gallery Section */}
        <section className="bg-zinc-950 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
            <EditorialGallery />
          </div>
        </section>

        {/* More Projects Section */}
        <section className="bg-zinc-900 py-16 border-t border-zinc-500">
          <div className="container mx-auto px-6 md:px-36 max-w-[1280px]">
            <h2 className="font-display font-bold text-[30px] leading-[36px] text-white mb-8">More Projects</h2>
            <div className="flex flex-col gap-8 max-w-[1152px]">
              {projects
                .filter((p) => p.slug !== project.slug)
                .slice(0, 2)
                .map((previewProject, index) => (
                  <ProjectTile key={previewProject.slug || index} project={previewProject} />
                ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  // For other projects, keep the existing layout
  // ... (rest of the existing code for non-Bankrate projects)
  return (
    <div className="min-h-screen bg-[#ffffff] text-[#151515]">
      {/* Existing project page code for other projects */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
        <p className="text-xl text-[#595959] mb-8">{project.category}</p>
        {/* Rest of existing layout */}
      </div>
    </div>
  )
}
