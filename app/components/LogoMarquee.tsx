import type React from "react"
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
    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
      {brands.map((brand, index) => (
        <div key={index} className="w-32 h-32 flex items-center justify-center p-4">
          {brand.logo === "bankrate-logo" ? (
            <svg
              width="327"
              height="64"
              viewBox="0 0 327 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[120px]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.2282 27.0855C31.8159 27.6132 31.3211 28.141 30.8263 28.6281C32.2694 29.4401 33.63 30.4144 34.7432 31.5511C38.1241 34.9611 39.9795 39.4673 39.897 44.1358C39.9795 49.0885 37.9592 53.8382 34.2897 57.2889C30.6202 60.7395 25.6313 62.607 20.5188 62.404H0.851929V0.49513H17.5502C22.3741 0.332748 27.0332 2.07838 30.4965 5.32605C33.4651 8.24896 35.238 12.1056 35.4854 16.1652C35.774 20.0624 34.6195 23.919 32.2282 27.0855ZM17.5502 7.72121H8.39706V25.9488H20.1477C24.8479 25.2181 28.2288 21.2397 27.9814 16.6523C27.6516 12.1868 24.312 7.72121 17.5502 7.72121ZM8.35584 55.2185H20.5188C28.7648 55.2185 32.4755 49.2509 32.4755 44.1358C32.4755 39.0207 29.0534 33.1343 19.4468 33.1343H8.35584V55.2185Z"
                fill="#151515"
              />
            </svg>
          ) : (
            <Image
              src={brand.logo || "/placeholder.svg"}
              alt={brand.name}
              width={128}
              height={128}
              className="object-contain w-full h-auto max-w-[120px]"
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default LogoMarquee
