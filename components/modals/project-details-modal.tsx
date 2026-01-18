"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, X } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  link?: string
  image?: string
}

interface ProjectDetailsModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDetailsModal({ project, open, onOpenChange }: ProjectDetailsModalProps) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>Project Details</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {project.image && (
            <div className="w-full h-64 bg-muted rounded-lg overflow-hidden">
              <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-sm mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>
          {project.link && (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="default">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  View Project
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
