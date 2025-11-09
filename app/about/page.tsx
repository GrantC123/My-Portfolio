"use client"

import Image from "next/image"
import Link from "next/link"
import { Download } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const designSkills = [
  { name: "User Research & Analysis", highlighted: false },
  { name: "Wireframing & Information Architecture", highlighted: true },
  { name: "Interactive Prototyping", highlighted: true },
  { name: "User Testing & Validation", highlighted: true },
  { name: "UI/UX Design", highlighted: true },
  { name: "Interaction Design", highlighted: false },
]

const designTools = [
  { name: "Figma suite of products", highlighted: false },
  { name: "Adobe Photoshop", highlighted: false },
  { name: "Adobe Illustrator", highlighted: false },
  { name: "Userlytics/Usertesting.com", highlighted: false },
  { name: "Cursor ai", highlighted: false },
]

const leadership = [
  { name: "Hiring/team resourcing", highlighted: false },
  { name: "Management (team of 3 designers)", highlighted: false },
  { name: "Mentorship", highlighted: false },
  { name: "Coaching", highlighted: false },
  { name: "Public speaking", highlighted: false },
]

const technicalSkills = [
  { name: "HTML", highlighted: false },
  { name: "Tailwind CSS", highlighted: false },
  { name: "Javascript, JSX", highlighted: false },
  { name: "Web components", highlighted: false },
  { name: "Web accessibility", highlighted: false },
]

