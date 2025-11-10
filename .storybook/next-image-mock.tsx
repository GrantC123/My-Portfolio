import React from 'react'

// Mock Next.js Image component for Storybook
const NextImage = ({ src, alt, width, height, fill, className, priority, ...props }: any) => {
  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        {...props}
      />
    )
  }
  
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  )
}

// Export as default to match Next.js Image export
export default NextImage

