import type { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface TransformedProject {
  title: string
  slug: string
  category: string
  description: string
  heroImageUrl: string
  heroTitle: string
  summary: string[]
  role: string
  timeline: string
  tools: string
  deliverables: string
  outcomes: string
  problemStatement: string
  goals: string[]
  kpis: string[]
  coCreationText: string
  coCreationImages: string[]
  competitiveResearchText: string
  competitiveFeatures: string[]
  allImages: string[]
  // Optional header overrides (if empty, use default)
  problemStatementHeader?: string
  goalsHeader?: string
  kpisHeader?: string
  coCreationHeader?: string
  competitiveResearchHeader?: string
}

/**
 * Extract text from Notion rich_text property
 */
function extractRichText(property: any): string {
  if (!property || !property.rich_text) return ''
  return property.rich_text.map((text: any) => text.plain_text).join('')
}

/**
 * Extract text from Notion title property
 */
function extractTitle(property: any): string {
  if (!property || !property.title) return ''
  return property.title.map((text: any) => text.plain_text).join('')
}

/**
 * Extract URLs from Notion multi-select or URL property
 */
function extractUrls(property: any): string[] {
  if (!property) return []
  
  // Handle URL property
  if (property.url) {
    return property.url ? [property.url] : []
  }
  
  // Handle multi-select
  if (property.multi_select) {
    return property.multi_select.map((item: any) => item.name || item.url || '').filter(Boolean)
  }
  
  // Handle relation (if you use relations)
  if (property.relation) {
    return property.relation.map((item: any) => item.id).filter(Boolean)
  }
  
  return []
}

/**
 * Extract array from Notion multi-select
 */
function extractMultiSelect(property: any): string[] {
  if (!property || !property.multi_select) return []
  return property.multi_select.map((item: any) => item.name).filter(Boolean)
}

/**
 * Transform Notion page to your project format
 */
export function transformNotionProject(page: PageObjectResponse | PartialPageObjectResponse): TransformedProject | null {
  if (!('properties' in page)) {
    return null
  }

  const props = page.properties

  return {
    title: extractTitle(props.Title || props['Project Title']),
    slug: extractRichText(props.Slug || props['URL Slug']),
    category: props.Category?.select?.name || 'PRODUCT DESIGN',
    description: extractRichText(props.Description),
    heroImageUrl: extractUrls(props['Hero Image URL'] || props['Hero Image'])[0] || '',
    heroTitle: extractRichText(props['Hero Title'] || props.Title),
    summary: [
      extractRichText(props['Summary Text 1'] || props['Summary 1']),
      extractRichText(props['Summary Text 2'] || props['Summary 2']),
      extractRichText(props['Summary Text 3'] || props['Summary 3']),
    ].filter(Boolean),
    role: extractRichText(props.Role),
    timeline: extractRichText(props.Timeline),
    tools: extractRichText(props.Tools),
    deliverables: extractRichText(props.Deliverables),
    outcomes: extractRichText(props.Outcomes || props['Outcome']),
    problemStatement: extractRichText(props['Problem Statement'] || props['Problem']),
    goals: extractMultiSelect(props.Goals || props['Goal']),
    kpis: extractMultiSelect(props.KPIs || props['KPI'] || props['KPI\'s']),
    coCreationText: extractRichText(props['Co-creation Text'] || props['Co-creation']),
    coCreationImages: extractUrls(props['Co-creation Images'] || props['Co-creation Image']),
    competitiveResearchText: extractRichText(props['Competitive Research Text'] || props['Competitive Research']),
    competitiveFeatures: extractMultiSelect(props['Competitive Features'] || props['Features']),
    allImages: extractUrls(props['All Images'] || props['Images'] || props['Image Gallery']),
    // Optional header overrides
    problemStatementHeader: extractRichText(props['Problem Statement Header'] || props['Problem Header']),
    goalsHeader: extractRichText(props['Goals Header']),
    kpisHeader: extractRichText(props['KPIs Header'] || props['KPI Header']),
    coCreationHeader: extractRichText(props['Co-creation Header'] || props['Co-creation Session Header']),
    competitiveResearchHeader: extractRichText(props['Competitive Research Header']),
  }
}

