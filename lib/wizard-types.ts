// Portfolio wizard data types aligned with MongoDB schema structure
export type TemplateType = "minimal" | "modern" | "creative" | "professional" | "tech-focused"
export type ThemeColor = "blue" | "green" | "orange" | "purple" | "teal"
export type ProficiencyLevel = 1 | 2 | 3 | 4

export interface PortfolioProfile {
  fullName: string
  title: string
  location: string
  email: string
  phone?: string
  website?: string
  bio: string
  profilePhoto?: string
  socialLinks: {
    platform: string
    url: string
  }[]
}

export interface PortfolioSkill {
  id: string
  name: string
  category: string
  proficiency: ProficiencyLevel
}

export interface PortfolioExperience {
  id: string
  role: string
  company: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
}

export interface PortfolioProject {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  githubLink?: string
  liveLink?: string
  featured: boolean
  version: number
}

export interface PortfolioWizard {
  id: string
  userId: string
  currentStep: number
  completed: boolean
  template?: TemplateType
  theme?: ThemeColor
  profile?: PortfolioProfile
  skills?: PortfolioSkill[]
  experiences?: PortfolioExperience[]
  projects?: PortfolioProject[]
  published: boolean
  completionPercentage: number
  createdAt: Date
  updatedAt: Date
}

// Certification options
export const CERTIFICATIONS = [
  "AWS Certified Solutions Architect",
  "Google Cloud Professional",
  "Microsoft Azure Administrator",
  "Certified Kubernetes Administrator",
  "HashiCorp Certified: Terraform Associate",
  "CompTIA Security+",
  "Certified ScrumMaster",
]

// Skill categories
export const SKILL_CATEGORIES = ["Frontend", "Backend", "DevOps", "Design", "Tools", "Cloud", "Mobile", "Data"]

// Portfolio templates
export const PORTFOLIO_TEMPLATES = [
  {
    id: "minimal" as const,
    name: "Minimal",
    description: "Clean and simple design focused on content",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=300&fit=crop",
    featured: false,
    premium: false,
  },
  {
    id: "modern" as const,
    name: "Modern",
    description: "Contemporary design with smooth animations",
    image: "https://images.unsplash.com/photo-1576158892330-3fd88f56623f?w=500&h=300&fit=crop",
    featured: true,
    premium: false,
  },
  {
    id: "creative" as const,
    name: "Creative",
    description: "Bold, artistic design for creative professionals",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
    featured: false,
    premium: true,
  },
  {
    id: "professional" as const,
    name: "Professional",
    description: "Corporate-style design for enterprises",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    featured: false,
    premium: false,
  },
  {
    id: "tech-focused" as const,
    name: "Tech Focused",
    description: "Developer-oriented design with code showcase",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    featured: false,
    premium: true,
  },
]
