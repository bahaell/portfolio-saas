"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import apiService, { ApiPortfolio, ApiUser, ApiProject, ApiSkill } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Edit3, Share2, Loader2 } from "lucide-react"
import Link from "next/link"
import { ModernTemplate } from "@/components/templates"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { THEME_REGISTRY } from "@/lib/themes/registry"
import type { PortfolioData } from "@/lib/types/theme"

export default function PortfolioDetailPage() {
  const params = useParams()
  const router = useRouter()
  const portfolioId = params.id as string

  const [portfolio, setPortfolio] = useState<ApiPortfolio | null>(null)
  const [projects, setProjects] = useState<ApiProject[]>([])
  const [skills, setSkills] = useState<ApiSkill[]>([])
  const [user, setUser] = useState<ApiUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolioData, projectsData, skillsData, userData] = await Promise.all([
          apiService.getPortfolio(portfolioId),
          apiService.getProjects(portfolioId),
          apiService.getSkills(portfolioId),
          apiService.getMe()
        ])
        setPortfolio(portfolioData)
        setProjects(projectsData)
        setSkills(skillsData)
        setUser(userData)
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [portfolioId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!portfolio || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Portfolio not found</h1>
          <Link href="/dashboard/portfolios">
            <Button variant="outline">Back to Portfolios</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Convert API data to PortfolioData format
  const portfolioData: PortfolioData = {
    id: portfolio._id,
    title: portfolio.title,
    description: portfolio.seo?.description || "",
    name: user.name,
    email: user.email,
    // phone: "", // Not available in basic ApiUser
    // website: "", // Not available
    social: {
      // linkedin: ...,
    },
    projects: projects.map((p) => ({
      id: p._id,
      title: p.title,
      description: p.description,
      tags: p.stack,
      link: `/portfolio/${portfolio._id}/project/${p._id}`,
    })),
    skills: skills.map((s) => ({
      id: s._id,
      name: s.name,
      level: s.level.toLowerCase() as any, // "expert" | "intermediate" | "beginner" mapping needed if exact match required
    })),
    about: portfolio.seo?.description || "", // Fallback
  }

  // Handle theme template registry lookup
  // Assuming templateId maps to a key in registry or we use 'modern' as default
  const themeKey = "modern" // Simplified for now as templateId might be an ID not a name
  const theme = THEME_REGISTRY[themeKey] || THEME_REGISTRY.modern

  return (
    <ThemeProvider initialThemeId={themeKey}>
      <div className="min-h-screen bg-background">
        {/* Top Navigation */}
        <div className="border-b border-border bg-card">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/portfolios">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">{portfolio.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {portfolio.status === "published" ? "Published" : "Draft"} • 100% complete
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Link href={`/dashboard/portfolios/${portfolio._id}/customize`}>
                <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Edit3 className="w-4 h-4" />
                  Customize
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Card className="overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              <ModernTemplate portfolio={portfolioData} theme={theme} />
            </div>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  )
}
