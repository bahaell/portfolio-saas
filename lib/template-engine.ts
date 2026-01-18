import type React from "react"
import type { PublicPortfolioData } from "./public-types"

export interface TemplateProps {
  portfolio: PublicPortfolioData
}

export const getTemplate = (templateName: string): ((props: TemplateProps) => React.ReactNode) | null => {
  // Templates are resolved dynamically
  // This allows for lazy loading and code splitting
  const templates: Record<string, (props: TemplateProps) => React.ReactNode> = {}
  return templates[templateName] || null
}

export const getFallbackTemplate = (template: string, userPlan: "FREE" | "PREMIUM"): string => {
  // If premium template requested but user is FREE, fallback to classic-pro
  if (template === "modern-visual" && userPlan === "FREE") {
    return "classic-pro"
  }
  return template
}
