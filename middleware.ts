import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for site access cookie
  const siteAccess = request.cookies.get('site_access')?.value

    // If user is authenticated and trying to access login, redirect to home
  if (siteAccess === 'granted' && pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Protect all routes except login - redirect to login if not authenticated
  if (siteAccess !== 'granted' && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
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

