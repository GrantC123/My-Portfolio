'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import ProjectTile, { type Project } from '@/app/components/ProjectTile'

interface ScrollStackContainerProps {
  projects: Project[]
}

export function ScrollStackContainer({ projects }: ScrollStackContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative">
      {projects.map((project, index) => {
        return (
          <Card
            key={project.slug || index}
            project={project}
            index={index}
            total={projects.length}
          />
        )
      })}
    </div>
  )
}

interface CardProps {
  project: Project
  index: number
  total: number
}

function Card({ project, index, total }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start']
  })

  // Scale up as card enters
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.95 ** (total - index), 1]
  )

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        top: `calc(-5vh + ${index * 25}px)`,
      }}
      className="sticky h-screen flex items-center justify-center w-full mb-[50vh]"
    >
      <div className="w-full">
        <ProjectTile project={project} />
      </div>
    </motion.div>
  )
}

