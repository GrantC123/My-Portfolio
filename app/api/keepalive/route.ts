import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Keepalive endpoint to ping Supabase and prevent project pausing
 * This endpoint performs a simple query to keep the Supabase connection active
 */
export async function GET() {
  try {
    const supabase = await createClient()

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Supabase not configured',
          timestamp: new Date().toISOString()
        },
        { status: 503 }
      )
    }

    // Perform a simple query to keep the connection alive
    // This queries the site_passwords table (or any existing table)
    // We'll use a lightweight query that doesn't return sensitive data
    const { data, error } = await supabase
      .from('site_passwords')
      .select('id')
      .limit(1)

    if (error) {
      // If table doesn't exist or query fails, that's okay - we still pinged Supabase
      console.log('Keepalive ping completed (query result may be empty):', error.message)
      return NextResponse.json({
        success: true,
        message: 'Keepalive ping sent',
        note: 'Query returned error but connection was attempted',
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Keepalive ping successful',
      timestamp: new Date().toISOString(),
      supabaseUrl: supabaseUrl.replace(/\/\/.*@/, '//***@') // Hide credentials in response
    })
  } catch (error) {
    console.error('Keepalive error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Also allow POST for flexibility
export async function POST() {
  return GET()
}

