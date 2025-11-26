/**
 * Extract properties from a Notion page
 */

export interface PageMetadata {
  title: string
  heroTitle?: string
  featuredImage?: string
  summary?: string
  role?: string
  timeline?: string
  tools?: string
  deliverables?: string
  outcomes?: string
  category?: string
  nextProjectSlug?: string
}

function extractRichText(property: any): string {
  if (!property || !property.rich_text) return ''
  return property.rich_text.map((text: any) => text.plain_text).join('')
}

function extractTitle(property: any): string {
  if (!property || !property.title) return ''
  return property.title.map((text: any) => text.plain_text).join('')
}

function extractUrl(property: any): string | undefined {
  if (!property) return undefined
  
  let url: string | undefined = undefined
  
  // Handle URL property type
  if (property.type === 'url' && property.url && property.url !== null) {
    url = property.url
  }
  // Handle direct url field
  else if (property.url && property.url !== null && property.url !== '') {
    url = property.url
  }
  // Handle files property type
  else if (property.files && property.files.length > 0) {
    url = property.files[0].file?.url || property.files[0].external?.url
  }
  
  // Validate URL - must be a string and either absolute URL or relative path starting with /
  if (url && typeof url === 'string') {
    // Remove any whitespace
    url = url.trim()
    
    // Reject file:// URLs (local file paths won't work in browsers)
    if (url.startsWith('file://')) {
      console.warn('File:// URLs are not supported. Use a relative path (starting with /) or absolute HTTP/HTTPS URL.')
      return undefined
    }
    
    // Check if it's a valid URL format (absolute) or relative path
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
      return url
    }
  }
  
  return undefined
}

function extractSelect(property: any): string | undefined {
  if (!property || !property.select) return undefined
  return property.select.name
}

