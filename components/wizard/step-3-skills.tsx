"use client"

import type { PortfolioSkill } from "@/lib/wizard-types"
import { SKILL_CATEGORIES, CERTIFICATIONS } from "@/lib/wizard-types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Award } from "lucide-react"
import { useState } from "react"

interface Step3SkillsProps {
  skills?: PortfolioSkill[]
  onUpdate: (skills: PortfolioSkill[]) => void
}

export function Step3Skills({ skills = [], onUpdate }: Step3SkillsProps) {
  const [skillName, setSkillName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(SKILL_CATEGORIES[0])
  const [selectedProficiency, setSelectedProficiency] = useState<1 | 2 | 3 | 4>(3)
  const [localSkills, setLocalSkills] = useState<PortfolioSkill[]>(skills)
  const [selectedCerts, setSelectedCerts] = useState<string[]>([])

  const addSkill = () => {
    if (skillName.trim()) {
      const newSkill: PortfolioSkill = {
        id: `skill-${Date.now()}`,
        name: skillName,
        category: selectedCategory,
        proficiency: selectedProficiency,
      }
      setLocalSkills([...localSkills, newSkill])
      setSkillName("")
      setSelectedProficiency(3)
    }
  }

  const removeSkill = (id: string) => {
    setLocalSkills(localSkills.filter((s) => s.id !== id))
  }

  const toggleCert = (cert: string) => {
    setSelectedCerts((prev) => (prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]))
  }

  const handleSave = () => {
    onUpdate(localSkills)
  }

  const groupedSkills = localSkills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, PortfolioSkill[]>,
  )

  const getProficiencyLabel = (level: number) => {
    const labels = ["", "Beginner", "Intermediate", "Advanced", "Master"]
    return labels[level]
  }

  return (
    <div className="space-y-8">
      {/* Add Skill Section */}
      <Card className="p-6 bg-muted/50 border-border">
        <h3 className="font-semibold text-foreground mb-4">Add a Skill</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="e.g., React, Figma, Project Management"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            onKeyPress={(e) => e.key === "Enter" && addSkill()}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                {SKILL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Proficiency</label>
              <select
                value={selectedProficiency}
                onChange={(e) => setSelectedProficiency(Number(e.target.value) as 1 | 2 | 3 | 4)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                {[1, 2, 3, 4].map((level) => (
                  <option key={level} value={level}>
                    {getProficiencyLabel(level)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button onClick={addSkill} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
            <Plus className="w-4 h-4" /> Add Skill
          </Button>
        </div>
      </Card>

      {/* Skills List */}
      {Object.entries(groupedSkills).length > 0 && (
        <div className="space-y-6">
          <h3 className="font-semibold text-foreground">Your Skills</h3>
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="outline"
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted transition-colors group"
                  >
                    <span>{skill.name}</span>
                    <span className="text-xs text-muted-foreground">{getProficiencyLabel(skill.proficiency)}</span>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-foreground">Add Certifications</h3>
        </div>
        <div className="space-y-2">
          {CERTIFICATIONS.map((cert) => (
            <label
              key={cert}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedCerts.includes(cert)}
                onChange={() => toggleCert(cert)}
                className="w-4 h-4 rounded accent-accent"
              />
              <span className="text-sm text-foreground">{cert}</span>
            </label>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        Save Skills & Certifications
      </Button>
    </div>
  )
}
