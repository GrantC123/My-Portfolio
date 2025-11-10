/**
 * Recursively collect all image URLs from Notion blocks (including nested blocks in columns, toggles, etc.)
 */
export function collectAllImages(blocks: any[]): string[] {
  const images: string[] = []

  function traverseBlock(block: any) {
    // Collect image from this block if it's an image
    if (block.type === 'image') {
      let imageUrl = block.image?.file?.url || block.image?.external?.url
      // Support relative paths for local images
      if (block.image?.external?.url && block.image.external.url.startsWith('/')) {
        imageUrl = block.image.external.url
      }
      // If it's a full URL pointing to localhost or our domain, extract the path
      else if (block.image?.external?.url && typeof block.image.external.url === 'string') {
        try {
          const url = new URL(block.image.external.url)
          // Check if it's localhost or our production domain (Vercel or custom domain)
          if (url.hostname === 'localhost' || 
              url.hostname.includes('vercel.app') || 
              url.hostname.includes('vercel.com') ||
              process.env.NEXT_PUBLIC_SITE_URL?.includes(url.hostname)) {
            // Extract just the pathname (e.g., /images/editorial/image.jpg)
            imageUrl = url.pathname
          }
        } catch (e) {
          // If URL parsing fails, use the original URL
        }
      }
      if (imageUrl && !images.includes(imageUrl)) {
        images.push(imageUrl)
      }
    }

    // Recursively traverse children (for columns, toggles, etc.)
    if ((block as any).children && Array.isArray((block as any).children)) {
      ;(block as any).children.forEach((child: any) => {
        traverseBlock(child)
      })
    }
  }

  blocks.forEach(block => {
    traverseBlock(block)
  })

  return images
}

