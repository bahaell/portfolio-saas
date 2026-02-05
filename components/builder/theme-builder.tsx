"use client"

import { useState, useMemo, useCallback } from "react"
import type { PortfolioData, ThemeConfig, UserTier } from "@/lib/types/theme"
import { THEME_REGISTRY } from "@/lib/themes/registry"
import { AdvancedToolbar } from "./advanced-toolbar"
import { ModernLivePreview } from "./modern-live-preview"

interface ThemeBuilderProps {
  initialThemeId?: string
  portfolio: PortfolioData
  userTier: UserTier
  onSave?: (themeData: { themeId: string; overrides: Partial<ThemeConfig> }) => void
}

export function ThemeBuilder({ initialThemeId = "modern", portfolio, userTier, onSave }: ThemeBuilderProps) {
  const [selectedThemeId, setSelectedThemeId] = useState(initialThemeId)
  const [themeOverrides, setThemeOverrides] = useState<Partial<ThemeConfig>>({})
  const [visibleSections, setVisibleSections] = useState({
    profile: true,
    skills: true,
    projects: true,
    cv: true,
    contact: true,
  })

  const baseTheme = THEME_REGISTRY[selectedThemeId] || THEME_REGISTRY.modern

  const effectiveTheme = useMemo(
    () => ({
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        ...(themeOverrides.colors || {}),
      },
      fonts: {
        ...baseTheme.fonts,
        ...(themeOverrides.fonts || {}),
      },
      spacing: {
        ...baseTheme.spacing,
        ...(themeOverrides.spacing || {}),
      },
    }),
    [baseTheme, themeOverrides],
  )

  const handleColorChange = useCallback((key: string, value: string) => {
    setThemeOverrides((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value,
      },
    } as any))
  }, [])

  const handleFontChange = useCallback((key: string, value: string) => {
    setThemeOverrides((prev) => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [key]: value,
      },
    } as any))
  }, [])

  const handleSpacingChange = useCallback((key: string, value: number) => {
    setThemeOverrides((prev) => ({
      ...prev,
      spacing: {
        ...prev.spacing,
        [key]: value,
      },
    } as any))
  }, [])

  const handleReset = useCallback(() => {
    setThemeOverrides({})
  }, [])

  const handleSectionToggle = useCallback((section: string) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section as keyof typeof visibleSections]: !prev[section as keyof typeof visibleSections],
    }))
  }, [])

  return (
    <div className="flex gap-0 bg-slate-950 min-h-[calc(100vh-80px)]">
      <AdvancedToolbar
        currentTheme={baseTheme}
        themeOverrides={themeOverrides}
        onColorChange={handleColorChange}
        onFontChange={handleFontChange}
        onSpacingChange={handleSpacingChange}
        onReset={handleReset}
        userTier={userTier}
        visibleSections={visibleSections}
        onSectionToggle={handleSectionToggle}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Template Selection Header */}
        <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur px-6 py-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-sm font-medium text-slate-300 mb-3">Select Template</h2>
            <div className="flex gap-3">
              {Object.entries(THEME_REGISTRY).map(([themeId, theme]) => (
                <button
                  key={themeId}
                  onClick={() => setSelectedThemeId(themeId)}
                  disabled={userTier === "free" && themeId !== "modern"}
                  className={`px-4 py-2 rounded-lg border transition-all text-sm font-medium ${selectedThemeId === themeId
                    ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20"
                    : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600"
                    } ${userTier === "free" && themeId !== "modern" ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-700/50"}`}
                >
                  {theme.name}
                  {userTier === "free" && themeId !== "modern" && <span className="ml-2 text-xs">PRO</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="flex-1 overflow-hidden p-6">
          <ModernLivePreview
            portfolio={portfolio}
            currentTheme={baseTheme}
            themeOverrides={themeOverrides}
            visibleSections={visibleSections}
          />
        </div>
      </div>
    </div>
  )
}
