import React from 'react'
import Image from 'next/image'

export interface NotionBlock {
  id: string
  type: string
  [key: string]: any
}

interface BlockRendererProps {
  block: NotionBlock
  allImages?: string[]
  onImageClick?: (index: number) => void
}

export function renderNotionBlock(block: NotionBlock, allImages: string[] = [], onImageClick?: (index: number) => void): React.ReactNode {
  const { type, id } = block

  switch (type) {
    case 'paragraph':
      const paragraphText = block.paragraph?.rich_text?.map((text: any) => text.plain_text).join('') || ''
      if (!paragraphText.trim()) return null
      return (
        <p key={id} className="text-lg leading-[28px] text-zinc-400 mb-6">
          {block.paragraph?.rich_text?.map((text: any, idx: number) => {
            const annotations = text.annotations || {}
            let content = text.plain_text
            
            if (annotations.bold) content = <strong key={idx}>{content}</strong>
            if (annotations.italic) content = <em key={idx}>{content}</em>
            if (annotations.code) content = <code key={idx} className="bg-zinc-800 px-1 rounded">{content}</code>
            
            return <span key={idx}>{content}</span>
          })}
        </p>
      )

    case 'heading_1':
      const h1Text = block.heading_1?.rich_text?.map((text: any) => text.plain_text).join('') || ''
      return (
        <h1 key={id} className="font-display font-bold text-5xl md:text-6xl leading-[48px] md:leading-[60px] text-white mb-8 mt-12">
          {h1Text}
        </h1>
      )

    case 'heading_2':
      const h2Text = block.heading_2?.rich_text?.map((text: any) => text.plain_text).join('') || ''
      return (
        <h2 key={id} className="font-display font-bold text-4xl leading-[40px] text-white mb-6 mt-10">
          {h2Text}
        </h2>
      )

    case 'heading_3':
      const h3Text = block.heading_3?.rich_text?.map((text: any) => text.plain_text).join('') || ''
      return (
        <h3 key={id} className="font-display font-bold text-3xl leading-[36px] text-white mb-4 mt-8">
          {h3Text}
        </h3>
      )

    case 'bulleted_list_item':
      const bulletText = block.bulleted_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || ''
      return (
        <li key={id} className="text-lg leading-[28px] text-zinc-400 flex items-start gap-3 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 flex-shrink-0" />
          {bulletText}
        </li>
      )

    case 'numbered_list_item':
      const numberedText = block.numbered_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || ''
      return (
        <li key={id} className="text-lg leading-[28px] text-zinc-400 mb-2">
          {numberedText}
        </li>
      )

    case 'image':
      // Support both Notion-hosted images and local images (relative paths)
      let imageUrl = block.image?.file?.url || block.image?.external?.url || ''
      
      // If external URL is a relative path (starts with /), use it directly
      // This allows using local images from /public/images folder
      if (block.image?.external?.url && block.image.external.url.startsWith('/')) {
        imageUrl = block.image.external.url
      }
      // If it's a full URL pointing to localhost or our domain, extract the path
      else if (block.image?.external?.url && typeof block.image.external.url === 'string') {
        try {
          const url = new URL(block.image.external.url)
          // Check if it's localhost or our production domain (Vercel or custom domain)
          if (url.hostname === 'localhost' || 
              url.hostname.includes('vercel.app') || 
              url.hostname.includes('vercel.com') ||
              process.env.NEXT_PUBLIC_SITE_URL?.includes(url.hostname)) {
            // Extract just the pathname (e.g., /images/editorial/image.jpg)
            imageUrl = url.pathname
          }
        } catch (e) {
          // If URL parsing fails, use the original URL
        }
      }
      
      if (!imageUrl) return null
      
      const imageIndex = allImages.indexOf(imageUrl)
      const hasClickHandler = imageIndex >= 0 && onImageClick
      
      // Determine if image is local (relative path) or external (Notion-hosted)
      const isLocalImage = imageUrl.startsWith('/')
      
      // Check if this image should be full-width (check if we're in full-width mode)
      // We'll pass this as a prop through the renderer
      const shouldBeFullWidth = (block as any).__fullWidth || false
      
      return (
        <div 
          key={id} 
          className={`relative ${shouldBeFullWidth ? 'w-full my-8' : 'w-full my-4'} ${hasClickHandler ? 'cursor-pointer group' : ''}`}
          onClick={() => hasClickHandler && onImageClick(imageIndex)}
          style={shouldBeFullWidth ? {
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw'
          } : {}}
        >
          <div className={`relative w-full aspect-video bg-zinc-800 rounded-lg overflow-hidden ${shouldBeFullWidth ? 'container mx-auto px-4 md:px-16 max-w-[1280px]' : ''}`}>
            <Image
              src={imageUrl}
              alt={block.image?.caption?.[0]?.plain_text || 'Image'}
              fill
              className={`object-cover transition-transform duration-500 ${hasClickHandler ? 'group-hover:scale-105' : ''}`}
              unoptimized={imageUrl.startsWith('http') ? false : true}
            />
            {hasClickHandler && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
            )}
          </div>
          {block.image?.caption && block.image.caption.length > 0 && (
            <p className={`text-sm text-zinc-500 mt-2 text-center ${shouldBeFullWidth ? 'container mx-auto px-4 md:px-16 max-w-[1280px]' : ''}`}>
              {block.image.caption.map((cap: any) => cap.plain_text).join('')}
            </p>
          )}
        </div>
      )

    case 'divider':
      return <hr key={id} className="my-8 border-zinc-600" />

    case 'quote':
      const quoteText = block.quote?.rich_text?.map((text: any) => text.plain_text).join('') || ''
      return (
        <blockquote key={id} className="border-l-4 border-coral-500 pl-6 py-4 my-6 italic text-zinc-300">
          {quoteText}
        </blockquote>
      )

    case 'code':
      const codeText = block.code?.rich_text?.map((text: any) => text.plain_text).join('') || ''
      const language = block.code?.language || ''
      return (
        <pre key={id} className="bg-zinc-900 p-4 rounded-lg overflow-x-auto my-6">
          <code className="text-sm text-zinc-300">{codeText}</code>
        </pre>
      )

    case 'callout':
      const calloutText = block.callout?.rich_text?.map((text: any) => text.plain_text).join('') || ''
      const icon = block.callout?.icon
      
      // Check if this is a full-width marker (hidden callout used as a marker)
      const isFullWidthMarker = calloutText.toUpperCase().includes('FULLWIDTH') || 
                                calloutText.toUpperCase().includes('FULL WIDTH') ||
                                calloutText.toUpperCase().includes('FULL-WIDTH') ||
                                icon?.emoji === '📐' || 
                                icon?.emoji === '🖼️'
      
      // If it's a marker, return null (it won't be rendered, just used to mark sections)
      if (isFullWidthMarker) {
        return null
      }
      
      return (
        <div key={id} className="bg-coral-50 border border-coral-200 rounded-lg p-4 my-6">
          {icon && <span className="mr-2">{icon.emoji || '💡'}</span>}
          <span className="text-zinc-800">{calloutText}</span>
        </div>
      )

    case 'column_list':
      // Column list contains column blocks
      const columnBlocks = (block as any).children || []
      return (
        <div key={id} className="flex flex-col md:flex-row gap-4 my-8">
          {columnBlocks.map((columnBlock: NotionBlock, colIndex: number) => {
            const columnChildren = (columnBlock as any).children || []
            return (
              <div key={columnBlock.id || colIndex} className="flex-1">
                {columnChildren.map((childBlock: NotionBlock) => 
                  renderNotionBlock(childBlock, allImages, onImageClick)
                )}
              </div>
            )
          })}
        </div>
      )

    case 'column':
      // Columns are handled by column_list, but we can render them individually if needed
      const columnChildren = (block as any).children || []
      return (
        <div key={id} className="flex-1">
          {columnChildren.map((childBlock: NotionBlock) => 
            renderNotionBlock(childBlock, allImages, onImageClick)
          )}
        </div>
      )

    default:
      // For unsupported block types, try to extract any text
      const anyText = (block as any)[type]?.rich_text?.map((text: any) => text.plain_text).join('')
      if (anyText) {
        return (
          <p key={id} className="text-lg leading-[28px] text-zinc-400 mb-6">
            {anyText}
          </p>
        )
      }
      return null
  }
}

