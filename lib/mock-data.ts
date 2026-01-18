// Mock data for Portfolio Builder SaaS application
import type { PortfolioWizard } from "./wizard-types"

export type UserPlan = "FREE" | "PREMIUM"

export interface User {
  id: string
  name: string
  email: string
  plan: UserPlan
  avatar?: string
}

export interface Portfolio {
  id: string
  userId: string
  title: string
  template: string
  published: boolean
  completionPercentage: number
  createdAt: Date
  username?: string
}

export interface Project {
  id: string
  userId: string
  title: string
  featured: boolean
  description: string
  image?: string
  images?: string[]
}

export interface Skill {
  id: string
  userId: string
  name: string
  category: string
  level: 1 | 2 | 3 | 4 | 5
}

export interface AnalyticsData {
  userId: string
  views: number
  uniqueVisitors: number
  monthlyStats: {
    month: string
    views: number
    visitors: number
  }[]
}

// Current logged-in user (mock)
// export const currentUser: User = {
//   id: "user-1",
//   name: "Sarah Johnson",
//   email: "sarah@example.com",
//   plan: "PREMIUM",
//   avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
// }

// Free user for comparison
// export const freeUser: User = {
//   id: "user-2",
//   name: "John Doe",
//   email: "john@example.com",
//   plan: "FREE",
//   avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
// }

// Mock portfolios
export const mockPortfolios: Portfolio[] = []
// [
//   {
//     id: "port-1",
//     userId: "user-1",
//     title: "Creative Designer Portfolio",
//     template: "Modern Minimal",
//     published: true,
//     completionPercentage: 85,
//     createdAt: new Date("2024-01-15"),
//     username: "sarah-johnson",
//   },
//   ...
// ]

// Mock projects
export const mockProjects: Project[] = []
// [
//   {
//     id: "proj-1",
//     userId: "user-1",
//     title: "E-commerce Platform Redesign",
//     featured: true,
//     description: "Complete UI/UX overhaul for a SaaS product",
//     image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
//     images: [
//       "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1561716281-8d005ad26367?w=500&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1559163499-641a4ddfc6e1?w=500&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1555066931-4365d440a117?w=500&h=300&fit=crop",
//     ],
//   },
//   ...
// ]

// Mock skills
export const mockSkills: Skill[] = []
// [
//   { id: "skill-1", userId: "user-1", name: "UI/UX Design", category: "Design", level: 5 },
//   ...
// ]

// Mock analytics
export const mockAnalytics: AnalyticsData = {
  userId: "user-1",
  views: 0,
  uniqueVisitors: 0,
  monthlyStats: [],
}
// {
//   userId: "user-1",
//   views: 2847,
//   uniqueVisitors: 412,
//   monthlyStats: [
//     { month: "Jan", views: 320, visitors: 45 },
//     ...
//   ],
// }

// Mock wizard data
export const mockPortfolioWizards: PortfolioWizard[] = []
// [
//   {
//     id: "wizard-1",
//     userId: "user-1",
//     currentStep: 1,
//     completed: false,
//     template: "modern",
//     theme: "teal",
//     profile: {
//       fullName: "Sarah Johnson",
//       ...
//     },
//     ...
//   },
// ]
