import type { ThemeConfig } from "@/lib/types/theme"

export function applyThemeVariables(theme: ThemeConfig, element = document.documentElement) {
  const colors = theme.colors
  const radius = theme.radius
  const spacing = theme.spacing

  // Apply color variables
  element.style.setProperty("--theme-primary", colors.primary)
  element.style.setProperty("--theme-secondary", colors.secondary)
  element.style.setProperty("--theme-accent", colors.accent)
  element.style.setProperty("--theme-background", colors.background)
  element.style.setProperty("--theme-foreground", colors.foreground)
  element.style.setProperty("--theme-card", colors.card)
  element.style.setProperty("--theme-card-foreground", colors.cardForeground)

  // Apply radius variables
  element.style.setProperty("--theme-radius-sm", `${radius.sm}px`)
  element.style.setProperty("--theme-radius-md", `${radius.md}px`)
  element.style.setProperty("--theme-radius-lg", `${radius.lg}px`)
  element.style.setProperty("--theme-radius-xl", `${radius.xl}px`)

  // Apply spacing variable
  element.style.setProperty("--theme-spacing-base", `${spacing.base}px`)

  // Apply fonts (via CSS custom properties)
  element.style.setProperty("--theme-font-heading", theme.fonts.heading)
  element.style.setProperty("--theme-font-body", theme.fonts.body)
  element.style.setProperty("--theme-font-mono", theme.fonts.mono)
}

export function getCSSVariableValue(variableName: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
}
