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
      cache: 'force-cache', // Cache at build time for static generation
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
        cache: 'force-cache', // Cache at build time for static generation
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
      
      // Extract featured image
      let image = ''
      // Try Files property first
      if (props['Featured Image']?.files && props['Featured Image'].files.length > 0) {
        image = props['Featured Image'].files[0].file?.url || props['Featured Image'].files[0].external?.url || ''
      }
      // Try Text/Rich text property (for relative paths)
      else if (props['Hero Image Path'] || props['Hero Image'] || props['Featured Image Path'] || props['Hero Image URL']) {
        const pathProp = props['Hero Image Path'] || props['Hero Image'] || props['Featured Image Path'] || props['Hero Image URL']
        if (pathProp && (pathProp.type === 'rich_text' || pathProp.type === 'title')) {
          const pathText = pathProp.rich_text?.map((t: any) => t.plain_text).join('') || ''
          if (pathText && (pathText.startsWith('/') || pathText.startsWith('http'))) {
            image = pathText.trim()
          }
        }
      }
      // Try URL property
      else if (props['Featured Image']?.url || props['Hero Image URL']?.url) {
        image = props['Featured Image']?.url || props['Hero Image URL']?.url || ''
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