const philosophies = [
  {
    title: "Servant Leadership",
    description:
      "I embody a holistic approach to guiding and empowering others. By leading with empathy, serving the needs of my team, and prioritizing their growth and well-being, I foster a culture of support, collaboration, and inspiration. This approach transcends traditional management by emphasizing vision, empowerment, and nurturing individual growth, inspiring others to achieve their full potential and creating a lasting, positive impact within the organization.",
  },
  {
    title: "Done is better than perfect",
    description:
      "I believe that achieving completion is more valuable than striving for an unattainable ideal. Agility and iteration is key. I believe in putting forward a quality product but not at the expense of putting in front of users and getting results to iterate. Fail fast. High increase in productivity.",
  },
  {
    title: "Results Driven",
    description:
      "Being a results driver means that I am focused on achieving tangible outcomes and making measurable progress towards goals. I prioritize actions that lead to concrete results, whether it's in project delivery, problem-solving, or decision-making. By staying focused on outcomes and driving towards success, I aim to create meaningful impact and drive continuous improvement in all aspects of my work.",
  },
  {
    title: "Business + Design Focused",
    description:
      "Being both business and design focused entails striking a balance between creative innovation and strategic thinking. It involves understanding the needs of the business, aligning design solutions with organizational goals, and demonstrating the value of design in driving business success. By integrating business acumen with design expertise, I aim to create solutions that not only delight users but also contribute to the overall success and growth of the organization.",
  },
  {
    title: "Consistency is King",
    description:
      '"Consistency is king" serves as my design mantra, emphasizing the importance of maintaining a cohesive and harmonious visual language across all aspects of a project. By upholding consistency in design elements such as layout, typography, color schemes, and user interactions, I strive to enhance user experience, build trust, and create a polished and unified product that resonates with its audience.',
  },
  {
    title: "Testing & Iteration",
    description:
      'Recognizing that "I am not the user" is a fundamental principle that reminds me to approach design and decision-making from the perspective of the end user. By setting aside personal preferences and biases, I can better empathize with the needs, preferences, and experiences of the actual users, leading to more user-centric and effective solutions.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-zinc-950">
          <div className="container mx-auto px-6 md:px-36">
            <div className="flex flex-col md:flex-row gap-16 items-center justify-center max-w-[1152px] mx-auto">
              <div className="flex flex-col gap-8 w-full md:w-[576px]">
                <div className="flex flex-col gap-6">
                  <p className="text-lg leading-7 text-zinc-400">
                    I am a designer based in Columbia, South Carolina, with a decade of experience in the design field. I
                    began my career as a graphic designer but soon discovered my passion for web design. I find joy in
                    watching users engage with my designs rather than just viewing them. There's a unique thrill in crafting
                    experiences that people interact with daily.
                  </p>
                  <p className="text-lg leading-7 text-zinc-400">
                    Currently, I work as a Senior Product Designer at Red Ventures, while also taking on freelance projects
                    in my spare time.
                  </p>
                </div>
                <Button
                  asChild
                  variant="primary"
                  className="rounded-lg px-6 py-4 h-auto w-fit text-lg leading-[27px]"
                >
                  <Link href="/resume" className="flex items-center justify-center gap-2.5">
                    <span>Download my resume</span>
                    <Download className="w-6 h-6" />
                  </Link>
                </Button>
              </div>
              <div className="relative w-full md:w-[576px] h-[640px] rounded-xl overflow-hidden">
                <Image
                  src="/grant-headshot.jpg"
                  alt="Grant Crowder headshot"
                  fill
                  sizes="(max-width: 768px) 100vw, 576px"
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Tools Section */}
        <section className="py-20 bg-zinc-950">
          <div className="container mx-auto px-6 md:px-36">
            <div className="flex flex-col gap-16 max-w-[1280px] mx-auto">
              <h2 className="font-display font-bold text-[48px] leading-[48px] text-white text-center">
                Skills & Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Design Skills Card */}
                <Card className="bg-zinc-800 border-zinc-600 p-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-zinc-700 border border-zinc-600 rounded-lg w-12 h-12 flex items-center justify-center">
                      <span className="text-xl">🎨</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl leading-8 text-white">Design Skills</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {designSkills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-xl">
                        <div
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            skill.highlighted ? "bg-coral-300" : "bg-zinc-400"
                          }`}
                        />
                        <p className="text-lg leading-7 text-zinc-400">{skill.name}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Design Tools Card */}
                <Card className="bg-zinc-800 border-zinc-600 p-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-zinc-700 border border-zinc-600 rounded-lg w-12 h-12 flex items-center justify-center">
                      <span className="text-xl">⚡</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl leading-8 text-white">Design Tools</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {designTools.map((tool, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-xl">
                        <div className="w-2 h-2 rounded-full shrink-0 bg-zinc-400" />
                        <p className="text-lg leading-7 text-zinc-400">{tool.name}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Leadership Card */}
                <Card className="bg-zinc-800 border-zinc-600 p-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-zinc-700 border border-zinc-600 rounded-lg w-12 h-12 flex items-center justify-center">
                      <span className="text-xl">⚡</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl leading-8 text-white">Leadership</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {leadership.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-xl">
                        <div className="w-2 h-2 rounded-full shrink-0 bg-zinc-400" />
                        <p className="text-lg leading-7 text-zinc-400">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Technical Skills Card */}
                <Card className="bg-zinc-800 border-zinc-600 p-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-zinc-700 border border-zinc-600 rounded-lg w-12 h-12 flex items-center justify-center">
                      <span className="text-xl">⚡</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl leading-8 text-white">Technical Skills</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {technicalSkills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-xl">
                        <div className="w-2 h-2 rounded-full shrink-0 bg-zinc-400" />
                        <p className="text-lg leading-7 text-zinc-400">{skill.name}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Giving Back Section */}
        <section className="py-20 bg-zinc-950">
          <div className="container mx-auto px-6 md:px-36">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-[1280px] mx-auto">
              <div className="flex flex-col gap-8 w-full md:flex-1">
                <h2 className="font-display font-bold text-[48px] leading-[48px] text-white">Giving back</h2>
                <p className="text-lg leading-7 text-zinc-400">
                  Nomatter where I am, or what I do, I want to improve more than just projects. I want to improve those I
                  work with and the environment I work in. I have spoken at company creative conferences multiple times.
                  Here I spoke on "Navigating Creative Career Paths" sharing my personal journey along with other creatives
                  at Red Ventures.
                </p>
              </div>
              <div className="relative w-full md:w-[592px] h-[312px] rounded-lg overflow-hidden">
                <Image
                  src="/creative-spark-4.png"
                  alt="Creative Spark Conference - Navigating Creative Career Paths"
                  fill
                  sizes="(max-width: 768px) 100vw, 592px"
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Design Philosophies Section */}
        <section className="py-20 bg-zinc-950">
          <div className="container mx-auto px-6 md:px-36">
            <div className="flex flex-col gap-10 items-center max-w-[1280px] mx-auto">
              <div className="flex flex-col gap-6 items-center">
                <h2 className="font-display font-bold text-[48px] leading-[48px] text-white text-center">
                  Core Design Philosophies
                </h2>
                <p className="text-xl leading-7 text-white text-center">
                  The principles that guide every design decision I make
                </p>
              </div>
              <div className="w-full max-w-[793px]">
                <Accordion type="single" collapsible defaultValue="item-2" className="w-full">
                  {philosophies.map((philosophy, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index + 1}`}
                      className="border-b border-zinc-400 py-5 first:border-t-0"
                    >
                      <AccordionTrigger className="text-2xl font-display font-bold text-white hover:no-underline py-0 [&>svg]:text-coral-300">
                        {philosophy.title}
                      </AccordionTrigger>
                      {philosophy.description && (
                        <AccordionContent className="text-lg leading-7 text-zinc-400 pt-6">
                          {philosophy.description}
                        </AccordionContent>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
