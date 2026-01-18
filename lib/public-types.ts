// Public portfolio types (separate from wizard/dashboard)
export interface PublicPortfolioTheme {
  primary: string
  secondary: string
  background: string
  text: string
  accent: string
}

export interface PublicPortfolioData {
  id: string
  userId: string
  username: string
  published: boolean
  template: "classic-pro" | "modern-visual"
  theme: PublicPortfolioTheme
  profile: {
    name: string
    title: string
    location: string
    bio: string
    image?: string
    email?: string
    phone?: string
  }
  skills: Array<{
    id: string
    name: string
    category: string
    proficiency: number
  }>
  experiences: Array<{
    id: string
    role: string
    company: string
    startDate: string
    endDate?: string
    current: boolean
    description: string
  }>
  projects: Array<{
    id: string
    title: string
    description: string
    image?: string
    technologies: string[]
    githubLink?: string
    liveLink?: string
    featured: boolean
  }>
}

export interface PublicUser {
  id: string
  username: string
  name: string
  plan: "FREE" | "PREMIUM"
}
