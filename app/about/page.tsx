"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function About() {
  const [currentPrinciple, setCurrentPrinciple] = useState(0)

  const principles = [
    {
      title: "RESULTS DRIVEN",
      description:
        "Being a results driver means that I am focused on achieving tangible outcomes and making measurable progress towards goals. I prioritize actions that lead to concrete results, whether it's in project delivery, problem-solving, or decision-making. By staying focused on outcomes and driving towards success, I aim to create meaningful impact and drive continuous improvement in all aspects of my work.",
    },
    {
      title: "DONE IS BETTER THAN PERFECT",
      description:
        "I believe that achieving completion is more valuable than striving for an unattainable ideal. Agility and iteration is key. I believe in putting forward a quality product but not at the expense of putting in front of users and getting results to iterate. Fail fast. High increase in productivity.",
    },
    {
      title: "SERVANT LEADERSHIP",
      description:
        "I embody a holistic approach to guiding and empowering others. By leading with empathy, serving the needs of my team, and prioritizing their growth and well-being, I foster a culture of support, collaboration, and inspiration. This approach transcends traditional management by emphasizing vision, empowerment, and nurturing individual growth, inspiring others to achieve their full potential and creating a lasting, positive impact within the",
    },
  ]

  const nextPrinciple = () => {
    setCurrentPrinciple((prev) => (prev + 1) % principles.length)
  }

  const prevPrinciple = () => {
    setCurrentPrinciple((prev) => (prev - 1 + principles.length) % principles.length)
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#151515]">
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h1 className="text-5xl font-bold mb-8">Get to Know Me</h1>
              <p className="text-lg text-[#595959] leading-relaxed">
                I'm a designer living in Columbia South Carolina. I have over 10 years of experience in the design
                industry. I started out as a graphic designer, but realized that I loved web design. I love seeing
                people use my designs, versus looking at them. I am currently employed by Red Ventures working as a
                Senior Product esigner, but work on freelance projects on the side. If you have a project you would like
                to start, and like my work, send me a message! I would love to help you with your design needs.
              </p>
            </div>
            <div className="relative aspect-square w-3/4 mx-auto">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Me.jpg-CqWEFIxHmyfL4r5Wy26hPc406zTrvn.jpeg"
                alt="Grant Crowder headshot"
                fill
                sizes="(max-width: 768px) 75vw, 56.25vw"
                className="object-cover rounded-3xl"
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-purple-900 text-white py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-16">Skill Set</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-6">SKILLS</h3>
                <ul className="space-y-3">
                  <li>UX/UI Design</li>
                  <li>Prototyping</li>
                  <li>Design Systems</li>
                  <li>Communication</li>
                  <li>Wire-framing</li>
                  <li>Design Leadership</li>
                  <li>Developing Talent</li>
                  <li>Accessible Design</li>
                  <li>Light HTML & CSS</li>
                  <li>Presentation Design</li>
                  <li>Mobile Design</li>
                  <li>Logo Design</li>
                  <li>Branding</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">TOOLS</h3>
                <ul className="space-y-3">
                  <li>Figma/Figjam</li>
                  <li>Sketch</li>
                  <li>Photoshop</li>
                  <li>Illustrator</li>
                  <li>PowerPoint</li>
                  <li>Google Slides</li>
                  <li>After Effects</li>
                  <li>Miro</li>
                  <li>Jira</li>
                  <li>Outlook</li>
                  <li>Asana</li>
                  <li>Notion</li>
                  <li>Slack</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">FRAMEWORKS</h3>
                <ul className="space-y-3">
                  <li>Agile</li>
                  <li>Design Thinking</li>
                  <li>Human Centered Design</li>
                  <li>Design Sprints</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">MISSION AND VALUES</h3>
                <p className="leading-relaxed">
                  I strive to design meaningful solutions through my creativity and technical skills, always producing
                  high-quality work that reflects my clients' goals. I believe in the power of good design to transform
                  and am committed to using my talents to make a positive impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Guiding Principles Section */}
        <section className="py-24 bg-[#151515] text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-16">Guiding Principles</h2>
            <div className="relative">
              <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">{principles[currentPrinciple].title}</h3>
                  <p className="leading-relaxed">{principles[currentPrinciple].description}</p>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={prevPrinciple}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Previous principle"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="flex gap-2">
                    {principles.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentPrinciple ? "bg-white" : "bg-white/30"}`}
                        onClick={() => setCurrentPrinciple(index)}
                        aria-label={`Go to principle ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextPrinciple}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Next principle"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