export function renderNotionBlocks(
  blocks: NotionBlock[],
  allImages: string[] = [],
  onImageClick?: (index: number) => void
): React.ReactNode {
  const elements: React.ReactNode[] = []
  let currentList: NotionBlock[] = []
  let listType: 'bulleted' | 'numbered' | null = null
  let isFullWidth = false // Only affects images

  function isFullWidthMarker(block: NotionBlock): boolean {
    if (block.type === 'callout') {
      const calloutText = block.callout?.rich_text?.map((text: any) => text.plain_text).join('') || ''
      const icon = block.callout?.icon
      return calloutText.toUpperCase().includes('FULLWIDTH') || 
             calloutText.toUpperCase().includes('FULL WIDTH') ||
             calloutText.toUpperCase().includes('FULL-WIDTH') ||
             icon?.emoji === '📐' || 
             icon?.emoji === '🖼️'
    }
    return false
  }

  // Removed flushFullWidthSection - we don't need it anymore
  // Full-width mode now only affects images, which are rendered inline

  blocks.forEach((block, index) => {
    // Skip column blocks - they're handled by column_list
    if (block.type === 'column') {
      return
    }

    // Check for full-width markers
    if (isFullWidthMarker(block)) {
      // Flush any regular content before switching to full-width
      if (currentList.length > 0) {
        if (listType === 'bulleted') {
          elements.push(
            <ul key={`list-${index}`} className="space-y-2 pl-6 mb-6">
              {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
            </ul>
          )
        } else {
          elements.push(
            <ol key={`list-${index}`} className="list-decimal list-inside space-y-2 pl-6 mb-6">
              {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
            </ol>
          )
        }
        currentList = []
        listType = null
      }
      
      // Toggle full-width mode (only affects images)
      isFullWidth = !isFullWidth
      return // Don't render the marker itself
    }

    // Handle list grouping
    if (block.type === 'bulleted_list_item') {
      if (listType !== 'bulleted') {
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="space-y-2 pl-6 mb-6">
              {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
            </ul>
          )
        }
        currentList = []
        listType = 'bulleted'
      }
      currentList.push(block)
      return
    }

    if (block.type === 'numbered_list_item') {
      if (listType !== 'numbered') {
        if (currentList.length > 0) {
          elements.push(
            <ol key={`list-${index}`} className="list-decimal list-inside space-y-2 pl-6 mb-6">
              {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
            </ol>
          )
        }
        currentList = []
        listType = 'numbered'
      }
      currentList.push(block)
      return
    }

    // Flush current list if we hit a non-list block
    // Lists always render in narrow container, even in full-width mode
    if (currentList.length > 0) {
      if (listType === 'bulleted') {
        elements.push(
          <ul key={`list-${index}`} className="space-y-2 pl-6 mb-6">
            {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
          </ul>
        )
      } else {
        elements.push(
          <ol key={`list-${index}`} className="list-decimal list-inside space-y-2 pl-6 mb-6">
            {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
          </ol>
        )
      }
      currentList = []
      listType = null
    }

    // Render the block
    // If in full-width mode and it's an image, mark it as full-width
    // Otherwise, render normally (lists and text stay in narrow container)
    if (isFullWidth && block.type === 'image') {
      // Mark image as full-width
      ;(block as any).__fullWidth = true
      const rendered = renderNotionBlock(block, allImages, onImageClick)
      if (rendered) {
        elements.push(rendered)
      }
    } else {
      // Render normally (in narrow container)
      const rendered = renderNotionBlock(block, allImages, onImageClick)
      if (rendered) {
        elements.push(rendered)
      }
    }
  })

  // Flush any remaining list items
  if (currentList.length > 0) {
    if (listType === 'bulleted') {
      elements.push(
        <ul key="list-final" className="space-y-2 pl-6 mb-6">
          {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
        </ul>
      )
    } else {
      elements.push(
        <ol key="list-final" className="list-decimal list-inside space-y-2 pl-6 mb-6">
          {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
        </ol>
      )
    }
  }

  return <>{elements}</>
}

