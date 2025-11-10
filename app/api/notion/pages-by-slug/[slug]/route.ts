import { NextRequest, NextResponse } from 'next/server'
import { getNotionClient } from '@/lib/notion/client'
import { fetchAllBlocks } from '@/lib/notion/fetch-blocks'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const notion = getNotionClient()
    
    if (!notion || !process.env.NOTION_API_KEY || !process.env.NOTION_PROJECTS_DB_ID) {
      return NextResponse.json({ 
        error: 'Notion not configured' 
      }, { status: 500 })
    }

    // Query database by slug to find the page
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
    })
    
    if (!queryResponse.ok) {
      const errorText = await queryResponse.text()
      return NextResponse.json({ 
        error: 'Database query failed',
        status: queryResponse.status,
        details: errorText
      }, { status: queryResponse.status })
    }
    
    const queryData = await queryResponse.json()
    const pages = queryData.results || []
    
    if (pages.length === 0) {
      return NextResponse.json({ 
        error: 'Page not found',
        slug: params.slug
      }, { status: 404 })
    }

    const page = pages[0]
    const pageId = 'id' in page ? page.id : ''

    if (!pageId) {
      return NextResponse.json({ 
        error: 'Invalid page data' 
      }, { status: 500 })
    }

    // Get all blocks from the page (including nested children for columns)
    const allBlocks = await fetchAllBlocks(notion, pageId)

    return NextResponse.json({
      page,
      blocks: allBlocks,
    })
  } catch (error) {
    console.error('Error fetching Notion page by slug:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch page',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

