import Image from "next/image"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { projects, testimonials } from "./data"
import BlurText from "@/components/ui/blur-text"
import LogoMarquee from "./components/LogoMarquee"
import TestimonialsSection from "./components/TestimonialsSection"
import ProjectTile from "./components/ProjectTile"
import { Button } from "@/components/ui/button"
import FeaturedProjects from "./components/FeaturedProjects"
import { getFeaturedProjects } from "@/lib/notion/get-featured-projects"

export default async function Home() {
  // Fetch featured projects from Notion server-side
  const notionProjects = await getFeaturedProjects()
  const brands = [
    { name: "Allconnect", logo: "/logos/Allconnect.svg" },
    { name: "The Points Guy", logo: "/logos/The Points Guy.svg" },
    { name: "Bankrate", logo: "/logos/Bankrate.svg" },
    { name: "Audi", logo: "/logos/Audi.svg" },
    { name: "NextAdvisor", logo: "/logos/NextAdvisor.svg" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      {/* Hero Section - Dark background */}
      <section className="w-full bg-zinc-950 border-b border-zinc-500 pt-16 pb-[65px] md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-36 flex-grow flex items-center">
          <div className="flex flex-col gap-6 w-full">
            <h1 className="font-display font-bold text-4xl md:text-[60px] leading-[40px] md:leading-[60px] text-white">
              <BlurText
                text="I'm Grant — Senior Product Designer and Creative Leader driving results through strategic design and team empowerment."
                className="text-white"
                delay={150}
                animateBy="words"
                direction="top"
                highlightIndices={[0, 1]}
                highlightClassName="text-coral-300"
              />
            </h1>
            <Button
              asChild
              variant="primary"
              className="rounded-lg px-6 py-4 h-12 w-full md:w-fit text-[15px] leading-[27px]"
            >
              <Link href="#work" className="flex items-center justify-center gap-2.5" aria-label="See my work">
                <span>See my work</span>
                <ArrowDown className="w-6 h-6" />
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
            <FeaturedProjects notionProjects={notionProjects} staticProjects={projects} />
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
