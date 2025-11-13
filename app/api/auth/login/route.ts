import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
      console.error('Supabase not configured: NEXT_PUBLIC_SUPABASE_URL is missing or using placeholder')
      return NextResponse.json(
        { success: false, error: 'Server configuration error. Please contact the site administrator.' },
        { status: 500 }
      )
    }

    // Check if password exists in site_passwords table
    const { data: passwordRecord, error: passwordError } = await supabase
      .from('site_passwords')
      .select('id, password, name, identifier')
      .eq('password', password)
      .single()

    if (passwordError) {
      console.error('Supabase query error:', passwordError)
      // Check if it's a connection/table issue
      if (passwordError.code === 'PGRST116' || passwordError.message?.includes('relation') || passwordError.message?.includes('does not exist')) {
        return NextResponse.json(
          { success: false, error: 'Database not configured. Please contact the site administrator.' },
          { status: 500 }
        )
      }
      return NextResponse.json(
        { success: false, error: 'Incorrect password' },
        { status: 401 }
      )
    }

    if (!passwordRecord) {
      return NextResponse.json(
        { success: false, error: 'Incorrect password' },
        { status: 401 }
      )
    }

    // Log the access in site_access_logs table
    const { error: logError } = await supabase
      .from('site_access_logs')
      .insert({
        password_id: passwordRecord.id,
        identifier: passwordRecord.identifier || passwordRecord.name || 'Unknown',
        accessed_at: new Date().toISOString(),
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
      })

    // Don't fail login if logging fails, just log the error
    if (logError) {
      console.error('Failed to log access:', logError)
    }

    // Set a cookie to indicate authentication
    const response = NextResponse.json({ 
      success: true,
      identifier: passwordRecord.identifier || passwordRecord.name 
    })
    const expires = new Date()
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days
    
    response.cookies.set('site_access', 'granted', {
      expires,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

