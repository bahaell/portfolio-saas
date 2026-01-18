"use client"

import { THEME_REGISTRY } from "@/lib/themes/registry"
import type { UserTier } from "@/lib/types/theme"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TemplateSelectorProps {
  selectedThemeId: string
  onSelectTheme: (themeId: string) => void
  userTier: UserTier
}

export function TemplateSelector({ selectedThemeId, onSelectTheme, userTier }: TemplateSelectorProps) {
  const themes = Object.values(THEME_REGISTRY)

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Templates</h3>
      <div className="grid grid-cols-1 gap-3">
        {themes.map((theme) => {
          const isLocked = theme.isPremium && userTier === "free"
          const isSelected = selectedThemeId === theme.id

          return (
            <Button
              key={theme.id}
              variant={isSelected ? "default" : "outline"}
              className="w-full justify-between group relative"
              onClick={() => !isLocked && onSelectTheme(theme.id)}
              disabled={isLocked}
              title={isLocked ? "Upgrade to Premium to use this template" : ""}
            >
              <div className="flex flex-col items-start text-left gap-1">
                <span className="font-medium text-sm">{theme.name}</span>
                <span className="text-xs opacity-70">{theme.description}</span>
              </div>
              {isLocked && <Lock size={16} className="opacity-50" />}
              {theme.isPremium && <Badge variant="secondary">Premium</Badge>}
            </Button>
          )
        })}
      </div>
      {userTier === "free" && (
        <div className="p-3 bg-accent/10 rounded-lg border border-accent/30 text-sm">
          <p className="font-semibold text-accent mb-1">Unlock Premium Templates</p>
          <p className="text-xs text-muted-foreground">
            Upgrade to access exclusive designs and advanced customization
          </p>
        </div>
      )}
    </div>
  )
}
