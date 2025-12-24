import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Keepalive endpoint to ping Supabase and prevent project pausing
 * Called by Vercel cron job hourly
 */
export async function GET() {
  try {
    const supabase = await createClient()
    
    // Perform a simple query to keep the connection alive
    const { error } = await supabase
      .from('site_passwords')
      .select('id')
      .limit(1)

    if (error) {
      console.log('Keepalive ping completed:', error.message)
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString()
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

