import { NextRequest, NextResponse } from 'next/server'
import { getNotionClient } from '@/lib/notion/client'
import { transformNotionProject } from '@/lib/notion/transformers'
import { projects } from '@/app/data'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Get Notion client at runtime
    const notion = getNotionClient()
    
    // Check if Notion is configured
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_PROJECTS_DB_ID || !notion) {
      console.warn('Notion not configured, falling back to static data', {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasDbId: !!process.env.NOTION_PROJECTS_DB_ID,
        hasNotionClient: !!notion,
      })
      const staticProject = projects.find(p => p.slug === params.slug)
      if (staticProject) {
        return NextResponse.json(staticProject)
      }
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // First, verify we can access the database
    let databaseInfo
    try {
      databaseInfo = await notion.databases.retrieve({
        database_id: process.env.NOTION_PROJECTS_DB_ID,
      })
      console.log('Database retrieved successfully')
    } catch (dbError) {
      console.error('Failed to retrieve database:', dbError)
      return NextResponse.json({ 
        error: 'Database access error',
        details: dbError instanceof Error ? dbError.message : 'Unknown error'
      }, { status: 500 })
    }

    // Use the database query endpoint directly via HTTP
    // The SDK might not expose databases.query, so we'll use fetch
    const databaseId = process.env.NOTION_PROJECTS_DB_ID || ''
    const apiKey = process.env.NOTION_API_KEY || ''
    
    console.log(`Querying database: ${databaseId}`)
    
    // Query the database using the direct API endpoint
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
    })
    
    if (!queryResponse.ok) {
      const errorText = await queryResponse.text()
      console.error('Database query failed:', queryResponse.status, errorText)
      // Fallback to static data
      const staticProject = projects.find(p => p.slug === params.slug)
      if (staticProject) {
        return NextResponse.json(staticProject)
      }
      return NextResponse.json({ 
        error: 'Database query failed',
        status: queryResponse.status,
        details: errorText
      }, { status: queryResponse.status })
    }
    
    const queryData = await queryResponse.json()
    const databasePages = queryData.results || []
    
    console.log(`Found ${databasePages.length} pages matching slug "${params.slug}"`)
    
    // Debug: Log available properties from the first page
    if (databasePages.length > 0 && 'properties' in databasePages[0]) {
      const props = databasePages[0].properties
      console.log('Available properties:', Object.keys(props))
      if (props.KPIs) {
        console.log('KPIs property type:', props.KPIs.type, 'value:', JSON.stringify(props.KPIs))
      }
      if (props.Goals) {
        console.log('Goals property type:', props.Goals.type, 'value:', JSON.stringify(props.Goals))
      }
    }

    // The pages from the query already have full data, so we can use them directly
    const response_results = databasePages

    if (response_results.length === 0) {
      console.warn(`No project found with slug "${params.slug}"`)
      console.warn(`Searched ${databasePages.length} pages from database`)
      // Fallback to static data
      const staticProject = projects.find(p => p.slug === params.slug)
      if (staticProject) {
        return NextResponse.json(staticProject)
      }
      return NextResponse.json({ 
        error: 'Project not found',
        debug: {
          searchedSlug: params.slug,
          pagesInDatabase: databasePages.length,
          databaseId: process.env.NOTION_PROJECTS_DB_ID,
        }
      }, { status: 404 })
    }

    // Transform Notion page to your format
    const transformed = transformNotionProject(response_results[0] as any)
    
    if (!transformed) {
      // Fallback to static data
      const staticProject = projects.find(p => p.slug === params.slug)
      if (staticProject) {
        return NextResponse.json(staticProject)
      }
      return NextResponse.json({ error: 'Failed to transform project' }, { status: 500 })
    }

    return NextResponse.json(transformed)
  } catch (error) {
    console.error('Error fetching from Notion:', error)
    
    // Always fallback to static data on error
    const staticProject = projects.find(p => p.slug === params.slug)
    if (staticProject) {
      return NextResponse.json(staticProject)
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch project', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

