import Image from "next/image"
import Link from "next/link"

interface Project {
  slug: string
  title: string
  description: string
  image?: string
  category: string
}

interface ProjectTileProps {
  project: Project
}

export default function ProjectTile({ project }: ProjectTileProps) {
  return (
    <Link href={`/project/${project.slug}`} className="block w-full">
      {/* Mobile: Stacked layout */}
      <div className="md:hidden bg-zinc-800 border border-zinc-500 rounded-lg overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300">
        <div className="h-[232px] relative w-full">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 p-8">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex justify-start">
              <span className="font-bold text-base leading-5 text-zinc-400 tracking-[1px] uppercase">
                {project.category === "VISUAL DESIGN" ? "Visual Design" : "Product Design"}
              </span>
            </div>
            <h3 className="font-display font-bold text-3xl leading-[36px] text-white">
              {project.slug === "bankrate-data-center" ? "Bankrate Data Center" : project.title}
            </h3>
            <p className="font-normal text-base leading-6 text-zinc-400">{project.description}</p>
          </div>
          <div className="border-2 border-coral-300 flex items-center justify-center gap-2.5 px-6 py-4 rounded-lg w-full">
            <span className="font-display font-bold text-base leading-normal text-white">View Project</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      {/* Desktop: Side-by-side layout */}
      <div className="hidden md:flex bg-zinc-800 border border-zinc-500 rounded-lg h-[399px] overflow-hidden hover:scale-[1.02] transition-all duration-300">
        <div className="basis-0 grow relative min-w-0">
          <div className="absolute inset-0">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover rounded-bl-2xl"
            />
          </div>
        </div>
        <div className="basis-0 grow flex flex-col justify-between items-end p-12 min-w-0">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex justify-start">
              <span className="font-bold text-base leading-5 text-zinc-400 tracking-[1px] uppercase">
                {project.category === "VISUAL DESIGN" ? "Visual Design" : "Product Design"}
              </span>
            </div>
            <h3 className="font-display font-bold text-4xl leading-10 text-white">
              {project.slug === "bankrate-data-center" ? "Bankrate Data Center" : project.title}
            </h3>
            <p className="font-normal text-base leading-6 text-zinc-400 line-clamp-3">{project.description}</p>
          </div>
          <div className="border-2 border-coral-300 flex items-center justify-center gap-2.5 px-6 py-4 rounded-lg w-fit">
            <span className="font-display font-bold text-base leading-normal text-white">View Project</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

