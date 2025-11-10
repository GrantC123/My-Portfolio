import { Client } from '@notionhq/client'

// Create a function to get the Notion client (initialized at runtime)
export function getNotionClient(): Client | null {
  const apiKey = process.env.NOTION_API_KEY
  if (!apiKey) {
    return null
  }
  return new Client({
    auth: apiKey,
  })
}

// For backward compatibility, export a getter
export const notion = getNotionClient()

