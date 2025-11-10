import { NextRequest, NextResponse } from 'next/server'
import { getNotionClient } from '@/lib/notion/client'
import { fetchAllBlocks } from '@/lib/notion/fetch-blocks'

export async function GET(
  request: NextRequest,
  { params }: { params: { pageId: string } }
) {
  try {
    const notion = getNotionClient()
    
    if (!notion || !process.env.NOTION_API_KEY) {
      return NextResponse.json({ 
        error: 'Notion not configured' 
      }, { status: 500 })
    }

    // Get the page
    const page = await notion.pages.retrieve({
      page_id: params.pageId,
    })

    // Get all blocks from the page (including nested children for columns)
    const allBlocks = await fetchAllBlocks(notion, params.pageId)

    return NextResponse.json({
      page,
      blocks: allBlocks,
    })
  } catch (error) {
    console.error('Error fetching Notion page:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch page',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

