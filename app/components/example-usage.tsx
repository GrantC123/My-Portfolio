import Image from 'next/image'

export default function ExampleUsage() {
  return (
    <div>
      {/* Method 1: Using images from the public folder */}
      <Image
        src="/images/portfolio-1.jpg" // This will look for the image in public/images/portfolio-1.jpg
        alt="Portfolio project 1"
        width={800}
        height={600}
        className="rounded-2xl"
      />

      {/* Method 2: Using external URLs */}
      <Image
        src="https://example.com/your-image.jpg"
        alt="External image"
        width={800}
        height={600}
        className="rounded-2xl"
      />
    </div>
  )
}
