import { getNotionClient } from "@/lib/notion/client"
import { fetchAllBlocks } from "@/lib/notion/fetch-blocks"
import { extractPageMetadata } from "@/lib/notion/page-properties"
import { collectAllImages } from "@/lib/notion/collect-images"
import { normalizeImageUrl } from "@/lib/notion/image-url-utils"
import AboutNotionContent from "./AboutNotionContent"

// Enable ISR - revalidate every hour
export const revalidate = 3600

export default async function About() {
  // Try to fetch from Notion
  let notionPageData: { page: any; blocks: any[] } | null = null
  
  const notion = getNotionClient()
  const aboutPageId = process.env.NOTION_ABOUT_PAGE_ID
  
  if (notion && aboutPageId) {
    try {
      // Fetch the page
      const page = await notion.pages.retrieve({
        page_id: aboutPageId,
      })
      
      // Fetch all blocks (including nested children)
      const allBlocks = await fetchAllBlocks(notion, aboutPageId)
      notionPageData = { page, blocks: allBlocks }
    } catch (err) {
      console.error('Error fetching Notion about page:', err)
      // Fall through to error message
    }
  }

  // If Notion page found, render it
  if (notionPageData && 'id' in notionPageData.page) {
    const { page, blocks } = notionPageData
    
    // Extract page metadata
    const metadata = extractPageMetadata(page, blocks)
    
    // Collect all images for lightbox
    const allImages: string[] = []
    if (metadata.featuredImage) {
      const normalizedFeaturedImage = normalizeImageUrl(metadata.featuredImage)
      if (normalizedFeaturedImage && !allImages.includes(normalizedFeaturedImage)) {
        allImages.push(normalizedFeaturedImage)
      }
    }
    const blockImages = collectAllImages(blocks)
    blockImages.forEach((imageUrl) => {
      const normalizedUrl = normalizeImageUrl(imageUrl)
      if (normalizedUrl && !allImages.includes(normalizedUrl)) {
        allImages.push(normalizedUrl)
      }
    })

    return (
      <AboutNotionContent 
        page={page} 
        blocks={blocks} 
        allImages={allImages}
      />
    )
  }

  // Fallback: Return a message if Notion is not configured
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl mb-4">About Page</h1>
        <p className="text-zinc-400">
          {aboutPageId 
            ? "Error loading content from Notion. Please check your configuration."
            : "Notion page ID not configured. Please set NOTION_ABOUT_PAGE_ID in your environment variables."}
                </p>
              </div>
    </div>
  )
}
