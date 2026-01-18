import type { ThemeConfig } from "@/lib/types/theme"

// Pre-built themes - extensible for database-backed themes
export const THEME_REGISTRY: Record<string, ThemeConfig> = {
  modern: {
    id: "modern",
    name: "Modern Green",
    description: "Contemporary design with vibrant green accent",
    colors: {
      primary: "#215E61",
      secondary: "#233D4D",
      accent: "#FE7F2D",
      background: "#F5FBE6",
      foreground: "#233D4D",
      card: "#FFFFFF",
      cardForeground: "#233D4D",
    },
    fonts: {
      heading: "Inter, system-ui, sans-serif",
      body: "Inter, system-ui, sans-serif",
      mono: "Menlo, monospace",
    },
    spacing: {
      base: 4,
    },
    radius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
    },
  },
  minimal: {
    id: "minimal",
    name: "Minimal Dark",
    description: "Clean, minimal design with dark background",
    colors: {
      primary: "#FFFFFF",
      secondary: "#E0E0E0",
      accent: "#FE7F2D",
      background: "#0A0A0A",
      foreground: "#FFFFFF",
      card: "#1A1A1A",
      cardForeground: "#FFFFFF",
    },
    fonts: {
      heading: "Inter, system-ui, sans-serif",
      body: "Inter, system-ui, sans-serif",
      mono: "Menlo, monospace",
    },
    spacing: {
      base: 4,
    },
    radius: {
      sm: 2,
      md: 4,
      lg: 8,
      xl: 12,
    },
  },
  premium: {
    id: "premium",
    name: "Premium Purple",
    description: "Luxurious design with purple accents - Premium tier only",
    colors: {
      primary: "#8B5CF6",
      secondary: "#7C3AED",
      accent: "#EC4899",
      background: "#F8F7FF",
      foreground: "#1F2937",
      card: "#FFFFFF",
      cardForeground: "#1F2937",
    },
    fonts: {
      heading: "Inter, system-ui, sans-serif",
      body: "Inter, system-ui, sans-serif",
      mono: "Menlo, monospace",
    },
    spacing: {
      base: 4,
    },
    radius: {
      sm: 6,
      md: 12,
      lg: 16,
      xl: 24,
    },
    isPremium: true,
  },
}

export function getTheme(themeId: string): ThemeConfig | null {
  return THEME_REGISTRY[themeId] || null
}

export function getAvailableThemes(userTier: "free" | "premium"): ThemeConfig[] {
  return Object.values(THEME_REGISTRY).filter((theme) => userTier === "premium" || !theme.isPremium)
}
