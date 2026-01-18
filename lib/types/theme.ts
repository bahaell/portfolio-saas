// Theme configuration types for the builder system
export interface ThemeConfig {
  id: string
  name: string
  description?: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    card: string
    cardForeground: string
  }
  fonts: {
    heading: string
    body: string
    mono: string
  }
  spacing: {
    base: number // in pixels
  }
  radius: {
    sm: number
    md: number
    lg: number
    xl: number
  }
  isPremium?: boolean
}

export interface PortfolioData {
  id: string
  title: string
  description: string
  name: string
  email: string
  phone?: string
  website?: string
  social?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
  projects?: ProjectItem[]
  skills?: SkillItem[]
  about?: string
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  image?: string
  tags?: string[]
  link?: string
}

export interface SkillItem {
  id: string
  name: string
  level: "beginner" | "intermediate" | "expert"
}

export interface ThemeOverrides {
  themeId: string
  customizations: Partial<ThemeConfig>
  portfolioId?: string
}

export type UserTier = "free" | "premium"
