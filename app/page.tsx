import Image from "next/image"
import Link from "next/link"
import { projects, testimonials } from "./data"
import AnimatedText from "./components/AnimatedText"
import LogoMarquee from "./components/LogoMarquee"
import TestimonialsSection from "./components/TestimonialsSection"

export default function Home() {
  const brands = [
    { name: "Bankrate", logo: "bankrate-logo" },
    {
      name: "The Points Guy",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/640px-TPG.PGN-1hIGsdrTHkKSUxa3bJj4H0r3MdmYkJ.png",
    },
    {
      name: "American Express",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/American_Express_logo_(2018).svg-ShBWQyM4NHuudpThqhE4IOxVcqLKYi.png",
    },
    {
      name: "TIME",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Time_Magazine_logo.svg-S6g0Pvj7IFYH2S9Tjan6PzXECBYBTd.png",
    },
    {
      name: "Audi",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_audi.jpg-CqrNCrtJjG7LkTgQIROG2YNXod38Mi.jpeg",
    },
    {
      name: "USA Today",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/USA%20Today%20logo-rV3crsLS5Dbg3oxudkgoSdmeQFVwlR.png",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#151515]">
      {/* Hero Section - Full width background */}
      <section className="w-full bg-purple-900 py-24">
        <div className="container mx-auto px-4 flex-grow flex items-center">
          <div className="flex flex-col justify-between h-full">
            <h1 className="flex flex-col justify-between h-full">
              <p className="text-[38.5px] md:text-[57.5px] leading-tight mt-8 mb-16">
                <span className="text-purple-300">I'm Grant</span>
                <AnimatedText
                  text=" — Senior Product Designer and creative leader driving results through strategic design and team empowerment."
                  className="text-white"
                />
              </p>
              <Link
                href="#work"
                className="group flex items-center self-start transition-transform hover:scale-105"
                aria-label="View My Work"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Button-erM9SRUcTOdDYna12TDDic8MpXB3Zq.svg"
                  alt="View My Work"
                  width={180}
                  height={48}
                  className="h-auto"
                />
              </Link>
            </h1>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="py-24 bg-purple-50" id="work">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 flex items-center gap-4">
            My work
            <span className="w-3 h-3 rounded-full bg-purple-600" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <Link href={`/project/${project.slug}`} key={index} className="block w-full">
                <div className="bg-white rounded-3xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                  <div className="relative mb-4 flex-shrink-0">
                    <div className="bg-[#f1f1f1] aspect-video relative rounded-2xl overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#151515] text-white px-4 py-2 rounded-lg text-sm font-medium tracking-[2px]">
                        {project.category === "VISUAL DESIGN" ? "GALLERY" : "CASE STUDY"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className="text-sm text-[#595959] mb-2">{project.category}</div>
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <p className="text-[#333333] mb-6 flex-grow line-clamp-3">{project.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 flex items-center gap-4">
            Brands I've worked with
            <span className="w-3 h-3 rounded-full bg-purple-600" />
          </h2>
          <LogoMarquee brands={brands} />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />
    </div>
  )
}
