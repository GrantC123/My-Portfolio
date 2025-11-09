import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const imagesDirectory = join(process.cwd(), 'public', 'images', 'editorial')
    const files = await readdir(imagesDirectory)
    
    // Filter for image files and exclude the hero image
    const imageFiles = files
      .filter(file => {
        const ext = file.toLowerCase()
        return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png') || ext.endsWith('.webp')
      })
      .filter(file => file !== 'editorial-imagery-header.jpg') // Exclude hero
      .map(file => `/images/editorial/${file}`)
    
    // Shuffle the array for randomization
    const shuffled = [...imageFiles].sort(() => Math.random() - 0.5)
    
    return NextResponse.json({ images: shuffled })
  } catch (error) {
    console.error('Error reading editorial images:', error)
    return NextResponse.json({ images: [] }, { status: 500 })
  }
}

