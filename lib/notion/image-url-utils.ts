/**
 * Normalize image URLs to ensure consistent matching between collection and rendering
 * Converts full URLs from our domain to relative paths
 */
export function normalizeImageUrl(url: string | undefined | null): string {
  if (!url) return ''
  
  // If it's already a relative path, use it directly
  if (url.startsWith('/')) {
    return url
  }
  
  // If it's a full URL pointing to localhost or our domain, extract the path
  if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname
      
      // Get current hostname (works in both server and client)
      let currentHostname: string | undefined
      if (typeof window !== 'undefined') {
        // Client-side: use window.location
        currentHostname = window.location.hostname
      } else {
        // Server-side: use environment variable or default
        currentHostname = process.env.NEXT_PUBLIC_SITE_URL 
          ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname 
          : undefined
      }
      
      // Check if it's localhost or our production domain (Vercel or custom domain)
      const isOurDomain = 
        hostname === 'localhost' || 
        hostname.includes('vercel.app') || 
        hostname.includes('vercel.com') ||
        hostname === 'grantcrowderdesign.com' ||
        hostname === 'www.grantcrowderdesign.com' ||
        hostname === currentHostname ||
        (currentHostname && hostname.includes(currentHostname)) ||
        (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.includes(hostname))
      
      if (isOurDomain) {
        // Extract just the pathname (e.g., /images/editorial/image.jpg)
        return urlObj.pathname
      }
    } catch (e) {
      // If URL parsing fails, use the original URL
    }
  }
  
  return url
}

