import { createContext } from "react"
import type { ThemeConfig } from "@/lib/types/theme"

export interface ThemeContextType {
  currentTheme: ThemeConfig
  themeOverrides: Partial<ThemeConfig>
  updateTheme: (overrides: Partial<ThemeConfig>) => void
  resetTheme: () => void
  applyTheme: (themeId: string) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
