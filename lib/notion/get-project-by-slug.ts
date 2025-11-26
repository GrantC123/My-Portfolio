import { getNotionClient } from '@/lib/notion/client'
import { Project } from '@/app/components/ProjectTile'

/**
 * Fetch a single project from Notion database by slug
 * This is a server-side function that can be used in server components
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const notion = getNotionClient()
  
  if (!notion || !process.env.NOTION_API_KEY || !process.env.NOTION_PROJECTS_DB_ID) {
    return null
  }

  const databaseId = process.env.NOTION_PROJECTS_DB_ID || ''
  const apiKey = process.env.NOTION_API_KEY || ''
  
  try {
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
            equals: slug,
          },
        },
      }),
      next: { 
        revalidate: 3600,
        tags: ['notion-projects', `notion-project-${slug}`]
      },
    })
    
    if (!queryResponse.ok) {
      return null
    }

    const queryData = await queryResponse.json()
    const pages = queryData.results || []
    
    if (pages.length === 0) {
      return null
    }

    const page = pages[0]
    const props = page.properties || {}
    
    // Extract properties - handle both title property types
    let title = 'Untitled'
    if (props.Title?.title) {
      title = props.Title.title.map((t: any) => t.plain_text).join('') || 'Untitled'
    } else if (props.title?.title) {
      title = props.title.title.map((t: any) => t.plain_text).join('') || 'Untitled'
    } else if (props.Title?.rich_text) {
      title = props.Title.rich_text.map((t: any) => t.plain_text).join('') || 'Untitled'
    }
    
    const pageSlug = props.Slug?.rich_text?.[0]?.plain_text || 
                     props['URL Slug']?.rich_text?.[0]?.plain_text || 
                     props.Slug?.title?.[0]?.plain_text ||
                     slug
    
    const description = props.Description?.rich_text?.map((t: any) => t.plain_text).join('') || 
                       props.description?.rich_text?.map((t: any) => t.plain_text).join('') || 
                       ''
    
    const category = props.Category?.select?.name || 
                     props.category?.select?.name || 
                     'PRODUCT DESIGN'
    
    // Extract featured image - use same logic as extractPageMetadata
    let image = ''
    
    // Try Files property first (if image is uploaded to Notion)
    const featuredImageFiles = props['Featured Image'] || props['FeaturedImage'] || props['Hero Image'] || props['HeroImage']
    if (featuredImageFiles && featuredImageFiles.type === 'files' && featuredImageFiles.files && featuredImageFiles.files.length > 0) {
      image = featuredImageFiles.files[0].file?.url || featuredImageFiles.files[0].external?.url || ''
    }
    
    // Try Text/Rich text property (for relative paths like /images/editorial/...)
    if (!image) {
      const textPathProps = [
        props['Hero Image URL'],
        props['Hero Image Path'],
        props['Hero Image'],
        props['Featured Image Path'],
      ].filter(Boolean)
      
      for (const pathProp of textPathProps) {
        if (pathProp && (pathProp.type === 'rich_text' || pathProp.type === 'title')) {
          const pathText = pathProp.rich_text?.map((t: any) => t.plain_text).join('') || 
                          pathProp.title?.map((t: any) => t.plain_text).join('') || ''
          if (pathText && (pathText.startsWith('/') || pathText.startsWith('http'))) {
            image = pathText.trim()
            break
          }
        }
      }
    }
    
    // If still no image found, try URL property
    if (!image) {
      const urlProp = props['Hero Image URL'] || props['Featured Image'] || props['FeaturedImage'] || props['Image']
      if (urlProp && urlProp.type === 'url' && urlProp.url) {
        image = urlProp.url
      } else if (urlProp && urlProp.url) {
        image = urlProp.url
      }
    }
    
    return {
      title,
      slug: pageSlug,
      description,
      category: category.toUpperCase(),
      image,
    }
  } catch (error) {
    console.error('Error fetching project by slug:', error)
    return null
  }
}

