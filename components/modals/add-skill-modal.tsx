"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const SKILL_CATEGORIES = ["Design", "Development", "Frontend", "Backend", "Database", "Strategy", "Research", "Marketing", "Other"]

interface AddSkillModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (skill: { name: string; category: string; proficiency: number }) => void
}

export function AddSkillModal({ open, onOpenChange, onAdd }: AddSkillModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Development",
    proficiency: 70,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim()) {
      onAdd(formData)
      setFormData({ name: "", category: "Development", proficiency: 70 })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
          <DialogDescription>Add a skill to your portfolio.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skill-name">Skill Name</Label>
            <Input
              id="skill-name"
              placeholder="e.g., React, JavaScript, UI Design"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skill-category">Category</Label>
            <select
              id="skill-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {SKILL_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="proficiency">Proficiency</Label>
              <span className="text-sm font-semibold text-primary">{formData.proficiency}%</span>
            </div>
            <Slider
              id="proficiency"
              min={1}
              max={100}
              step={1}
              value={[formData.proficiency]}
              onValueChange={(value) => setFormData({ ...formData, proficiency: value[0] })}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Skill</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
