"use client"

import { useState } from "react"
import type { ThemeConfig } from "@/lib/types/theme"
import { ColorPicker } from "./color-picker"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Type, Maximize2, RotateCcw, Lock, Sparkles, Zap } from "lucide-react"

interface CustomizationToolbarProps {
  theme: ThemeConfig
  overrides: Partial<ThemeConfig>
  onUpdateTheme: (overrides: Partial<ThemeConfig>) => void
  onResetTheme: () => void
  userTier: "free" | "premium"
}

export function CustomizationToolbar({
  theme,
  overrides,
  onUpdateTheme,
  onResetTheme,
  userTier,
}: CustomizationToolbarProps) {
  const [activeTab, setActiveTab] = useState("colors")
  const effectiveTheme = { ...theme, ...overrides }

  const handleColorChange = (colorKey: keyof typeof effectiveTheme.colors, value: string) => {
    onUpdateTheme({
      colors: {
        ...effectiveTheme.colors,
        [colorKey]: value,
      },
    })
  }

  const handleRadiusChange = (radiusKey: keyof typeof effectiveTheme.radius, value: number) => {
    onUpdateTheme({
      radius: {
        ...effectiveTheme.radius,
        [radiusKey]: value,
      },
    })
  }

  const isTypographyLocked = userTier === "free"
  const isSpacingLocked = userTier === "free"

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg p-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white">Theme Controls</h3>
            <p className="text-xs text-slate-400">Customize your portfolio design</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetTheme}
          className="text-xs text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
        >
          <RotateCcw size={14} className="mr-1" />
          Reset
        </Button>
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/40 border border-slate-700/50 rounded-lg p-1 gap-1">
          <TabsTrigger
            value="colors"
            className="gap-1.5 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/20 text-slate-400 hover:text-slate-200 transition-all duration-200 rounded-md"
          >
            <Palette size={14} />
            Colors
          </TabsTrigger>
          <TabsTrigger
            value="typography"
            className="gap-1.5 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/20 text-slate-400 hover:text-slate-200 disabled:opacity-50 transition-all duration-200 rounded-md"
            disabled={isTypographyLocked}
          >
            <Type size={14} />
            Font
            {isTypographyLocked && <Lock size={12} className="ml-auto" />}
          </TabsTrigger>
          <TabsTrigger
            value="spacing"
            className="gap-1.5 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/20 text-slate-400 hover:text-slate-200 disabled:opacity-50 transition-all duration-200 rounded-md"
            disabled={isSpacingLocked}
          >
            <Maximize2 size={14} />
            Space
            {isSpacingLocked && <Lock size={12} className="ml-auto" />}
          </TabsTrigger>
        </TabsList>

        {/* Colors Tab */}
        <TabsContent value="colors" className="space-y-3 mt-4">
          <div className="space-y-3">
            <div className="bg-slate-800/30 rounded-xl p-3.5 hover:bg-slate-800/50 transition-all duration-200 border border-slate-700/30 hover:border-slate-600/50 group">
              <ColorPicker
                label="Primary"
                value={effectiveTheme.colors.primary}
                onChange={(v) => handleColorChange("primary", v)}
              />
            </div>
            <div className="bg-slate-800/30 rounded-xl p-3.5 hover:bg-slate-800/50 transition-all duration-200 border border-slate-700/30 hover:border-slate-600/50 group">
              <ColorPicker
                label="Secondary"
                value={effectiveTheme.colors.secondary}
                onChange={(v) => handleColorChange("secondary", v)}
              />
            </div>
            <div className="bg-slate-800/30 rounded-xl p-3.5 hover:bg-slate-800/50 transition-all duration-200 border border-slate-700/30 hover:border-slate-600/50 group">
              <ColorPicker
                label="Accent"
                value={effectiveTheme.colors.accent}
                onChange={(v) => handleColorChange("accent", v)}
              />
            </div>
            <div className="bg-slate-800/30 rounded-xl p-3.5 hover:bg-slate-800/50 transition-all duration-200 border border-slate-700/30 hover:border-slate-600/50 group">
              <ColorPicker
                label="Background"
                value={effectiveTheme.colors.background}
                onChange={(v) => handleColorChange("background", v)}
              />
            </div>
            <div className="bg-slate-800/30 rounded-xl p-3.5 hover:bg-slate-800/50 transition-all duration-200 border border-slate-700/30 hover:border-slate-600/50 group">
              <ColorPicker
                label="Card"
                value={effectiveTheme.colors.card}
                onChange={(v) => handleColorChange("card", v)}
              />
            </div>
            <div className="bg-slate-800/30 rounded-xl p-3.5 hover:bg-slate-800/50 transition-all duration-200 border border-slate-700/30 hover:border-slate-600/50 group">
              <ColorPicker
                label="Foreground"
                value={effectiveTheme.colors.foreground}
                onChange={(v) => handleColorChange("foreground", v)}
              />
            </div>
          </div>
        </TabsContent>

        {/* Typography Tab */}
        <TabsContent value="typography" className="space-y-3 mt-4">
          {isTypographyLocked ? (
            <div className="p-4 border border-blue-500/30 bg-blue-900/20 rounded-xl backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 rounded-full p-2 flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <p className="font-semibold text-xs text-blue-100 mb-1">Premium Feature</p>
                  <p className="text-xs text-blue-200/70 mb-3">Unlock font customization with a Premium upgrade</p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-slate-800/30 rounded-xl p-3.5 border border-slate-700/30">
                <label className="text-xs font-semibold text-slate-200 block mb-2">Heading Font</label>
                <div className="text-sm text-slate-400 font-mono bg-slate-900/50 rounded-lg px-3 py-2 border border-slate-700/50">
                  {effectiveTheme.fonts.heading}
                </div>
                <p className="text-xs text-slate-500 mt-2">Theme preset</p>
              </div>
              <div className="bg-slate-800/30 rounded-xl p-3.5 border border-slate-700/30">
                <label className="text-xs font-semibold text-slate-200 block mb-2">Body Font</label>
                <div className="text-sm text-slate-400 font-mono bg-slate-900/50 rounded-lg px-3 py-2 border border-slate-700/50">
                  {effectiveTheme.fonts.body}
                </div>
                <p className="text-xs text-slate-500 mt-2">Theme preset</p>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Spacing Tab */}
        <TabsContent value="spacing" className="space-y-3 mt-4">
          {isSpacingLocked ? (
            <div className="p-4 border border-blue-500/30 bg-blue-900/20 rounded-xl backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 rounded-full p-2 flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <p className="font-semibold text-xs text-blue-100 mb-1">Premium Feature</p>
                  <p className="text-xs text-blue-200/70 mb-3">Unlock spacing controls with a Premium upgrade</p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-semibold text-slate-200">Small Radius</label>
                  <span className="text-xs font-mono text-purple-300 bg-purple-900/30 px-2 py-1 rounded-md">
                    {effectiveTheme.radius.sm}px
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={effectiveTheme.radius.sm}
                  onChange={(e) => handleRadiusChange("sm", Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-semibold text-slate-200">Medium Radius</label>
                  <span className="text-xs font-mono text-purple-300 bg-purple-900/30 px-2 py-1 rounded-md">
                    {effectiveTheme.radius.md}px
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="16"
                  value={effectiveTheme.radius.md}
                  onChange={(e) => handleRadiusChange("md", Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-semibold text-slate-200">Large Radius</label>
                  <span className="text-xs font-mono text-purple-300 bg-purple-900/30 px-2 py-1 rounded-md">
                    {effectiveTheme.radius.lg}px
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={effectiveTheme.radius.lg}
                  onChange={(e) => handleRadiusChange("lg", Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
