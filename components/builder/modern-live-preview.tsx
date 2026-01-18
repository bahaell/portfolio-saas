"use client"
import { useState } from "react"
import { Smartphone, Tablet, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PortfolioData, ThemeConfig } from "@/lib/types/theme"

interface ModernLivePreviewProps {
  portfolio: PortfolioData
  currentTheme: ThemeConfig
  themeOverrides: Partial<ThemeConfig>
  visibleSections: Record<string, boolean>
}

type ViewportType = "mobile" | "tablet" | "desktop"

export function ModernLivePreview({
  portfolio,
  currentTheme,
  themeOverrides,
  visibleSections,
}: ModernLivePreviewProps) {
  const [viewport, setViewport] = useState<ViewportType>("desktop")

  // Merge theme with overrides
  const mergedTheme = {
    colors: { ...currentTheme.colors, ...themeOverrides.colors },
    fonts: { ...currentTheme.fonts, ...themeOverrides.fonts },
    spacing: { ...currentTheme.spacing, ...themeOverrides.spacing },
  }

  const getContainerWidth = () => {
    switch (viewport) {
      case "mobile":
        return "max-w-sm"
      case "tablet":
        return "max-w-2xl"
      default:
        return "max-w-4xl"
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
      {/* Viewport Controls */}
      <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between rounded-t-lg">
        <h3 className="text-sm font-semibold text-slate-900">Live Preview</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={viewport === "mobile" ? "default" : "outline"}
            onClick={() => setViewport("mobile")}
            className="gap-2"
          >
            <Smartphone className="w-4 h-4" />
            Mobile
          </Button>
          <Button
            size="sm"
            variant={viewport === "tablet" ? "default" : "outline"}
            onClick={() => setViewport("tablet")}
            className="gap-2"
          >
            <Tablet className="w-4 h-4" />
            Tablet
          </Button>
          <Button
            size="sm"
            variant={viewport === "desktop" ? "default" : "outline"}
            onClick={() => setViewport("desktop")}
            className="gap-2"
          >
            <Monitor className="w-4 h-4" />
            Desktop
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex-1 p-8 overflow-auto flex items-center justify-center">
        <div
          className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${getContainerWidth()}`}
          style={{
            backgroundColor: mergedTheme.colors.background,
          }}
        >
          {/* Profile Section */}
          {visibleSections.profile && (
            <div
              className="px-8 py-12 border-b text-center"
              style={{ borderColor: mergedTheme.colors.secondary + "40" }}
            >
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4"
                style={{ backgroundColor: mergedTheme.colors.primary }}
              />
              <h1 className="text-3xl font-bold mb-2" style={{ color: mergedTheme.colors.primary }}>
                {portfolio.name || "Your Name"}
              </h1>
              <p style={{ color: mergedTheme.colors.secondary }} className="text-lg">
                {portfolio.description || "Your professional description"}
              </p>
            </div>
          )}

          {/* Skills Section */}
          {visibleSections.skills && portfolio.skills && portfolio.skills.length > 0 && (
            <div className="px-8 py-8 border-b" style={{ borderColor: mergedTheme.colors.secondary + "40" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: mergedTheme.colors.primary }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: mergedTheme.colors.accent + "20",
                      color: mergedTheme.colors.accent,
                    }}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {visibleSections.projects && portfolio.projects && portfolio.projects.length > 0 && (
            <div className="px-8 py-8 border-b" style={{ borderColor: mergedTheme.colors.secondary + "40" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: mergedTheme.colors.primary }}>
                Projects
              </h2>
              <div className="space-y-4">
                {portfolio.projects.slice(0, 2).map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: mergedTheme.colors.secondary + "10" }}
                  >
                    <h3 className="font-bold mb-1" style={{ color: mergedTheme.colors.primary }}>
                      {project.title}
                    </h3>
                    <p className="text-sm" style={{ color: mergedTheme.colors.secondary }}>
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          {visibleSections.contact && (
            <div className="px-8 py-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: mergedTheme.colors.primary }}>
                Contact
              </h2>
              <div className="space-y-2 text-sm">
                {portfolio.email && (
                  <p style={{ color: mergedTheme.colors.secondary }}>
                    <span className="font-medium">Email:</span> {portfolio.email}
                  </p>
                )}
                {portfolio.phone && (
                  <p style={{ color: mergedTheme.colors.secondary }}>
                    <span className="font-medium">Phone:</span> {portfolio.phone}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
