"use client"

import type React from "react"

import type { PortfolioProject } from "@/lib/wizard-types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Star, Code2 } from "lucide-react"
import { useState } from "react"

interface Step5ProjectsProps {
  projects?: PortfolioProject[]
  onUpdate: (projects: PortfolioProject[]) => void
  userPlan: "FREE" | "PREMIUM"
}

export function Step5Projects({ projects = [], onUpdate, userPlan }: Step5ProjectsProps) {
  const [localProjects, setLocalProjects] = useState<PortfolioProject[]>(projects)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<PortfolioProject>>({
    title: "",
    description: "",
    technologies: [],
    githubLink: "",
    liveLink: "",
    featured: false,
  })
  const [techInput, setTechInput] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? !prev.featured : value,
    }))
  }

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...(prev.technologies || []), techInput.trim()],
      }))
      setTechInput("")
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: (prev.technologies || []).filter((t) => t !== tech),
    }))
  }

  const addProject = () => {
    if (formData.title && formData.description) {
      const newProject: PortfolioProject = {
        id: `proj-${Date.now()}`,
        title: formData.title || "",
        description: formData.description || "",
        technologies: formData.technologies || [],
        githubLink: formData.githubLink,
        liveLink: formData.liveLink,
        featured: formData.featured || false,
        version: 1,
      }
      setLocalProjects([...localProjects, newProject])
      setFormData({
        title: "",
        description: "",
        technologies: [],
        githubLink: "",
        liveLink: "",
        featured: false,
      })
      setShowForm(false)
    }
  }

  const removeProject = (id: string) => {
    setLocalProjects(localProjects.filter((p) => p.id !== id))
  }

  const toggleFeatured = (id: string) => {
    const featuredCount = localProjects.filter((p) => p.featured).length
    const canAddMore = userPlan === "PREMIUM" || featuredCount < 3

    setLocalProjects(localProjects.map((p) => (p.id === id && canAddMore ? { ...p, featured: !p.featured } : p)))
  }

  const handleSave = () => {
    onUpdate(localProjects)
  }

  const featuredCount = localProjects.filter((p) => p.featured).length

  return (
    <div className="space-y-8">
      {localProjects.length === 0 ? (
        <Card className="p-12 text-center border-border/50">
          <Code2 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No projects added</h3>
          <p className="text-muted-foreground mb-6">Showcase your best work by adding projects.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {localProjects.map((proj) => (
            <Card key={proj.id} className="p-6 border-border/50 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{proj.title}</h4>
                    {proj.featured && <Star className="w-4 h-4 fill-accent text-accent" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{proj.description}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeProject(proj.id)}>
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>

              {proj.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {proj.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-2 text-sm">
                {proj.githubLink && (
                  <a
                    href={proj.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {proj.liveLink && (
                  <a
                    href={proj.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFeatured(proj.id)}
                  className={`gap-1 ${
                    proj.featured ? "text-accent hover:text-accent" : "text-muted-foreground hover:text-accent"
                  }`}
                >
                  <Star className={`w-4 h-4 ${proj.featured ? "fill-current" : ""}`} />
                  {proj.featured ? "Featured" : "Feature"}
                </Button>
              </div>
            </Card>
          ))}

          {userPlan === "FREE" && featuredCount >= 3 && (
            <Card className="p-4 bg-accent/10 border border-accent/20">
              <p className="text-sm text-foreground">
                Free plans can feature up to 3 projects. Upgrade to Premium for unlimited featured projects.
              </p>
            </Card>
          )}
        </div>
      )}

      {/* Add Project Form */}
      {showForm ? (
        <Card className="p-6 bg-muted/50 border-border">
          <h3 className="font-semibold text-foreground mb-4">Add Project</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              placeholder="Project Title"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />

            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Describe your project..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Technologies</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="e.g., React, TypeScript"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  onKeyPress={(e) => e.key === "Enter" && addTechnology()}
                />
                <Button onClick={addTechnology} variant="outline">
                  Add
                </Button>
              </div>
              {(formData.technologies || []).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(formData.technologies || []).map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                      <button onClick={() => removeTechnology(tech)} className="ml-1">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <input
              type="url"
              name="githubLink"
              value={formData.githubLink || ""}
              onChange={handleInputChange}
              placeholder="GitHub Link (optional)"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />

            <input
              type="url"
              name="liveLink"
              value={formData.liveLink || ""}
              onChange={handleInputChange}
              placeholder="Live Demo Link (optional)"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured || false}
                onChange={handleInputChange}
                className="w-4 h-4 rounded accent-accent"
              />
              <span className="text-sm text-foreground">Featured Project</span>
            </label>

            <div className="flex gap-2">
              <Button onClick={addProject} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                Add Project
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full border border-border hover:bg-muted bg-background text-foreground gap-2"
          variant="outline"
        >
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      )}

      <Button onClick={handleSave} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        Save Projects
      </Button>
    </div>
  )
}
