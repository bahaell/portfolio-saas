"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { currentUser, mockProjects } from "@/lib/mock-data"
import { Plus, Star } from "lucide-react"
import { AddProjectModal } from "@/components/modals/add-project-modal"
import { ProjectDetailsModal } from "@/components/modals/project-details-modal"
import { ImageCarousel } from "@/components/project/image-carousel"

export default function ProjectsPage() {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof mockProjects[0] | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const userProjects = mockProjects.filter((p) => p.userId === currentUser.id)

  const handleAddProject = (data: { title: string; description: string; link: string; image: string }) => {
    console.log("New project:", data)
    // In production, this would save to backend
  }

  const handleViewDetails = (project: typeof mockProjects[0]) => {
    setSelectedProject(project)
    setDetailsModalOpen(true)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
          <p className="text-muted-foreground">Showcase your best work and projects</p>
        </div>
        <Button onClick={() => setAddModalOpen(true)} className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userProjects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden border-border/50 hover:shadow-premium transition-all hover-lift group"
          >
            {project.images && project.images.length > 0 ? (
              <div className="p-4">
                <ImageCarousel images={project.images} title={project.title} />
              </div>
            ) : project.image ? (
              <div className="relative h-40 bg-muted overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : null}

            <div className={`${project.images && project.images.length > 0 ? "pt-0" : ""} p-4`}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
                {project.featured && <Star className="w-4 h-4 fill-accent text-accent" />}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

              <Button onClick={() => handleViewDetails(project)} variant="outline" className="w-full text-sm bg-transparent">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <AddProjectModal open={addModalOpen} onOpenChange={setAddModalOpen} onAdd={handleAddProject} />
      <ProjectDetailsModal project={selectedProject} open={detailsModalOpen} onOpenChange={setDetailsModalOpen} />
    </div>
  )
}
