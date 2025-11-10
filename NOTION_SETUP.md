# Notion CMS Setup Guide

This guide will help you set up Notion as a CMS for your portfolio projects.

## Prerequisites

1. A Notion account
2. A Notion integration (internal integration)
3. Your Notion API key

## Step 1: Create a Notion Integration

**Use an Internal Integration** (recommended for personal portfolios)

1. Go to https://www.notion.so/my-integrations
2. Click "+ New integration"
3. Select **"Internal"** (not "Public")
4. Give it a name (e.g., "Portfolio CMS")
5. Select your workspace
6. Under "Capabilities", enable:
   - Read content
   - Update content (optional, if you want to update from the site)
7. Click "Submit"
8. Copy the "Internal Integration Token" - this is your `NOTION_API_KEY`

**Why Internal?**
- ✅ Much simpler setup (no OAuth flow needed)
- ✅ Perfect for personal/single-workspace use
- ✅ Just share your database with the integration
- ✅ No redirect URLs or client secrets required
- ✅ Faster to get started

**External Integration** is only needed if you want to:
- Allow multiple users/workspaces to connect
- Build a public app that others can use
- Handle OAuth authentication flows

## Step 2: Create a Projects Database

1. Create a new page in Notion
2. Type `/database` and select "Table - Inline" or "Table - Full page"
3. Name it "Projects" or "Portfolio Projects"

## Step 3: Set Up Database Properties

Add the following properties to your database (exact names matter for auto-mapping):

### Required Properties

| Property Name | Type | Description |
|--------------|------|-------------|
| **Title** | Title | Project title (e.g., "Bankrate Review Template") |
| **Slug** | Rich text | URL slug (e.g., "notion-test") |
| **Category** | Select | Project category (e.g., "PRODUCT DESIGN", "VISUAL DESIGN") |
| **Description** | Rich text | Short project description |
| **Hero Image URL** | URL | Full URL to the hero image |
| **Hero Title** | Rich text | Large hero title text |
| **Summary Text 1** | Rich text | First paragraph of project summary |
| **Summary Text 2** | Rich text | Second paragraph of project summary |
| **Summary Text 3** | Rich text | (Optional) Third paragraph |
| **Role** | Rich text | Your role (e.g., "Senior Product Designer") |
| **Timeline** | Rich text | Project timeline (e.g., "4 months") |
| **Tools** | Rich text | Tools used (e.g., "Figma, Figjam, Confluence") |
| **Deliverables** | Rich text | Deliverables (e.g., "Component Library, Template System") |
| **Outcomes** | Rich text | Project outcomes |
| **Problem Statement** | Rich text | Problem statement text |
| **Goals** | Multi-select | List of project goals (one per option) |
| **KPIs** | Multi-select | List of KPIs (one per option) |
| **Co-creation Text** | Rich text | Co-creation session description |
| **Co-creation Images** | Multi-select | URLs to co-creation images (one URL per option) |
| **Competitive Research Text** | Rich text | Competitive research description |
| **Competitive Features** | Multi-select | List of features found (one per option) |
| **All Images** | Multi-select | All image URLs for lightbox gallery (one URL per option) |

### Property Name Variations

The transformer supports these alternative property names:
- `Project Title` instead of `Title`
- `URL Slug` instead of `Slug`
- `Hero Image` instead of `Hero Image URL`
- `Summary 1`, `Summary 2`, `Summary 3` instead of `Summary Text 1`, etc.
- `Problem` instead of `Problem Statement`
- `Goal` instead of `Goals`
- `KPI` or `KPI's` instead of `KPIs`
- `Co-creation` instead of `Co-creation Text`
- `Co-creation Image` instead of `Co-creation Images`
- `Competitive Research` instead of `Competitive Research Text`
- `Features` instead of `Competitive Features`
- `Images` or `Image Gallery` instead of `All Images`
- `Outcome` instead of `Outcomes`

## Step 4: Share Database with Integration

1. Open your Projects database
2. Click the "..." menu in the top right
3. Click "Add connections" or "Connections"
4. Search for and select your integration (e.g., "Portfolio CMS")
5. Click "Confirm"

## Step 5: Get Database ID

1. Open your Projects database
2. Look at the URL: `https://www.notion.so/your-workspace/DATABASE_ID?v=...`
3. The `DATABASE_ID` is the long string of characters between the last `/` and the `?`
4. It looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`
5. Copy this - this is your `NOTION_PROJECTS_DB_ID`

## Step 6: Add Environment Variables

1. Create or update `.env.local` in your project root
2. Add these variables:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_PROJECTS_DB_ID=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

3. Replace the values with your actual API key and database ID

## Step 7: Create Your First Project

1. In your Notion database, create a new row
2. Fill in all the properties:
   - **Title**: "Bankrate Review Template (Notion Test)"
   - **Slug**: "notion-test"
   - **Category**: "PRODUCT DESIGN"
   - **Description**: "A test page powered by Notion CMS"
   - **Hero Image URL**: "/bankrate-review-template-header.png" (or full URL)
   - **Hero Title**: "Designing modular review templates that scale across verticals"
   - **Summary Text 1**: "I had the opportunity to lead the end-to-end redesign..."
   - **Summary Text 2**: "Partner logos have been redacted for confidentiality."
   - **Role**: "Senior Product Designer"
   - **Timeline**: "4 months"
   - **Tools**: "Figma, Figjam, Confluence"
   - **Deliverables**: "Component Library, Template System, Design Documentation, Interactive Prototypes"
   - **Outcomes**: "Revenue per session, time on page, adoption percentage"
   - **Problem Statement**: "Bankrate's review pages suffered from inconsistent layouts..."
   - **Goals**: Add multiple options like "Empower vertical teams", "Maintain shared visual language", etc.
   - **KPIs**: Add multiple options like "Revenue per session", "Time on page", etc.
   - **Co-creation Text**: "We began the project with a one-hour, cross-functional co-creation workshop..."
   - **Co-creation Images**: Add image URLs (one per option)
   - **Competitive Research Text**: "I conducted my own competitive analysis..."
   - **Competitive Features**: Add features like "The product image", "Product name and rating", etc.
   - **All Images**: Add all image URLs for the lightbox gallery

## Step 8: Test the Integration

1. Start your development server: `pnpm dev`
2. Navigate to: `http://localhost:3000/project/notion-test`
3. You should see your project content from Notion!

## Image URLs

You can use:
- **Relative paths**: `/bankrate-review-template-header.png` (for images in your `public` folder)
- **Full URLs**: `https://example.com/image.jpg` (for external images)
- **Notion-hosted images**: Notion images need to be exported/shared publicly first, or you can upload to your own hosting

## Troubleshooting

### "Project not found"
- Check that the `Slug` property matches exactly (case-sensitive)
- Verify the database is shared with your integration
- Check that `NOTION_PROJECTS_DB_ID` is correct

### "NOTION_API_KEY is not set"
- Make sure `.env.local` exists and has the correct variable name
- Restart your development server after adding environment variables

### Images not loading
- Verify image URLs are correct
- For relative paths, ensure images exist in the `public` folder
- For external URLs, ensure they're publicly accessible

### Fallback to Static Data
- If Notion fails, the system automatically falls back to your static `data.ts` file
- Check the browser console for error messages
- Verify your API key and database ID are correct

## Next Steps

Once this is working:
1. Create more projects in Notion
2. Update existing projects by editing the Notion database
3. Consider adding more fields (videos, additional sections, etc.)
4. Customize the transformer in `lib/notion/transformers.ts` if needed

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the server logs for API errors
3. Verify all environment variables are set correctly
4. Test the Notion API directly using their API explorer

