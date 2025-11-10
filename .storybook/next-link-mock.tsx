import React from 'react'

// Mock Next.js Link component for Storybook
const NextLink = ({ href, children, className, ...props }: any) => {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  )
}

export default NextLink

