import { getNotionClient } from '@/lib/notion/client'
import { Project } from '@/app/components/ProjectTile'

/**
 * Fetch featured projects from Notion database
 * This is a server-side function that can be used in server components
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const notion = getNotionClient()
  
  if (!notion || !process.env.NOTION_API_KEY || !process.env.NOTION_PROJECTS_DB_ID) {
    return []
  }

  const databaseId = process.env.NOTION_PROJECTS_DB_ID || ''
  const apiKey = process.env.NOTION_API_KEY || ''
  
  try {
    // Try with filter first
    const queryResponse = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          or: [
            {
              property: 'Featured',
              checkbox: {
                equals: true,
              },
            },
            {
              property: 'Show on Homepage',
              checkbox: {
                equals: true,
              },
            },
            {
              property: 'Featured on Homepage',
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      }),
      next: { 
        revalidate: 3600, // Match page-level revalidate for ISR
        tags: ['notion-projects', 'notion-featured-projects']
      },
    })
    
    let pages: any[] = []
    
    if (queryResponse.ok) {
      const queryData = await queryResponse.json()
      pages = queryData.results || []
    } else {
      // If filter fails, try getting all pages and filter client-side
      const allPagesResponse = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        next: { 
        revalidate: 3600, // Match page-level revalidate for ISR
        tags: ['notion-projects', 'notion-featured-projects']
      },
      })
      
      if (allPagesResponse.ok) {
        const allPagesData = await allPagesResponse.json()
        const allPages = allPagesData.results || []
        
        // Filter client-side for featured projects
        pages = allPages.filter((page: any) => {
          const props = page.properties || {}
          const featured = props['Featured']?.checkbox === true ||
                         props['Show on Homepage']?.checkbox === true ||
                         props['Featured on Homepage']?.checkbox === true
          return featured
        })
      }
    }
    
    // Transform Notion pages to project format
    const projects: Project[] = pages.map((page: any) => {
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
      
      const slug = props.Slug?.rich_text?.[0]?.plain_text || 
                   props['URL Slug']?.rich_text?.[0]?.plain_text || 
                   props.Slug?.title?.[0]?.plain_text ||
                   ''
      
      const description = props.Description?.rich_text?.map((t: any) => t.plain_text).join('') || 
                         props.description?.rich_text?.map((t: any) => t.plain_text).join('') || 
                         ''
      
      const category = props.Category?.select?.name || 
                       props.category?.select?.name || 
                       'PRODUCT DESIGN'
      
      // Extract featured image - use same logic as extractPageMetadata
      // Prioritize "Hero Image URL" property as that's what's used in the database
      let image = ''
      
      // Try Files property first (if image is uploaded to Notion)
      const featuredImageFiles = props['Featured Image'] || props['FeaturedImage'] || props['Hero Image'] || props['HeroImage']
      if (featuredImageFiles && featuredImageFiles.type === 'files' && featuredImageFiles.files && featuredImageFiles.files.length > 0) {
        image = featuredImageFiles.files[0].file?.url || featuredImageFiles.files[0].external?.url || ''
      }
      
      // Try Text/Rich text property (for relative paths like /images/editorial/...)
      // Prioritize "Hero Image URL" since that's what's used in the database
      if (!image) {
        const textPathProps = [
          props['Hero Image URL'], // Prioritize this one first
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
      
      // If still no image found, try URL property (for absolute URLs like https://...)
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
        slug,
        description,
        category: category.toUpperCase(),
        image,
      }
    }).filter((project: Project) => project.slug) // Only include projects with a slug
    
    return projects
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

