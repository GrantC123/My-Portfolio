import { normalizeImageUrl } from './image-url-utils'

/**
 * Recursively collect all image URLs from Notion blocks (including nested blocks in columns, toggles, etc.)
 */
export function collectAllImages(blocks: any[]): string[] {
  const images: string[] = []

  function traverseBlock(block: any) {
    // Collect image from this block if it's an image
    if (block.type === 'image') {
      const rawImageUrl = block.image?.file?.url || block.image?.external?.url
      const imageUrl = normalizeImageUrl(rawImageUrl)
      
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

