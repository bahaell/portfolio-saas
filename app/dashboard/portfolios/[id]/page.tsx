"use client"

import { useParams, useRouter } from "next/navigation"
import { mockPortfolios, mockPortfolioWizards, currentUser } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Edit3, Share2 } from "lucide-react"
import Link from "next/link"
import { ModernTemplate } from "@/components/templates"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { THEME_REGISTRY } from "@/lib/themes/registry"
import type { PortfolioData } from "@/lib/types/theme"

export default function PortfolioDetailPage() {
  const params = useParams()
  const router = useRouter()
  const portfolioId = params.id as string

  const portfolio = mockPortfolios.find((p) => p.id === portfolioId && p.userId === currentUser.id)
  const wizard = mockPortfolioWizards.find((w) => w.userId === currentUser.id)

  if (!portfolio || !wizard) {
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

  // Convert wizard data to PortfolioData format
  const portfolioData: PortfolioData = {
    id: portfolio.id,
    title: portfolio.title,
    description: wizard.profile?.bio || "",
    name: wizard.profile?.fullName || "",
    email: wizard.profile?.email || "",
    phone: wizard.profile?.phone,
    website: wizard.profile?.website,
    social: {
      linkedin: wizard.profile?.socialLinks?.find((s) => s.platform === "LinkedIn")?.url,
      github: wizard.profile?.socialLinks?.find((s) => s.platform === "GitHub")?.url,
      twitter: wizard.profile?.socialLinks?.find((s) => s.platform === "Twitter")?.url,
    },
    projects: wizard.projects?.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      tags: p.technologies,
      link: `/portfolio/${portfolio.id}/project/${p.id}`,
    })),
    skills: wizard.skills?.map((s) => ({
      id: s.id,
      name: s.name,
      level: s.proficiency === 4 || s.proficiency === 5 ? "expert" : s.proficiency === 3 ? "intermediate" : "beginner",
    })),
    about: wizard.profile?.bio,
  }

  const theme = THEME_REGISTRY[wizard.theme || "modern"] || THEME_REGISTRY.modern

  return (
    <ThemeProvider initialThemeId={wizard.theme || "modern"}>
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
                  {portfolio.published ? "Published" : "Draft"} • {portfolio.completionPercentage}% complete
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Link href={`/dashboard/portfolios/${portfolio.id}/customize`}>
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
