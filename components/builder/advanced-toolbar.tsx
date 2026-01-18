"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Palette, Type, Square, ToggleRight, RotateCcw, Lock } from "lucide-react"
import type { ThemeConfig } from "@/lib/types/theme"

interface AdvancedToolbarProps {
  currentTheme: ThemeConfig
  themeOverrides: Partial<ThemeConfig>
  onColorChange: (key: string, value: string) => void
  onFontChange: (key: string, value: string) => void
  onSpacingChange: (key: string, value: number) => void
  onReset: () => void
  userTier: "free" | "premium"
  visibleSections: Record<string, boolean>
  onSectionToggle: (section: string) => void
}

export function AdvancedToolbar({
  currentTheme,
  themeOverrides,
  onColorChange,
  onFontChange,
  onSpacingChange,
  onReset,
  userTier,
  visibleSections,
  onSectionToggle,
}: AdvancedToolbarProps) {
  const isPremium = userTier === "premium"
  const colors = ["primary", "secondary", "accent", "background"] as const

  return (
    <div className="w-80 bg-slate-900/95 border-r border-slate-700/50 backdrop-blur-xl flex flex-col h-screen sticky left-0 top-0 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50 sticky top-0 bg-slate-900/98 backdrop-blur">
        <h2 className="text-lg font-bold text-white mb-2">Customize Theme</h2>
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-slate-300 hover:text-white hover:bg-slate-800 bg-transparent"
          onClick={onReset}
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="colors" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full rounded-none bg-slate-800/50 border-b border-slate-700/50 p-0 h-10 justify-start">
          <TabsTrigger
            value="colors"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent"
          >
            <Palette className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger
            value="typography"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent"
          >
            <Type className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger
            value="spacing"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent"
          >
            <Square className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger
            value="sections"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent"
          >
            <ToggleRight className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>

        {/* Colors Tab */}
        <TabsContent value="colors" className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="space-y-3">
            {colors.map((color) => (
              <div key={color} className="space-y-2">
                <Label className="text-sm font-medium text-slate-300 capitalize flex items-center justify-between">
                  {color} Color
                </Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={themeOverrides.colors?.[color] || currentTheme.colors[color]}
                    onChange={(e) => onColorChange(color, e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer border border-slate-600 hover:border-slate-500"
                  />
                  <Input
                    type="text"
                    value={themeOverrides.colors?.[color] || currentTheme.colors[color]}
                    onChange={(e) => onColorChange(color, e.target.value)}
                    className="flex-1 bg-slate-800 border-slate-600 text-white text-sm"
                    placeholder="#000000"
                  />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Typography Tab */}
        <TabsContent value="typography" className="flex-1 p-4 overflow-y-auto space-y-4">
          {!isPremium && (
            <div className="p-3 bg-amber-900/20 border border-amber-600/30 rounded-lg flex gap-2 text-xs text-amber-200">
              <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Font customization is a PREMIUM feature</span>
            </div>
          )}
          <div className="space-y-3">
            {["heading", "body", "mono"].map((font) => (
              <div key={font} className="space-y-2 opacity-60 pointer-events-none">
                <Label className="text-sm font-medium text-slate-400 capitalize">{font} Font</Label>
                <Input
                  disabled
                  type="text"
                  value={currentTheme.fonts[font as keyof typeof currentTheme.fonts]}
                  className="bg-slate-800 border-slate-700 text-slate-500 text-sm cursor-not-allowed"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Spacing Tab */}
        <TabsContent value="spacing" className="flex-1 p-4 overflow-y-auto space-y-6">
          {!isPremium && (
            <div className="p-3 bg-amber-900/20 border border-amber-600/30 rounded-lg flex gap-2 text-xs text-amber-200">
              <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Spacing customization is a PREMIUM feature</span>
            </div>
          )}
          {["padding", "margin", "borderRadius"].map((spacing) => (
            <div key={spacing} className="space-y-2 opacity-60 pointer-events-none">
              <Label className="text-sm font-medium text-slate-400 capitalize">{spacing}</Label>
              <Slider disabled defaultValue={[16]} min={0} max={48} step={2} className="cursor-not-allowed" />
            </div>
          ))}
        </TabsContent>

        {/* Sections Tab */}
        <TabsContent value="sections" className="flex-1 p-4 overflow-y-auto space-y-3">
          <p className="text-xs text-slate-400 mb-4">Toggle portfolio sections on/off</p>
          {["profile", "skills", "projects", "cv", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => onSectionToggle(section)}
              className={`w-full p-3 rounded-lg border transition-all flex items-center justify-between ${
                visibleSections[section]
                  ? "bg-purple-500/20 border-purple-500/50 text-purple-200"
                  : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600"
              }`}
            >
              <span className="capitalize font-medium text-sm">{section}</span>
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${visibleSections[section] ? "border-purple-500 bg-purple-500" : "border-slate-600"}`}
              >
                {visibleSections[section] && <div className="w-1 h-1 bg-white rounded-full" />}
              </div>
            </button>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
