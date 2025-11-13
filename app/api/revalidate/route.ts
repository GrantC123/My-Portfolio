import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Optional: Add security with a secret token
    const authHeader = request.headers.get('authorization')
    const secret = process.env.REVALIDATE_SECRET
    
    // If secret is set, require it
    if (secret && authHeader !== `Bearer ${secret}`) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get the slug from request body or query params
    const body = await request.json().catch(() => ({}))
    const slug = body.slug || request.nextUrl.searchParams.get('slug')
    const revalidateAll = body.revalidateAll === true

    if (revalidateAll || !slug) {
      // Revalidate all project pages and homepage
      revalidatePath('/project', 'page')
      revalidatePath('/', 'page')
      
      return NextResponse.json({ 
        revalidated: true,
        paths: ['/project', '/'],
        message: 'All pages revalidated',
        now: Date.now()
      })
    } else {
      // Revalidate specific project page
      revalidatePath(`/project/${slug}`, 'page')
      // Also revalidate homepage in case featured projects changed
      revalidatePath('/', 'page')
      
      return NextResponse.json({ 
        revalidated: true,
        path: `/project/${slug}`,
        message: `Project "${slug}" revalidated`,
        now: Date.now()
      })
    }
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json(
      { 
        message: 'Error revalidating',
        error: err instanceof Error ? err.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Allow GET for easy testing
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Use POST to revalidate pages',
    usage: {
      revalidateAll: 'POST /api/revalidate with body: {"revalidateAll": true}',
      revalidateSpecific: 'POST /api/revalidate with body: {"slug": "your-project-slug"}'
    }
  })
}

