import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { normalizeImageUrl } from './image-url-utils'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/components/ui/button'

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
      const bulletChildren = (block as any).children || []
      const hasBulletChildren = bulletChildren.length > 0
      
      // Render nested children (group list items together)
      let nestedContent: React.ReactNode = null
      if (hasBulletChildren) {
        const nestedElements: React.ReactNode[] = []
        let currentNestedList: NotionBlock[] = []
        let nestedListType: 'bulleted' | 'numbered' | null = null
        
        bulletChildren.forEach((childBlock: NotionBlock) => {
          if (childBlock.type === 'bulleted_list_item') {
            if (nestedListType !== 'bulleted') {
              if (currentNestedList.length > 0) {
                nestedElements.push(
                  nestedListType === 'numbered' ? (
                    <ol key={`nested-${nestedElements.length}`} className="mt-2 ml-12 space-y-2 list-outside pl-8" style={{ listStyleType: 'lower-alpha' }}>
                      {currentNestedList.map(b => renderNotionBlock(b, allImages, onImageClick))}
                    </ol>
                  ) : null
                )
              }
              currentNestedList = []
              nestedListType = 'bulleted'
            }
            currentNestedList.push(childBlock)
          } else if (childBlock.type === 'numbered_list_item') {
            if (nestedListType !== 'numbered') {
              if (currentNestedList.length > 0) {
                nestedElements.push(
                  nestedListType === 'bulleted' ? (
                    <ul key={`nested-${nestedElements.length}`} className="mt-2 ml-12 space-y-1 list-outside pl-8" style={{ listStyleType: 'circle' }}>
                      {currentNestedList.map((b: NotionBlock) => {
                        // For nested bulleted lists, render without the custom bullet styling
                        const nestedBulletText = b.bulleted_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || ''
                        return (
                          <li key={b.id} className="text-lg leading-[28px] text-zinc-400">
                            {nestedBulletText}
                          </li>
                        )
                      })}
                    </ul>
                  ) : null
                )
              }
              currentNestedList = []
              nestedListType = 'numbered'
            }
            currentNestedList.push(childBlock)
          } else {
            // Flush current list
            if (currentNestedList.length > 0) {
              nestedElements.push(
                nestedListType === 'bulleted' ? (
                  <ul key={`nested-${nestedElements.length}`} className="mt-2 ml-12 space-y-1 list-outside pl-8" style={{ listStyleType: 'circle' }}>
                    {currentNestedList.map((b: NotionBlock) => {
                      // For nested bulleted lists, render without the custom bullet styling
                      const nestedBulletText = b.bulleted_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || ''
                      return (
                        <li key={b.id} className="text-lg leading-[28px] text-zinc-400">
                          {nestedBulletText}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <ol key={`nested-${nestedElements.length}`} className="mt-2 ml-12 space-y-2 list-outside pl-8" style={{ listStyleType: 'lower-alpha' }}>
                    {currentNestedList.map(b => renderNotionBlock(b, allImages, onImageClick))}
                  </ol>
                )
              )
              currentNestedList = []
              nestedListType = null
            }
            nestedElements.push(renderNotionBlock(childBlock, allImages, onImageClick))
          }
        })
        
        // Flush remaining list
        if (currentNestedList.length > 0) {
          nestedElements.push(
            nestedListType === 'bulleted' ? (
              <ul key={`nested-${nestedElements.length}`} className="mt-2 ml-12 space-y-1 list-outside pl-8" style={{ listStyleType: 'circle' }}>
                {currentNestedList.map((b: NotionBlock) => {
                  // For nested bulleted lists, render without the custom bullet styling
                  const nestedBulletText = b.bulleted_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || ''
                  return (
                    <li key={b.id} className="text-lg leading-[28px] text-zinc-400">
                      {nestedBulletText}
                    </li>
                  )
                })}
              </ul>
            ) : (
              <ol key={`nested-${nestedElements.length}`} className="mt-2 ml-12 space-y-2 list-outside pl-8" style={{ listStyleType: 'lower-alpha' }}>
                {currentNestedList.map(b => renderNotionBlock(b, allImages, onImageClick))}
              </ol>
            )
          )
        }
        
        nestedContent = nestedElements.length > 0 ? <div className="mt-2">{nestedElements}</div> : null
      }
      
      return (
        <li key={id} className="text-lg leading-[28px] text-zinc-400 mb-2" style={{ listStyle: 'none' }}>
          <div className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 flex-shrink-0" />
            <div className="flex-1">
              {bulletText}
              {nestedContent}
            </div>
          </div>
        </li>
      )

    case 'numbered_list_item':
    case 'numberedList':
      // Handle both 'numbered_list_item' and potential variations
      const numberedListData = block.numbered_list_item || (block as any).numberedList || {}
      const numberedRichText = numberedListData?.rich_text || []
      const numberedChildren = (block as any).children || []
      const hasNumberedChildren = numberedChildren.length > 0
      
      // Render nested children (group list items together)
      let numberedNestedContent: React.ReactNode = null
      if (hasNumberedChildren) {
        const nestedElements: React.ReactNode[] = []
        let currentNestedList: NotionBlock[] = []
        let nestedListType: 'bulleted' | 'numbered' | null = null
        
        numberedChildren.forEach((childBlock: NotionBlock) => {
          if (childBlock.type === 'bulleted_list_item') {
            if (nestedListType !== 'bulleted') {
              if (currentNestedList.length > 0) {
                nestedElements.push(
                  nestedListType === 'numbered' ? (
                    <ol key={`nested-${nestedElements.length}`} className="mt-2 ml-12 space-y-2 list-outside pl-8" style={{ listStyleType: 'lower-alpha' }}>
                      {currentNestedList.map(b => renderNotionBlock(b, allImages, onImageClick))}
                    </ol>
                  ) : null
                )
              }
              currentNestedList = []
              nestedListType = 'bulleted'
            }
            currentNestedList.push(childBlock)
          } else if (childBlock.type === 'numbered_list_item') {
            if (nestedListType !== 'numbered') {
              if (currentNestedList.length > 0) {
                nestedElements.push(
                  nestedListType === 'bulleted' ? (
                    <ul key={`nested-${nestedElements.length}`} className="mt-2 ml-12 space-y-1 list-outside pl-8" style={{ listStyleType: 'circle' }}>
                      {currentNestedList.map((b: NotionBlock) => {
                        // For nested bulleted lists, render without the custom bullet styling
                        const nestedBulletText = b.bulleted_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || ''
                        return (
                          <li key={b.id} className="text-lg leading-[28px] text-zinc-400">
                            {nestedBulletText}
                          </li>
                        )
                      })}
                    </ul>
                  ) : null
                )
              }
              currentNestedList = []
              nestedListType = 'numbered'
            }
            currentNestedList.push(childBlock)
          } else {
            // Flush current list
            if (currentNestedList.length > 0) {
              nestedElements.push(
                nestedListType === 'bulleted' ? (
                  <ul key={`nested-${nestedElements.length}`} className="mt-2 ml-12 space-y-1 list-outside pl-8" style={{ listStyleType: 'circle' }}>
                    {currentNestedList.map((b: NotionBlock) => {
                      // For nested bulleted lists, render without the custom bullet styling
                      const nestedBulletText = b.bulleted_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || ''
                      return (
                        <li key={b.id} className="text-lg leading-[28px] text-zinc-400">
                          {nestedBulletText}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <ol key={`nested-${nestedElements.length}`} className="mt-2 ml-12 space-y-2 list-outside pl-8" style={{ listStyleType: 'lower-alpha' }}>
                    {currentNestedList.map(b => renderNotionBlock(b, allImages, onImageClick))}
                  </ol>
                )
              )
              currentNestedList = []
              nestedListType = null
            }
            nestedElements.push(renderNotionBlock(childBlock, allImages, onImageClick))
          }
        })
        
        // Flush remaining list
        if (currentNestedList.length > 0) {
          nestedElements.push(
            nestedListType === 'bulleted' ? (
              <ul key={`nested-${nestedElements.length}`} className="mt-2 ml-12 space-y-1 list-outside pl-8" style={{ listStyleType: 'circle' }}>
                {currentNestedList.map((b: NotionBlock) => {
                  // For nested bulleted lists, render without the custom bullet styling
                  const nestedBulletText = b.bulleted_list_item?.rich_text?.map((text: any) => text.plain_text).join('') || ''
                  return (
                    <li key={b.id} className="text-lg leading-[28px] text-zinc-400">
                      {nestedBulletText}
                    </li>
                  )
                })}
              </ul>
            ) : (
              <ol key={`nested-${nestedElements.length}`} className="mt-2 ml-12 space-y-2 list-outside pl-8" style={{ listStyleType: 'lower-alpha' }}>
                {currentNestedList.map(b => renderNotionBlock(b, allImages, onImageClick))}
              </ol>
            )
          )
        }
        
        numberedNestedContent = nestedElements.length > 0 ? <div className="mt-2">{nestedElements}</div> : null
      }
      
      // Render rich text with formatting (bold, italic, etc.)
      const numberedTextContent = numberedRichText.length > 0 ? (
        numberedRichText.map((text: any, idx: number) => {
          const annotations = text.annotations || {}
          let content: React.ReactNode = text.plain_text
          
          if (annotations.bold) content = <strong key={idx}>{content}</strong>
          if (annotations.italic) content = <em key={idx}>{content}</em>
          if (annotations.code) content = <code key={idx} className="bg-zinc-800 px-1 rounded">{content}</code>
          
          return <span key={idx}>{content}</span>
        })
      ) : null
      
      return (
        <li key={id} className="text-lg leading-[28px] text-zinc-400 mb-2">
          <div>
            {numberedTextContent}
            {numberedNestedContent}
          </div>
        </li>
      )

    case 'image':
      // Support both Notion-hosted images and local images (relative paths)
      // Use shared normalization function to ensure consistent URL matching
      const rawImageUrl = block.image?.file?.url || block.image?.external?.url || ''
      const normalizedUrl = normalizeImageUrl(rawImageUrl)
      
      if (!normalizedUrl && !rawImageUrl) return null
      
      // Use normalized URL if it's a relative path, otherwise use the raw URL
      // This handles both local images (/images/...) and Notion-hosted images (https://...)
      const displayUrl = normalizedUrl.startsWith('/') ? normalizedUrl : rawImageUrl
      
      // Find image index for lightbox - match on normalized URL
      const imageIndex = allImages.findIndex(img => {
        const normalizedImg = normalizeImageUrl(img)
        return normalizedImg === normalizedUrl || img === normalizedUrl || img === rawImageUrl || normalizedImg === rawImageUrl
      })
      const hasClickHandler = imageIndex >= 0 && onImageClick
      
      // Determine if image is local (relative path) or external (Notion-hosted)
      const isLocalImage = displayUrl.startsWith('/')
      
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
              src={displayUrl}
              alt={block.image?.caption?.[0]?.plain_text || 'Image'}
              fill
              className={`object-cover transition-transform duration-500 ${hasClickHandler ? 'group-hover:scale-105' : ''}`}
              unoptimized={isLocalImage ? true : false}
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
      const emoji = icon?.emoji || '💡'
      const calloutChildren = (block as any).children || []
      const hasChildren = calloutChildren.length > 0
      
      // Check if this is a full-width marker (hidden callout used as a marker)
      const isFullWidthMarker = calloutText.toUpperCase().includes('FULLWIDTH') || 
                                calloutText.toUpperCase().includes('FULL WIDTH') ||
                                calloutText.toUpperCase().includes('FULL-WIDTH') ||
                                emoji === '📐' || 
                                emoji === '🖼️'
      
      // If it's a marker, return null (it won't be rendered, just used to mark sections)
      if (isFullWidthMarker) {
        return null
      }
      
      // Try to get Lucide icon name from callout text (format: "icon:IconName" or "icon: icon-name")
      let lucideIconName: string | null = null
      const iconMatch = calloutText.match(/icon:\s*([A-Za-z0-9-]+)/i)
      if (iconMatch && iconMatch[1]) {
        // Convert kebab-case to PascalCase (e.g., "arrow-right" -> "ArrowRight")
        lucideIconName = iconMatch[1]
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join('')
      }
      
      // Get Lucide icon component if name is found
      let LucideIcon: React.ComponentType<{ className?: string; size?: number }> | null = null
      if (lucideIconName && lucideIconName in LucideIcons) {
        LucideIcon = (LucideIcons as any)[lucideIconName] as React.ComponentType<{ className?: string; size?: number }>
      }
      
      // Check for button link pattern (format: "button:https://example.com" or "link:https://example.com")
      // Can optionally include variant: "button:https://example.com variant:primary" or "button:https://example.com variant:secondary"
      // Can optionally include icons: "icon:leading:ArrowRight" or "icon:trailing:ArrowRight"
      let buttonUrl: string | null = null
      let buttonVariant: 'primary' | 'secondary' = 'primary'
      
      // Extract URLs from link annotations as fallback
      const richTextLinks: string[] = []
      block.callout?.rich_text?.forEach((text: any) => {
        if (text.href) {
          richTextLinks.push(text.href)
        }
      })
      
      // Improved regex that handles URLs with or without spaces after the colon
      // Pattern: button: or link: followed by optional space, then URL (stops at space or end), then optional variant
      // The URL pattern now explicitly handles http/https/mailto/relative paths
      // Made more flexible to handle various URL formats and spacing
      const buttonMatch = calloutText.match(/(?:button|link):\s*(https?:\/\/[^\s<>]+|mailto:[^\s<>]+|\/[^\s<>]*)(?:\s+variant:\s*(primary|secondary))?/i)
      
      if (buttonMatch && buttonMatch[1]) {
        buttonUrl = buttonMatch[1]
        if (buttonMatch[2]) {
          buttonVariant = buttonMatch[2].toLowerCase() as 'primary' | 'secondary'
        }
      } else if (richTextLinks.length > 0 && (calloutText.toLowerCase().includes('button:') || calloutText.toLowerCase().includes('link:'))) {
        // Fallback: if pattern doesn't match but we have a link annotation and button/link keyword, use the first link
        buttonUrl = richTextLinks[0]
      }
      
      // Debug logging in development
      if (process.env.NODE_ENV === 'development' && (calloutText.toLowerCase().includes('button:') || calloutText.toLowerCase().includes('link:'))) {
        if (!buttonUrl) {
          console.log('[Button Debug] Pattern not matched:', {
            calloutText,
            buttonMatch,
            richTextLinks,
            hasButtonKeyword: calloutText.toLowerCase().includes('button:') || calloutText.toLowerCase().includes('link:')
          })
        }
      }
      
      // Check for button icon patterns (format: "icon:leading:IconName" or "icon:trailing:IconName")
      let buttonLeadingIcon: React.ComponentType<{ className?: string; size?: number }> | null = null
      let buttonTrailingIcon: React.ComponentType<{ className?: string; size?: number }> | null = null
      
      if (buttonUrl) {
        const leadingIconMatch = calloutText.match(/icon:leading:\s*([A-Za-z0-9-]+)/i)
        if (leadingIconMatch && leadingIconMatch[1]) {
          const iconNameRaw = leadingIconMatch[1]
          // Convert kebab-case to PascalCase (e.g., "arrow-right" -> "ArrowRight")
          // Also handle if already PascalCase (e.g., "ArrowRight" -> "ArrowRight")
          const leadingIconName = iconNameRaw
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('')
          
          if (leadingIconName in LucideIcons) {
            buttonLeadingIcon = (LucideIcons as any)[leadingIconName] as React.ComponentType<{ className?: string; size?: number }>
          } else if (process.env.NODE_ENV === 'development') {
            console.log('[Button Icon Debug] Leading icon not found:', {
              raw: iconNameRaw,
              converted: leadingIconName,
              available: Object.keys(LucideIcons).filter(k => k.toLowerCase().includes(iconNameRaw.toLowerCase())).slice(0, 5)
            })
          }
        }
        
        const trailingIconMatch = calloutText.match(/icon:trailing:\s*([A-Za-z0-9-]+)/i)
        if (trailingIconMatch && trailingIconMatch[1]) {
          const iconNameRaw = trailingIconMatch[1]
          // Convert kebab-case to PascalCase
          const trailingIconName = iconNameRaw
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('')
          
          if (trailingIconName in LucideIcons) {
            buttonTrailingIcon = (LucideIcons as any)[trailingIconName] as React.ComponentType<{ className?: string; size?: number }>
          } else if (process.env.NODE_ENV === 'development') {
            console.log('[Button Icon Debug] Trailing icon not found:', {
              raw: iconNameRaw,
              converted: trailingIconName,
              available: Object.keys(LucideIcons).filter(k => k.toLowerCase().includes(iconNameRaw.toLowerCase())).slice(0, 5)
            })
          }
        }
      }
      
      // Determine callout style based on emoji (emoji is used for styling, not display)
      // Available emoji styles:
      // 💡 - Default/Info (zinc-800)
      // ⚠️ - Warning (amber)
      // ✅ - Success (green)
      // ❌ - Error/Danger (red)
      // 💬 - Quote/Testimonial (blue)
      // 📌 - Important/Highlight (purple)
      // 🎯 - Goal/Objective (indigo)
      // 📝 - Note (zinc/gray)
      // 🔍 - Insight/Research (teal)
      // You can wrap any blocks inside a callout by adding them as children in Notion
      // To use a Lucide icon, add "icon:IconName" to the callout text (e.g., "icon:Lightbulb")
      const getCalloutStyle = (emoji: string) => {
        switch (emoji) {
          case '💡': // Default/Info
            return {
              bg: 'bg-zinc-800',
              border: 'border-zinc-500',
              text: 'text-zinc-300',
              iconBg: 'bg-zinc-700'
            }
          case '⚠️': // Warning
            return {
              bg: 'bg-amber-50',
              border: 'border-amber-200',
              text: 'text-amber-900',
              iconBg: 'bg-amber-100'
            }
          case '✅': // Success
            return {
              bg: 'bg-green-50',
              border: 'border-green-200',
              text: 'text-green-900',
              iconBg: 'bg-green-100'
            }
          case '❌': // Error/Danger
            return {
              bg: 'bg-red-50',
              border: 'border-red-200',
              text: 'text-red-900',
              iconBg: 'bg-red-100'
            }
          case '💬': // Quote/Testimonial
            return {
              bg: 'bg-blue-50',
              border: 'border-blue-200',
              text: 'text-blue-900',
              iconBg: 'bg-blue-100'
            }
          case '📌': // Important/Highlight
            return {
              bg: 'bg-purple-50',
              border: 'border-purple-200',
              text: 'text-purple-900',
              iconBg: 'bg-purple-100'
            }
          case '🎯': // Goal/Objective
            return {
              bg: 'bg-indigo-50',
              border: 'border-indigo-200',
              text: 'text-indigo-900',
              iconBg: 'bg-indigo-100'
            }
          case '📝': // Note
            return {
              bg: 'bg-zinc-50',
              border: 'border-zinc-200',
              text: 'text-zinc-800',
              iconBg: 'bg-zinc-100'
            }
          case '🔍': // Insight/Research
            return {
              bg: 'bg-teal-50',
              border: 'border-teal-200',
              text: 'text-teal-900',
              iconBg: 'bg-teal-100'
            }
          default: // Default style
            return {
              bg: 'bg-coral-50',
              border: 'border-coral-200',
              text: 'text-zinc-800',
              iconBg: 'bg-coral-100'
            }
        }
      }
      
      const style = getCalloutStyle(emoji)
      
      // Remove icon:IconName and button: patterns from displayed text
      let displayText = calloutText
      if (lucideIconName) {
        displayText = displayText.replace(/icon:\s*[A-Za-z0-9-]+/i, '').trim()
      }
      if (buttonUrl) {
        displayText = displayText.replace(/(?:button|link):\s*(https?:\/\/[^\s<>]+|mailto:[^\s<>]+|\/[^\s<>]*)(?:\s+variant:\s*(primary|secondary))?/i, '').trim()
        // Remove button icon patterns - match the full pattern including the colon
        displayText = displayText.replace(/icon:leading:\s*[A-Za-z0-9-]+/gi, '').trim()
        displayText = displayText.replace(/icon:trailing:\s*[A-Za-z0-9-]+/gi, '').trim()
        // Also remove any leftover colon patterns (e.g., ":ArrowRight" if pattern was partially matched)
        displayText = displayText.replace(/^:\s*[A-Za-z0-9-]+\s*/i, '').trim()
      }
      
      // Extract icon components for button rendering (React requires capitalized component names)
      const LeadingIcon = buttonLeadingIcon
      const TrailingIcon = buttonTrailingIcon
      
      // If this is a button callout, render just the button without the callout container
      if (buttonUrl) {
        return (
          <div key={id} className="my-6">
            <Button 
              asChild 
              variant={buttonVariant}
              className="w-fit"
            >
              <Link 
                href={buttonUrl} 
                target={buttonUrl.startsWith('http') ? '_blank' : undefined} 
                rel={buttonUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {LeadingIcon && <LeadingIcon className="size-4" />}
                {displayText || 'Visit Link'}
                {TrailingIcon && <TrailingIcon className="size-4" />}
              </Link>
            </Button>
          </div>
        )
      }
      
      // Check if callout is inside a column_list by checking parent context
      // We'll use a data attribute to detect this, but for now, make callouts stretch when in columns
      return (
        <div key={id} className={`${style.bg} ${style.border} border rounded-lg p-4 my-6 h-full flex flex-col`}>
          <div className="flex flex-col flex-1">
            {LucideIcon && (
              <div className={`${style.iconBg} rounded-full p-2 w-fit mb-1 flex items-center justify-center`}>
                <LucideIcon className={style.text} size={20} />
              </div>
            )}
            <div className="flex-1">
              {displayText && (
                <div className={`${style.text} mb-2`}>
                  {block.callout?.rich_text?.map((text: any, idx: number) => {
                    // Skip text that matches icon: patterns
                    if (lucideIconName && /icon:\s*[A-Za-z0-9-]+/i.test(text.plain_text)) {
                      return null
                    }
                    
                    const annotations = text.annotations || {}
                    let content: React.ReactNode = text.plain_text
                    
                    if (annotations.bold) content = <strong key={idx}>{content}</strong>
                    if (annotations.italic) content = <em key={idx}>{content}</em>
                    if (annotations.code) content = <code key={idx} className="bg-zinc-200 px-1 rounded">{content}</code>
                    
                    return <span key={idx}>{content}</span>
                  })}
                </div>
              )}
              {hasChildren && (
                <div className="mt-3 space-y-2">
                  {renderNotionBlocks(calloutChildren, allImages, onImageClick)}
                </div>
              )}
            </div>
          </div>
        </div>
      )

    case 'column_list':
      // Column list contains column blocks
      const columnBlocks = (block as any).children || []
      const columnListFullWidth = (block as any).__fullWidth || false
      
      // Check if any column contains images (for full-width detection)
      const hasImages = columnBlocks.some((col: NotionBlock) => {
        const children = (col as any).children || []
        return children.some((child: NotionBlock) => child.type === 'image')
      })
      
      return (
        <div 
          key={id} 
          className="flex flex-col md:flex-row gap-4 my-8"
          style={columnListFullWidth ? {
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw'
          } : {}}
        >
          <div className={`w-full flex flex-col md:flex-row gap-4 items-stretch ${columnListFullWidth ? 'container mx-auto px-4 md:px-16 max-w-[1280px]' : ''}`}>
            {columnBlocks.map((columnBlock: NotionBlock, colIndex: number) => {
              const columnChildren = (columnBlock as any).children || []
              return (
                <div key={columnBlock.id || colIndex} className="flex-1 flex flex-col">
                  {/* Use renderNotionBlocks to properly group list items inside columns */}
                  {/* Pass insideColumnList=true so images inside don't get individually full-width */}
                  {renderNotionBlocks(columnChildren, allImages, onImageClick, true)}
                </div>
              )
            })}
          </div>
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
  onImageClick?: (index: number) => void,
  insideColumnList: boolean = false
): React.ReactNode {
  const elements: React.ReactNode[] = []
  let currentList: NotionBlock[] = []
  let listType: 'bulleted' | 'numbered' | null = null
  let isFullWidth = false // Affects all blocks when enabled

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

  // Helper function to wrap a block in full-width container
  function wrapFullWidth(element: React.ReactNode, key: string): React.ReactNode {
    if (!element) return null
    return (
      <div
        key={key}
        style={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw'
        }}
      >
        <div className="container mx-auto px-4 md:px-16 max-w-[1280px]">
          {element}
        </div>
      </div>
    )
  }

  blocks.forEach((block, index) => {
    // Skip column blocks - they're handled by column_list
    if (block.type === 'column') {
      return
    }


    // Check for full-width markers
    if (isFullWidthMarker(block)) {
      // Flush any regular content before switching to full-width
      if (currentList.length > 0) {
        const firstItemType = currentList[0]?.type
        const isNumberedList = listType === 'numbered' || firstItemType === 'numbered_list_item'
        
        let listElement: React.ReactNode
        if (listType === 'bulleted' || (!isNumberedList && firstItemType === 'bulleted_list_item')) {
          listElement = (
            <ul key={`list-${index}`} className="space-y-2 pl-6 mb-6" style={{ listStyle: 'none' }}>
              {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
            </ul>
          )
        } else if (isNumberedList) {
          listElement = (
            <ol key={`list-${index}`} className="list-decimal list-outside pl-6 space-y-2 mb-6" style={{ listStyleType: 'decimal' }}>
              {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
            </ol>
          )
        } else {
          listElement = null
        }
        
        // Wrap list in full-width if currently in full-width mode
        if (listElement) {
          if (isFullWidth) {
            elements.push(wrapFullWidth(listElement, `list-fullwidth-${index}`))
          } else {
            elements.push(listElement)
          }
        }
        
        currentList = []
        listType = null
      }
      
      // Toggle full-width mode (affects all blocks)
      isFullWidth = !isFullWidth
      return // Don't render the marker itself
    }

    // Handle list grouping
    if (block.type === 'bulleted_list_item') {
      if (listType !== 'bulleted') {
        if (currentList.length > 0) {
          const listElement = (
            <ul key={`list-${index}`} className="space-y-2 pl-6 mb-6" style={{ listStyle: 'none' }}>
              {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
            </ul>
          )
          // Wrap list in full-width if in full-width mode
          if (isFullWidth) {
            elements.push(wrapFullWidth(listElement, `list-fullwidth-${index}`))
          } else {
            elements.push(listElement)
          }
        }
        currentList = []
        listType = 'bulleted'
      }
      currentList.push(block)
      return
    }

    // Check for numbered list items (case-insensitive and handle variations)
    // Check the type field first, then check for the numbered_list_item property
    const hasNumberedProperty = (block as any).numbered_list_item !== undefined
    const isNumberedListItem = block.type === 'numbered_list_item' || 
                               block.type === 'numberedList' ||
                               hasNumberedProperty
    
    if (isNumberedListItem) {
      if (listType !== 'numbered') {
        // Flush previous list if it exists
        if (currentList.length > 0) {
          const firstItem = currentList[0]
          const firstItemType = firstItem?.type
          const hasNumberedProp = (firstItem as any)?.numbered_list_item !== undefined
          const prevIsNumbered = firstItemType === 'numbered_list_item' || 
                                firstItemType === 'numberedList' ||
                                hasNumberedProp
          
          if (listType === 'bulleted' || (!prevIsNumbered && (firstItemType === 'bulleted_list_item' || (firstItem as any)?.bulleted_list_item !== undefined))) {
            const listElement = (
              <ul key={`list-${index}`} className="space-y-2 pl-6 mb-6" style={{ listStyle: 'none' }}>
                {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
              </ul>
            )
            // Wrap list in full-width if in full-width mode
            if (isFullWidth) {
              elements.push(wrapFullWidth(listElement, `list-fullwidth-${index}`))
            } else {
              elements.push(listElement)
            }
          } else if (prevIsNumbered) {
            const listElement = (
              <ol key={`list-${index}`} className="list-decimal list-outside pl-6 space-y-2 mb-6" style={{ listStyleType: 'decimal' }}>
                {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
              </ol>
            )
            // Wrap list in full-width if in full-width mode
            if (isFullWidth) {
              elements.push(wrapFullWidth(listElement, `list-fullwidth-${index}`))
            } else {
              elements.push(listElement)
            }
          }
        }
        currentList = []
        listType = 'numbered'
      }
      currentList.push(block)
      return
    }

    // Flush current list if we hit a non-list block
    if (currentList.length > 0) {
      // Determine list type by checking the first item's type and properties as a safeguard
      const firstItem = currentList[0]
      const firstItemType = firstItem?.type
      const hasNumberedProperty = (firstItem as any)?.numbered_list_item !== undefined
      const isNumberedList = listType === 'numbered' || 
                            firstItemType === 'numbered_list_item' || 
                            firstItemType === 'numberedList' ||
                            hasNumberedProperty
      
      let listElement: React.ReactNode
      
      if (listType === 'bulleted' || (!isNumberedList && (firstItemType === 'bulleted_list_item' || (firstItem as any)?.bulleted_list_item !== undefined))) {
        listElement = (
          <ul key={`list-${index}`} className="space-y-2 pl-6 mb-6" style={{ listStyle: 'none' }}>
            {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
          </ul>
        )
      } else if (isNumberedList) {
        listElement = (
          <ol key={`list-${index}`} className="list-decimal list-outside pl-6 space-y-2 mb-6" style={{ listStyleType: 'decimal' }}>
            {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
          </ol>
        )
      } else {
        // Fallback: if we can't determine the type, check if ANY item is numbered
        const hasAnyNumbered = currentList.some(b => 
          b.type === 'numbered_list_item' || 
          b.type === 'numberedList' ||
          (b as any).numbered_list_item !== undefined
        )
        if (hasAnyNumbered) {
          listElement = (
            <ol key={`list-${index}`} className="list-decimal list-outside pl-6 space-y-2 mb-6" style={{ listStyleType: 'decimal' }}>
              {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
            </ol>
          )
        } else {
          // Default to bulleted if we can't determine
          listElement = (
            <ul key={`list-${index}`} className="space-y-2 pl-6 mb-6" style={{ listStyle: 'none' }}>
              {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
            </ul>
          )
        }
      }
      
      // Wrap list in full-width if in full-width mode
      if (isFullWidth) {
        elements.push(wrapFullWidth(listElement, `list-fullwidth-${index}`))
      } else {
        elements.push(listElement)
      }
      
      currentList = []
      listType = null
    }

    // Render the block
    // If in full-width mode, wrap all blocks in full-width container
    // Note: Images inside a column_list should not be individually full-width
    if (isFullWidth) {
      // Special handling for images - they have their own full-width logic
      if (block.type === 'image' && !insideColumnList) {
        // Mark image as full-width (it handles its own styling)
        ;(block as any).__fullWidth = true
        const rendered = renderNotionBlock(block, allImages, onImageClick)
        if (rendered) {
          elements.push(rendered)
        }
      } else if (block.type === 'column_list') {
        // Check if column_list contains images
        const columnBlocks = (block as any).children || []
        const hasImages = columnBlocks.some((col: NotionBlock) => {
          const children = (col as any).children || []
          return children.some((child: NotionBlock) => child.type === 'image')
        })
        
        if (hasImages) {
          // Mark column_list as full-width (it handles its own styling)
          ;(block as any).__fullWidth = true
          const rendered = renderNotionBlock(block, allImages, onImageClick)
          if (rendered) {
            elements.push(rendered)
          }
        } else {
          // Wrap column_list in full-width container when in full-width mode
          const rendered = renderNotionBlock(block, allImages, onImageClick)
          if (rendered) {
            elements.push(wrapFullWidth(rendered, `fullwidth-${block.id || index}`))
          }
        }
      } else if (block.type === 'image' && insideColumnList) {
        // Image inside column_list - render normally without full-width
        const rendered = renderNotionBlock(block, allImages, onImageClick)
        if (rendered) {
          elements.push(rendered)
        }
      } else {
        // Wrap all other blocks in full-width container
        const rendered = renderNotionBlock(block, allImages, onImageClick)
        if (rendered) {
          elements.push(wrapFullWidth(rendered, `fullwidth-${block.id || index}`))
        }
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
    // Determine list type by checking the first item's type and properties as a safeguard
    const firstItem = currentList[0]
    const firstItemType = firstItem?.type
    const hasNumberedProperty = (firstItem as any)?.numbered_list_item !== undefined
    const isNumberedList = listType === 'numbered' || 
                          firstItemType === 'numbered_list_item' || 
                          firstItemType === 'numberedList' ||
                          hasNumberedProperty
    
    let listElement: React.ReactNode
    
    if (listType === 'bulleted' || (!isNumberedList && (firstItemType === 'bulleted_list_item' || (firstItem as any)?.bulleted_list_item !== undefined))) {
      listElement = (
        <ul key="list-final" className="space-y-2 pl-6 mb-6" style={{ listStyle: 'none' }}>
          {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
        </ul>
      )
    } else if (isNumberedList) {
      listElement = (
        <ol key="list-final" className="list-decimal list-outside pl-6 space-y-2 mb-6" style={{ listStyleType: 'decimal' }}>
          {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
        </ol>
      )
    } else {
      // Fallback: if we can't determine the type, check if ANY item is numbered
      const hasAnyNumbered = currentList.some(b => 
        b.type === 'numbered_list_item' || 
        b.type === 'numberedList' ||
        (b as any).numbered_list_item !== undefined
      )
      if (hasAnyNumbered) {
        listElement = (
          <ol key="list-final" className="list-decimal list-outside pl-6 space-y-2 mb-6" style={{ listStyleType: 'decimal' }}>
            {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
          </ol>
        )
      } else {
        // Default to bulleted if we can't determine
        listElement = (
          <ul key="list-final" className="space-y-2 pl-6 mb-6" style={{ listStyle: 'none' }}>
            {currentList.map(b => renderNotionBlock(b, allImages, onImageClick))}
          </ul>
        )
      }
    }
    
    // Wrap list in full-width if in full-width mode
    if (isFullWidth) {
      elements.push(wrapFullWidth(listElement, 'list-final-fullwidth'))
    } else {
      elements.push(listElement)
    }
  }

  return <>{elements}</>
}

