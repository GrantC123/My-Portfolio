import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight, Instagram } from 'lucide-react'
import { useRef } from "react"

export default function Portfolio() {
  const testimonialsRef = useRef<HTMLDivElement>(null)

  const scrollTestimonials = (direction: "left" | "right") => {
    if (!testimonialsRef.current) return
    const scrollAmount = direction === "left" ? -400 : 400
    testimonialsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#151515]">
      {/* Nav */}
      <nav className="border-b border-[#f1f1f1]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0fd9f4] flex items-center justify-center text-white font-bold">
              GC
            </div>
            <span className="font-medium">GRANT CROWDER</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="#work" className="text-sm hover:text-[#0fd9f4] transition-colors">
              Work
            </Link>
            <Link href="#about" className="text-sm hover:text-[#0fd9f4] transition-colors">
              About
            </Link>
            <Link href="#resume" className="text-sm hover:text-[#0fd9f4] transition-colors">
              Resume
            </Link>
            <Link href="#instagram" className="text-sm hover:text-[#0fd9f4] transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none">
              Grant
              <br />
              Crowder
            </h1>
            <p className="text-lg text-[#595959] leading-relaxed mb-8 max-w-xl">
              I aim to create impactful solutions with my creativity and technical expertise,
              consistently delivering top-notch work aligned with my clients' objectives.
              Currently designing at Red Ventures.
            </p>
            <button 
              className="group text-lg font-medium hover:bg-transparent px-0 flex items-center"
            >
              View My Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Profile"
              width={400}
              height={400}
              className="rounded-3xl"
            />
          </div>
        </div>
      </header>

      {/* Work Section */}
      <section className="py-24 bg-[#f1f1f1]" id="work">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 flex items-center gap-4">
            My work
            <span className="w-3 h-3 rounded-full bg-[#0fd9f4]" />
          </h2>
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <Link href={`/project/${project.slug}`} key={index} className="block">
                <div className="bg-white rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative">
                      <div className="bg-[#f1f1f1] aspect-video relative rounded-2xl overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#151515] text-white px-4 py-2 rounded-lg text-sm font-medium">
                          CASE STUDY
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-sm text-[#595959] mb-2">{project.category}</div>
                      <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                      <p className="text-[#333333] mb-6">{project.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 flex items-center gap-4">
            What people are saying
            <span className="w-3 h-3 rounded-full bg-[#0fd9f4]" />
          </h2>
          <div className="relative">
            <div
              ref={testimonialsRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-[400px] flex-none snap-start bg-white rounded-3xl p-8 border border-[#f1f1f1]"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#f1f1f1] rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.title}</div>
                      <div className="text-sm text-[#595959]">{testimonial.description}</div>
                    </div>
                  </div>
                  <p className="text-[#333333]">{testimonial.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={() => scrollTestimonials("left")}
                className="w-12 h-12 rounded-full border border-[#f1f1f1] flex items-center justify-center hover:bg-[#f1f1f1] transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scrollTestimonials("right")}
                className="w-12 h-12 rounded-full border border-[#f1f1f1] flex items-center justify-center hover:bg-[#f1f1f1] transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#f1f1f1] py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm text-[#595959]">
            grantmcrowder@gmail.com
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-[#595959]">
              ©2024 Grant Crowder Design
            </div>
            <Link href="#instagram">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const projects = [
  {
    category: "PRODUCT DESIGN",
    title: "Bankrate Data Center",
    description: "A comprehensive data management solution for Bankrate, streamlining financial data analysis and reporting.",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "bankrate-data-center",
  },
  {
    category: "PRODUCT DESIGN",
    title: "Amex Design System",
    description: "A comprehensive design system for American Express, ensuring consistency across their digital products.",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "amex-design-system",
  },
  {
    category: "PRODUCT DESIGN",
    title: "Consumer JO",
    description: "A user-friendly journey orchestration tool for creating personalized customer experiences.",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "consumer-jo",
  },
  {
    category: "VISUAL DESIGN",
    title: "Editorial Imagery",
    description: "A series of striking editorial images for a leading fashion magazine's digital platform.",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "editorial-imagery",
  }
]

const testimonials = [
  {
    title: "Title",
    description: "Description",
    text: "Grant has an excellent eye for detail. He always thinks about the best experience for the user on our websites. On a recent project, he took the initiative and covered all the details with stakeholders from other functional groups to guarantee everyone would be on the same page from a UX/UI experience. We are lucky to have a person like Grant on the team who constantly pushes our designs to a better level.",
    author: "John Doe"
  },
  {
    title: "Title",
    description: "Description",
    text: "Grant has always shown a willingness and eagerness to complete tasks on time for our site and improve our process. Recently, Grant provided our team with a template for creative tickets after we had a series of tickets with unclear acceptance criteria come through. This has helped our status. Done so smooth that we are no longer needing to have such a heavy back and forth on the asks of the creative team.",
    author: "Jane Smith"
  },
  {
    title: "Title",
    description: "Description",
    text: "Grant has a strong work ethic and a keen eye for detail, which allows them to produce high-quality work in a both efficient and collaborative manner.",
    author: "Mike Johnson"
  },
  {
    title: "Title",
    description: "Description",
    text: "Grant is an expert on subject matter - he knows what he is talking about when it comes to design.",
    author: "Sarah Williams"
  }
]
