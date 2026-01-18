"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { ThemeContext } from "@/lib/context/theme-context"
import type { ThemeConfig } from "@/lib/types/theme"
import { THEME_REGISTRY } from "@/lib/themes/registry"
import { applyThemeVariables } from "@/lib/utils/theme-applier"

interface ThemeProviderProps {
  children: React.ReactNode
  initialThemeId?: string
  onThemeChange?: (theme: ThemeConfig) => void
}

export function ThemeProvider({ children, initialThemeId = "modern", onThemeChange }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(() => {
    // Load from sessionStorage if available
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("theme-id")
      const themeId = saved || initialThemeId
      return THEME_REGISTRY[themeId] || THEME_REGISTRY.modern
    }
    return THEME_REGISTRY[initialThemeId] || THEME_REGISTRY.modern
  })

  const [themeOverrides, setThemeOverrides] = useState<Partial<ThemeConfig>>({})

  // Apply theme to DOM
  useEffect(() => {
    applyThemeVariables(currentTheme)
  }, [currentTheme])

  const updateTheme = useCallback((overrides: Partial<ThemeConfig>) => {
    setThemeOverrides((prev) => ({ ...prev, ...overrides }))
  }, [])

  const resetTheme = useCallback(() => {
    setThemeOverrides({})
    applyThemeVariables(currentTheme)
  }, [currentTheme])

  const applyTheme = useCallback(
    (themeId: string) => {
      const theme = THEME_REGISTRY[themeId]
      if (theme) {
        setCurrentTheme(theme)
        setThemeOverrides({})
        sessionStorage.setItem("theme-id", themeId)
        if (onThemeChange) {
          onThemeChange(theme)
        }
      }
    },
    [onThemeChange],
  )

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeOverrides,
        updateTheme,
        resetTheme,
        applyTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
