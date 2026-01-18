"use client"

import type React from "react"

import type { PortfolioProfile } from "@/lib/wizard-types"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Wand2 } from "lucide-react"
import { useState } from "react"

interface Step2ProfileProps {
  profile?: PortfolioProfile
  onUpdate: (profile: PortfolioProfile) => void
}

export function Step2Profile({ profile, onUpdate }: Step2ProfileProps) {
  const [formData, setFormData] = useState<PortfolioProfile>(
    profile || {
      fullName: "",
      title: "",
      location: "",
      email: "",
      bio: "",
      socialLinks: [],
    },
  )

  const bioLength = formData.bio.length
  const bioLimit = 500

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", url: "" }],
    }))
  }

  const handleRemoveSocial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }))
  }

  const handleSocialChange = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    }))
  }

  const handleSave = () => {
    onUpdate(formData)
  }

  return (
    <div className="space-y-8">
      {/* Profile Photo */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Profile Photo</label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden">
            {formData.profilePhoto && (
              <img
                src={formData.profilePhoto || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <Button variant="outline" size="sm" disabled>
              Upload Photo
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Coming soon: Drag & drop image upload</p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="e.g., Sarah Johnson"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Title / Role *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Product Designer"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., San Francisco, CA"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="e.g., sarah@example.com"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-foreground">Bio</label>
          <Button variant="ghost" size="sm" className="gap-1 text-accent hover:text-accent hover:bg-accent/10" disabled>
            <Wand2 className="w-4 h-4" /> AI Fill
          </Button>
        </div>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Tell us about yourself..."
          maxLength={bioLimit}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
        />
        <div className="flex justify-end mt-2">
          <span className="text-xs text-muted-foreground">
            {bioLength}/{bioLimit}
          </span>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-foreground">Social Links</label>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddSocial}
            className="gap-1 text-accent hover:text-accent hover:bg-accent/10"
          >
            <Plus className="w-4 h-4" /> Add Link
          </Button>
        </div>

        <div className="space-y-3">
          {formData.socialLinks.map((link, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={link.platform}
                onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                placeholder="Platform (e.g., LinkedIn)"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                placeholder="URL"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <Button variant="ghost" size="icon" onClick={() => handleRemoveSocial(index)}>
                <Trash2 className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        Save Profile Information
      </Button>
    </div>
  )
}
