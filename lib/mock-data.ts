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
// export const mockPortfolios: Portfolio[] = [
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
//   {
//     id: "port-2",
//     userId: "user-1",
//     title: "Developer Showcase",
//     template: "Tech Focused",
//     published: false,
//     completionPercentage: 45,
//     createdAt: new Date("2024-02-01"),
//     username: "sarah-dev",
//   },
//   {
//     id: "port-3",
//     userId: "user-1",
//     title: "Freelance Services",
//     template: "Professional",
//     published: true,
//     completionPercentage: 100,
//     createdAt: new Date("2023-12-10"),
//     username: "sarah-freelance",
//   },
// ]

// Mock projects
// export const mockProjects: Project[] = [
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
//   {
//     id: "proj-2",
//     userId: "user-1",
//     title: "Mobile App Design System",
//     featured: true,
//     description: "Design system and component library",
//     image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
//     images: [
//       "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1561716281-8d005ad26367?w=500&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1559163499-641a4ddfc6e1?w=500&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1555066931-4365d440a117?w=500&h=300&fit=crop",
//     ],
//   },
//   {
//     id: "proj-3",
//     userId: "user-1",
//     title: "Brand Identity Package",
//     featured: false,
//     description: "Logo, color palette, and brand guidelines",
//     image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
//     images: [
//       "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1561716281-8d005ad26367?w=500&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1559163499-641a4ddfc6e1?w=500&h=300&fit=crop",
//     ],
//   },
// ]

// Mock skills
// export const mockSkills: Skill[] = [
//   { id: "skill-1", userId: "user-1", name: "UI/UX Design", category: "Design", level: 5 },
//   { id: "skill-2", userId: "user-1", name: "Figma", category: "Design", level: 5 },
//   { id: "skill-3", userId: "user-1", name: "React", category: "Development", level: 4 },
//   { id: "skill-4", userId: "user-1", name: "TypeScript", category: "Development", level: 4 },
//   { id: "skill-5", userId: "user-1", name: "CSS/Tailwind", category: "Development", level: 5 },
//   { id: "skill-6", userId: "user-1", name: "Branding", category: "Design", level: 3 },
// ]

// Mock analytics
// export const mockAnalytics: AnalyticsData = {
//   userId: "user-1",
//   views: 2847,
//   uniqueVisitors: 412,
//   monthlyStats: [
//     { month: "Jan", views: 320, visitors: 45 },
//     { month: "Feb", views: 480, visitors: 68 },
//     { month: "Mar", views: 620, visitors: 95 },
//     { month: "Apr", views: 540, visitors: 72 },
//     { month: "May", views: 785, visitors: 128 },
//     { month: "Jun", views: 287, visitors: 104 },
//   ],
// }

// Mock wizard data
// export const mockPortfolioWizards: PortfolioWizard[] = [
//   {
//     id: "wizard-1",
//     userId: "user-1",
//     currentStep: 1,
//     completed: false,
//     template: "modern",
//     theme: "teal",
//     profile: {
//       fullName: "Sarah Johnson",
//       title: "Product Designer & Strategist",
//       location: "San Francisco, CA",
//       email: "sarah@example.com",
//       phone: "+1 (555) 123-4567",
//       website: "https://sarahjohnson.com",
//       bio: "Passionate about creating beautiful, functional digital experiences. 8+ years in product design with expertise in SaaS and startups.",
//       profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
//       socialLinks: [
//         { platform: "LinkedIn", url: "https://linkedin.com/in/sarahj" },
//         { platform: "Dribbble", url: "https://dribbble.com/sarahj" },
//         { platform: "Twitter", url: "https://twitter.com/sarahj" },
//       ],
//     },
//     skills: [
//       { id: "s1", name: "UI/UX Design", category: "Design", proficiency: 4 },
//       { id: "s2", name: "Figma", category: "Design", proficiency: 4 },
//       { id: "s3", name: "Product Strategy", category: "Design", proficiency: 3 },
//     ],
//     experiences: [
//       {
//         id: "e1",
//         role: "Senior Product Designer",
//         company: "Vercel",
//         startDate: "2022-01-15",
//         current: true,
//         description: "Leading design system and product design initiatives for the platform.",
//       },
//       {
//         id: "e2",
//         role: "Product Designer",
//         company: "Linear",
//         startDate: "2019-06-01",
//         endDate: "2021-12-31",
//         current: false,
//         description: "Designed core product features and user experiences.",
//       },
//     ],
//     projects: [
//       {
//         id: "p1",
//         title: "Design System Overhaul",
//         description: "Created comprehensive design system with 200+ components",
//         technologies: ["Figma", "React", "TypeScript"],
//         featured: true,
//         version: 1,
//       },
//     ],
//     completionPercentage: 60,
//     published: false,
//     createdAt: new Date("2024-01-20"),
//     updatedAt: new Date(),
//   },
// ]