export function extractPageMetadata(page: any, blocks: any[] = []): PageMetadata {
  // Extract title
  let title = 'Untitled'
  if (page.properties) {
    title = extractTitle(page.properties.Title || page.properties.title || page.properties.Name || page.properties.name) || 'Untitled'
  } else {
    // Fallback: try to get title from page object
    title = page.properties?.Title?.title?.[0]?.plain_text || 
            page.properties?.title?.title?.[0]?.plain_text ||
            'Untitled'
  }

  const metadata: PageMetadata = { title }

  // Extract from properties if they exist
  if (page.properties) {
    const props = page.properties
    // Debug: Log the Hero Image URL property
    const heroImgProp = props['Hero Image URL']
    if (heroImgProp) {
      console.log('Hero Image URL property found:', {
        type: heroImgProp.type,
        url: heroImgProp.url,
        hasUrl: !!heroImgProp.url,
      })
    }
    // Try Files property first (if image is uploaded to Notion)
    const featuredImageFiles = props['Featured Image'] || props['FeaturedImage'] || props['Hero Image'] || props['HeroImage']
    if (featuredImageFiles && featuredImageFiles.type === 'files' && featuredImageFiles.files && featuredImageFiles.files.length > 0) {
      metadata.featuredImage = featuredImageFiles.files[0].file?.url || featuredImageFiles.files[0].external?.url
    } 
    // Try Text/Rich text property (for relative paths like /images/editorial/...)
    const textPathProps = [
      props['Hero Image Path'],
      props['Hero Image'],
      props['Featured Image Path'],
      props['Hero Image URL'], // Also check if Hero Image URL is now a text property
    ].filter(Boolean)
    
    for (const pathProp of textPathProps) {
      if (pathProp && (pathProp.type === 'rich_text' || pathProp.type === 'title')) {
        const pathText = extractRichText(pathProp)
        if (pathText && (pathText.startsWith('/') || pathText.startsWith('http'))) {
          metadata.featuredImage = pathText.trim()
          break
        }
      }
    }
    
    // If still no image found, try URL property (for absolute URLs like https://...)
    if (!metadata.featuredImage) {
      metadata.featuredImage = extractUrl(
        props['Featured Image'] || 
        props['FeaturedImage'] || 
        props['Image']
      )
    }
    console.log('Extracted featuredImage:', metadata.featuredImage)
    metadata.heroTitle = extractRichText(
      props['Hero Title'] || 
      props['HeroTitle'] ||
      props['Hero']
    )
    metadata.summary = extractRichText(
      props.Summary || 
      props['Project Summary'] || 
      props['Summary Text 1'] ||
      props['Summary 1'] ||
      props.Description
    )
    metadata.role = extractRichText(props.Role)
    metadata.timeline = extractRichText(props.Timeline)
    metadata.tools = extractRichText(props.Tools)
    metadata.deliverables = extractRichText(props.Deliverables)
    metadata.outcomes = extractRichText(props.Outcomes || props.Outcome)
    metadata.category = extractSelect(props.Category)
    // Extract Next Project Slug (text or rich_text property)
    // Try direct access first, then fallback to name variations
    let nextProjectProp = null
    let foundPropertyName = null
    
    // First, try direct access to the exact property name
    const directAccess = props['Next Project Slug']
    if (directAccess !== undefined) {
      nextProjectProp = directAccess
      foundPropertyName = 'Next Project Slug'
    }
    
    // If direct access didn't find it, try other name variations
    if (!nextProjectProp || nextProjectProp === null) {
      const possibleNames = [
        'Next Project',
        'NextProjectSlug',
        'NextProject',
        'next project slug',
        'next project',
        'nextProjectSlug',
        'nextProject'
      ]
      
      for (const name of possibleNames) {
        const prop = props[name]
        if (prop !== undefined && prop !== null) {
          nextProjectProp = prop
          foundPropertyName = name
          break
        }
      }
    }
    
    // If still not found, try case-insensitive search through all properties
    if (!nextProjectProp || nextProjectProp === null) {
      const allPropNames = Object.keys(props)
      for (const propName of allPropNames) {
        const lowerPropName = propName.toLowerCase().trim()
        if (lowerPropName.includes('next') && (lowerPropName.includes('project') || lowerPropName.includes('slug'))) {
          nextProjectProp = props[propName]
          foundPropertyName = propName
          break
        }
      }
    }
    
    if (nextProjectProp) {
      // Handle different property types
      let extractedValue: string | undefined = undefined
      
      // Try rich_text first (most common for text properties in Notion)
      if (nextProjectProp.rich_text && Array.isArray(nextProjectProp.rich_text)) {
        extractedValue = nextProjectProp.rich_text
          .map((text: any) => text.plain_text || '')
          .join('')
          .trim() || undefined
      }
      // Try title property type
      else if (nextProjectProp.title && Array.isArray(nextProjectProp.title)) {
        extractedValue = nextProjectProp.title
          .map((text: any) => text.plain_text || '')
          .join('')
          .trim() || undefined
      }
      // Try using extractRichText helper
      else if (nextProjectProp.type === 'rich_text' || nextProjectProp.type === 'title') {
        extractedValue = extractRichText(nextProjectProp)?.trim() || undefined
        if (!extractedValue) {
          extractedValue = extractTitle(nextProjectProp)?.trim() || undefined
        }
      }
      // Handle plain text property (less common)
      else if (nextProjectProp.type === 'text' || nextProjectProp.text) {
        extractedValue = (nextProjectProp.text || '').trim() || undefined
      }
      
      metadata.nextProjectSlug = extractedValue
    }
  }

  // No fallback for featured image - only use properties

  // Fallback: Extract summary from a callout with specific icon or heading
  if (!metadata.summary && blocks.length > 0) {
    // Look for a callout with 📋 or 📝 emoji, or a heading_2 with "Summary" text
    const summaryCallout = blocks.find((block: any) => {
      if (block.type === 'callout') {
        const icon = block.callout?.icon
        const text = block.callout?.rich_text?.map((t: any) => t.plain_text).join('') || ''
        return (icon?.emoji === '📋' || icon?.emoji === '📝' || text.toLowerCase().includes('summary'))
      }
      if (block.type === 'heading_2') {
        const text = block.heading_2?.rich_text?.map((t: any) => t.plain_text).join('') || ''
        if (text.toLowerCase().includes('summary')) {
          // Get the next paragraph as summary
          const blockIndex = blocks.indexOf(block)
          const nextBlock = blocks[blockIndex + 1]
          if (nextBlock && nextBlock.type === 'paragraph') {
            return true
          }
        }
      }
      return false
    })

    if (summaryCallout) {
      if (summaryCallout.type === 'callout') {
        metadata.summary = summaryCallout.callout?.rich_text?.map((t: any) => t.plain_text).join('') || ''
      } else if (summaryCallout.type === 'heading_2') {
        const blockIndex = blocks.indexOf(summaryCallout)
        const nextBlock = blocks[blockIndex + 1]
        if (nextBlock && nextBlock.type === 'paragraph') {
          metadata.summary = nextBlock.paragraph?.rich_text?.map((t: any) => t.plain_text).join('') || ''
        }
      }
    }
  }

  return metadata
}

