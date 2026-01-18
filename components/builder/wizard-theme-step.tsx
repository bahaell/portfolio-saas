"use client"

import { ThemeProvider } from "@/components/providers/theme-provider"
import { TemplateSelector } from "./template-selector"
import { ModernTemplate, MinimalTemplate } from "@/components/templates"
import type { PortfolioData } from "@/lib/types/theme"
import { THEME_REGISTRY } from "@/lib/themes/registry"
import { Card } from "@/components/ui/card"

interface WizardThemeStepProps {
  selectedThemeId: string
  onSelectTheme: (themeId: string) => void
  portfolio: PortfolioData
  userTier: "free" | "premium"
}

export function WizardThemeStep({ selectedThemeId, onSelectTheme, portfolio, userTier }: WizardThemeStepProps) {
  const theme = THEME_REGISTRY[selectedThemeId] || THEME_REGISTRY.modern

  const getPreview = () => {
    switch (selectedThemeId) {
      case "minimal":
        return <MinimalTemplate portfolio={portfolio} theme={theme} />
      case "modern":
      default:
        return <ModernTemplate portfolio={portfolio} theme={theme} />
    }
  }

  return (
    <ThemeProvider initialThemeId={selectedThemeId}>
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Template Selector */}
        <Card className="p-6 h-fit">
          <TemplateSelector selectedThemeId={selectedThemeId} onSelectTheme={onSelectTheme} userTier={userTier} />
        </Card>

        {/* Live Preview */}
        <Card className="overflow-hidden max-h-[600px] overflow-y-auto">{getPreview()}</Card>
      </div>
    </ThemeProvider>
  )
}
