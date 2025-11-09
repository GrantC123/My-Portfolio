import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request,
  })

  const { pathname } = request.nextUrl

  // Check if Supabase environment variables are set
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // If env vars are missing, allow login page only
    if (pathname === '/login') {
      return response
    }
    // Redirect all other routes to login for security
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // Provide fallback values during build time if env vars are missing
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll().map(cookie => ({
              name: cookie.name,
              value: cookie.value,
            }))
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    // Use getUser() instead of getSession() - it's more reliable for middleware
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // If user is authenticated and trying to access login, redirect to home
    if (user && pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Protect all routes except login - redirect to login if not authenticated
    if (!user && pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Return the response (which may have updated session cookies)
    return response
  } catch (error) {
    // If there's an error with Supabase, allow login page, redirect others
    console.error('Middleware Supabase error:', error)
    if (pathname === '/login') {
      return response
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes (if you have any)
     * - public assets (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}

