import React from "react"
import Image from "next/image"

interface Brand {
  name: string
  logo: string
}

interface LogoMarqueeProps {
  brands: Brand[]
}

const LogoMarquee: React.FC<LogoMarqueeProps> = ({ brands }) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap justify-center gap-8 md:gap-12">
      {brands.map((brand, index) => (
        <div key={index} className="w-40 h-40 flex items-center justify-center p-4 flex-shrink-0">
          <Image
            src={brand.logo || "/images/placeholder.svg"}
            alt={brand.name}
            width={160}
            height={160}
            className="object-contain w-full h-auto max-w-[160px]"
          />
        </div>
      ))}
    </div>
  )
}

export default LogoMarquee
