"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "../../data"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#151515]">
      <header className="py-4">
        <div className="container mx-auto px-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-[#595959] hover:text-[#450BEC] transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 text-[#595959]">/</span>
                <span className="text-[#151515]">{project.title}</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
        <p className="text-xl text-[#595959] mb-8">{project.category}</p>

        <div className="mb-16">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={1200}
            height={600}
            className="rounded-2xl w-full object-cover"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-[#333333] mb-4">
              Founded in 1976 as the Bank Rate Monitor, a print publisher for the banking industry, Bankrate has a long
              track record of helping people make smart financial decisions.
            </p>
            <p className="text-[#333333] mb-4">
              Bankrate has maintained this reputation over four decades by prioritizing facts and experience over hype
              and hearsay, and quickly responding to economic trends that offer our users a more relevant experience.
            </p>
            <p className="text-[#333333] mb-4">
              From our product comparison tools to award-winning editorial content, we provide objective information and
              actionable next steps to help you make informed decisions. It's why over 100 million people put their
              trust in us every year.
            </p>
            <p className="text-[#333333] mb-8">
              In November 2017, Bankrate was acquired by Red Ventures for approximately $1.24 billion. This acquisition
              allowed Bankrate to leverage Red Ventures' technology and digital marketing expertise to enhance its
              consumer finance offerings. Following the acquisition, Bankrate expanded into the UK market in January
              2018.
            </p>

            <h2 className="text-2xl font-bold mb-4">Challenge</h2>
            <p className="text-[#333333] mb-4">{project.challenge}</p>
            <p className="text-[#333333] mb-4">
              Bankrate has a wealth of underutilized proprietary data. We want to increase the likelihood of journalists
              and content creators backlinking to Bankrate. As part of the emerging strategies work ABT wants to include
              five different charts on the Bankrate Data Center page. The charts will help to illustrate different data
              points related to the Credit Cards vertical. These charts fall into three different categories:
            </p>
            <ul className="list-disc list-inside mb-4 text-[#333333]">
              <li>
                Proprietary Survey Data: This will be a chart showing the trend of three different data points from
                Bankrate surveys
              </li>
              <li>Product Rate Trend: This will be a chart showing the average credit card interest rate over time</li>
              <li>
                Proprietary Index: Using a combination of partner provided credit card data this chart will illustrate
                the current Credit Card 'Borrowing Landscape as a index score (methodology TBD)
              </li>
            </ul>
            <p className="text-[#333333] mb-8">
              The first iteration of this work will focus on data related to the Credit Cards vertical. The intention
              will be to have a similar suite of charts for all of the verticals.
            </p>

            <h2 className="text-2xl font-bold mb-4">Solution</h2>
            <p className="text-[#333333] mb-8">{project.solution}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Project Details</h2>
            <ul className="space-y-4">
              <li>
                <strong className="block text-[#595959]">Client</strong>
                {project.client}
              </li>
              <li>
                <strong className="block text-[#595959]">Timeline</strong>
                {project.timeline}
              </li>
              <li>
                <strong className="block text-[#595959]">Role</strong>
                {project.role}
              </li>
              <li>
                <strong className="block text-[#595959]">Deliverables</strong>
                {project.deliverables}
              </li>
            </ul>
          </div>
        </div>

        {project.slug === "bankrate-data-center" && (
          <>
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="mt-16 -mx-4 md:-mx-8 lg:-mx-16 w-full cursor-zoom-in"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bankrate-DC-Cover-7B6cx26SzmCuDaMgE8FUqZ8XyQoso5.png"
                alt="Bankrate Data Center interface showing the homepage with search functionality and data visualization"
                width={1920}
                height={1080}
                className="w-full"
              />
              <div className="mt-8 w-full overflow-hidden">
                <iframe
                  style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                  width="100%"
                  height="450"
                  src="https://embed.figma.com/proto/02uA4cdzWuSSIye9lzyTKo/Grant-Crowder---Portfolio?page-id=3490%3A90651&node-id=3581-1994&viewport=-129%2C865%2C0.2&scaling=scale-down-width&content-scaling=fixed&embed-host=share"
                  allowFullScreen
                  className="max-w-full"
                />
              </div>
            </button>
            {isLightboxOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={() => setIsLightboxOpen(false)}
              >
                <div className="max-w-4xl w-full h-auto">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bankrate-DC-Cover-7B6cx26SzmCuDaMgE8FUqZ8XyQoso5.png"
                    alt="Bankrate Data Center interface showing the homepage with search functionality and data visualization"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
