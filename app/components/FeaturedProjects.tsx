import ProjectTile, { type Project } from "./ProjectTile"

interface FeaturedProjectsProps {
  notionProjects: Project[]
  staticProjects: Project[]
}

export default function FeaturedProjects({ notionProjects, staticProjects }: FeaturedProjectsProps) {
  // Find the editorial design case study
  const editorialProject = staticProjects.find(p => p.slug === "editorial-imagery")
  
  // Combine: Notion projects first, then editorial at the bottom
  const displayProjects = [...notionProjects]
  if (editorialProject) {
    displayProjects.push(editorialProject)
  }

  return (
    <div className="flex flex-col gap-8">
      {displayProjects.length === 0 ? (
        <div className="text-zinc-400 text-center py-8">
          No featured projects found. Check your Notion database for projects with the "Featured" checkbox enabled.
        </div>
      ) : (
        displayProjects.map((project, index) => (
          <ProjectTile key={project.slug || index} project={project} />
        ))
      )}
    </div>
  )
}

