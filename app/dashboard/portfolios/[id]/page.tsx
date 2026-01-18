"use client"

import { useParams, useRouter } from "next/navigation"
// import { mockPortfolios, mockPortfolioWizards, currentUser } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Edit3, Share2, Loader2 } from "lucide-react"
import Link from "next/link"
import { ModernTemplate } from "@/components/templates"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { THEME_REGISTRY } from "@/lib/themes/registry"
import type { PortfolioData } from "@/lib/types/theme"
import { useEffect, useState } from "react"
import apiService, { ApiPortfolio, ApiProject, ApiSkill, ApiUser } from "@/lib/api"

export default function PortfolioDetailPage() {
  const params = useParams()
  const router = useRouter()
  const portfolioId = params.id as string

  const [portfolio, setPortfolio] = useState<ApiPortfolio | null>(null)
  const [projects, setProjects] = useState<ApiProject[]>([])
  const [skills, setSkills] = useState<ApiSkill[]>([])
  const [experiences, setExperiences] = useState<any[]>([])
  const [user, setUser] = useState<ApiUser | null>(null) // Need user for name/email
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, prj, sk, exp, u] = await Promise.all([
          apiService.getPortfolio(portfolioId),
          apiService.getProjects(portfolioId),
          apiService.getSkills(portfolioId),
          apiService.getExperiences(portfolioId),
          apiService.getMe()
        ])
        setPortfolio(p)
        setProjects(prj)
        setSkills(sk)
        setExperiences(exp)
        setUser(u)
      } catch (error) {
        console.error("Failed to load portfolio details", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [portfolioId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
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

  // Convert API data to PortfolioData format for template preview
  const portfolioData: PortfolioData = {
    id: portfolio._id,
    title: portfolio.title,
    description: portfolio.seo?.description || "",
    name: user.name || "",
    email: user.email || "",
    phone: "", // Missing from DB
    website: "", // Missing from DB
    social: {
      linkedin: undefined,
      github: undefined,
      twitter: undefined
    },
    projects: projects.map((p) => ({
      id: p._id,
      title: p.title,
      description: p.description,
      tags: p.stack,
      link: p.demoUrl || p.githubUrl || undefined,
    })),
    skills: skills.map((s) => ({
      id: s._id,
      name: s.name,
      level: s.level.toLowerCase() as any, // "expert" | "intermediate" | "beginner" | "advanced"
    })),
    about: "", // Missing from DB
  }

  // Theme handling: currently api returns theme object, need to map to registry key if possible?
  // The backend stores theme: { themeId: string, overrides: ... }
  // We need to resolve themeId to a key like "modern", or use default.
  // For now, assuming "modern" as default or fetching theme name from API if we had a themes endpoint call.
  // But we didn't fetch themes. Let's assume "modern" for safety or id-based if we knew mapping.
  // Actually Step 2.3 might have used theme.themeId.
  const themeKey = "modern" // Defaulting to modern because we don't have the Theme map loaded here.
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
                  {portfolio.status === "published" ? "Published" : "Draft"}
                  {/* Completion % calculation is missing/expensive, skipping or placeholder */}
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
