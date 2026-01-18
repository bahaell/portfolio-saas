"use client"

import type React from "react"

import type { PortfolioExperience } from "@/lib/wizard-types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Calendar } from "lucide-react"
import { useState } from "react"

interface Step4ExperienceProps {
  experiences?: PortfolioExperience[]
  onUpdate: (experiences: PortfolioExperience[]) => void
}

export function Step4Experience({ experiences = [], onUpdate }: Step4ExperienceProps) {
  const [localExperiences, setLocalExperiences] = useState<PortfolioExperience[]>(experiences)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<PortfolioExperience>>({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? !prev.current : value,
    }))
  }

  const addExperience = () => {
    if (formData.role && formData.company && formData.startDate) {
      const newExp: PortfolioExperience = {
        id: `exp-${Date.now()}`,
        role: formData.role || "",
        company: formData.company || "",
        startDate: formData.startDate || "",
        endDate: formData.endDate,
        current: formData.current || false,
        description: formData.description || "",
      }
      setLocalExperiences([...localExperiences, newExp])
      setFormData({
        role: "",
        company: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      })
      setShowForm(false)
    }
  }

  const removeExperience = (id: string) => {
    setLocalExperiences(localExperiences.filter((e) => e.id !== id))
  }

  const handleSave = () => {
    onUpdate(localExperiences)
  }

  return (
    <div className="space-y-8">
      {localExperiences.length === 0 ? (
        <Card className="p-12 text-center border-border/50">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No experience added</h3>
          <p className="text-muted-foreground mb-6">Start by adding your work experience and roles.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {localExperiences.map((exp) => (
            <Card key={exp.id} className="p-6 border-border/50 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{exp.role}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)}>
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {exp.startDate} to {exp.current ? "Present" : exp.endDate}
              </p>
              {exp.description && <p className="text-sm text-foreground/80">{exp.description}</p>}
            </Card>
          ))}
        </div>
      )}

      {/* Add Experience Form */}
      {showForm ? (
        <Card className="p-6 bg-muted/50 border-border">
          <h3 className="font-semibold text-foreground mb-4">Add Experience</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="role"
                value={formData.role || ""}
                onChange={handleInputChange}
                placeholder="Job Title"
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <input
                type="text"
                name="company"
                value={formData.company || ""}
                onChange={handleInputChange}
                placeholder="Company"
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="month"
                name="startDate"
                value={formData.startDate || ""}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <input
                type="month"
                name="endDate"
                value={formData.endDate || ""}
                onChange={handleInputChange}
                disabled={formData.current}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50"
              />
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="current"
                checked={formData.current || false}
                onChange={handleInputChange}
                className="w-4 h-4 rounded accent-accent"
              />
              <span className="text-sm text-foreground">Currently working here</span>
            </label>

            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />

            <div className="flex gap-2">
              <Button onClick={addExperience} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                Add Experience
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
          <Plus className="w-4 h-4" /> Add Experience
        </Button>
      )}

      <Button onClick={handleSave} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        Save Experience
      </Button>
    </div>
  )
}
