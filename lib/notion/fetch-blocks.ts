import { Client } from '@notionhq/client'

/**
 * Recursively fetch all blocks and their children (for columns, toggles, etc.)
 * Returns a flat array of blocks with children attached to parent blocks
 */
export async function fetchAllBlocks(
  notion: Client,
  blockId: string,
  depth: number = 0
): Promise<any[]> {
  const allBlocks: any[] = []
  let hasMore = true
  let startCursor: string | undefined = undefined

  // Prevent infinite recursion
  if (depth > 10) {
    console.warn(`Max depth reached for block ${blockId}`)
    return []
  }

  while (hasMore) {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: startCursor,
    })
    
    const blocks = response.results || []
    
    // Fetch children for all blocks in parallel (much faster)
    const blocksWithChildren = await Promise.all(
      blocks.map(async (block) => {
        const blockWithChildren = { ...block }
        
        // Check if block has children (columns, toggles, etc.)
        if ('has_children' in block && block.has_children) {
          const childBlocks = await fetchAllBlocks(notion, block.id, depth + 1)
          // Store children in the block for easier access
          ;(blockWithChildren as any).children = childBlocks
        }
        
        return blockWithChildren
      })
    )
    
    allBlocks.push(...blocksWithChildren)
    
    hasMore = response.has_more
    startCursor = response.next_cursor || undefined
  }

  return allBlocks
}

