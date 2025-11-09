import Image from "next/image"
import Link from "next/link"
import { projects, testimonials } from "./data"
import AnimatedText from "./components/AnimatedText"
import LogoMarquee from "./components/LogoMarquee"
import TestimonialsSection from "./components/TestimonialsSection"
import ProjectTile from "./components/ProjectTile"
import { Button } from "@/components/ui/button"

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
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      {/* Hero Section - Dark background */}
      <section className="w-full bg-zinc-950 border-b border-zinc-500 pt-16 pb-[65px] md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-36 flex-grow flex items-center">
          <div className="flex flex-col gap-6 w-full">
            <h1 className="font-display font-bold text-4xl md:text-[60px] leading-[40px] md:leading-[60px] text-white">
              <span className="text-coral-300">I'm Grant</span>
              <AnimatedText
                text=" — Senior Product Designer and Creative Leader driving results through strategic design and team empowerment."
                className="text-white"
              />
            </h1>
            <Button
              asChild
              variant="primary"
              className="rounded-lg px-6 py-4 h-12 w-full md:w-fit text-[15px] leading-[27px]"
            >
              <Link href="#work" className="flex items-center justify-center gap-2.5" aria-label="See my work">
                <span>See my work</span>
                <svg className="w-6 h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="py-20 md:py-20 bg-zinc-900" id="work">
        <div className="mx-auto max-w-[1400px] px-6 md:px-36">
          <div className="flex flex-col gap-12 w-full">
            <h2 className="font-display font-bold text-[30px] leading-[36px] text-white text-center">
              Featured Work
            </h2>
            <div className="flex flex-col gap-8">
              {projects.map((project, index) => (
                <ProjectTile key={index} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-6 md:px-52">
          <div className="flex flex-col gap-8 max-w-[1024px]">
            <h2 className="font-display font-bold text-[30px] leading-[36px] text-white text-center">
              <span className="block md:inline">Brands I've</span>{" "}
              <span className="block md:inline">worked with</span>
            </h2>
            <LogoMarquee brands={brands} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />
    </div>
  )
}
