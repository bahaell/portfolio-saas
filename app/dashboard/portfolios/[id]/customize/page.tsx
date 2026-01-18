"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ThemeBuilder } from "@/components/builder/theme-builder"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { mockPortfolios, mockPortfolioWizards, currentUser } from "@/lib/mock-data"
import type { PortfolioData } from "@/lib/types/theme"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Save, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function CustomizePortfolioPage() {
  const params = useParams()
  const router = useRouter()
  const portfolioId = params.id as string
  const [isSaving, setIsSaving] = useState(false)
  const [selectedThemeId, setSelectedThemeId] = useState("modern")
  const [themeOverrides, setThemeOverrides] = useState({})

  // Get portfolio data from mock data
  const portfolio = mockPortfolios.find((p) => p.id === portfolioId && p.userId === currentUser.id)
  const wizard = mockPortfolioWizards.find((w) => w.userId === currentUser.id)

  if (!portfolio || !wizard) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Portfolio not found</h1>
          <p className="text-muted-foreground mb-4">The portfolio you're looking for doesn't exist.</p>
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
      link: p.featured ? `/portfolio/${portfolio.id}/project/${p.id}` : undefined,
    })),
    skills: wizard.skills?.map((s) => ({
      id: s.id,
      name: s.name,
      level: s.proficiency === 4 || s.proficiency === 5 ? "expert" : s.proficiency === 3 ? "intermediate" : "beginner",
    })),
    about: wizard.profile?.bio,
  }

  const handleSaveTheme = async (themeData: { themeId: string; overrides: Record<string, any> }) => {
    setIsSaving(true)
    try {
      // In a real app, save to database
      console.log("Saving theme customizations:", themeData)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <ThemeProvider initialThemeId={wizard.theme || "modern"}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Top Navigation - Enhanced Header with Breadcrumb */}
        <div className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/60 border-b border-slate-700/50 shadow-lg">
          <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/portfolios">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-slate-800/60 text-slate-300 hover:text-white transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Link href="/dashboard/portfolios" className="hover:text-slate-300">
                  Portfolios
                </Link>
                <span>/</span>
                <Link href={`/dashboard/portfolios/${portfolioId}`} className="hover:text-slate-300">
                  {portfolio.title}
                </Link>
                <span>/</span>
                <span className="text-white">Customize</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="text-slate-300 hover:text-white hover:bg-slate-800 bg-transparent"
                onClick={() => handleSaveTheme({ themeId: selectedThemeId, overrides: themeOverrides })}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                disabled={isSaving}
                className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/20 transition-all duration-200 disabled:opacity-50"
                onClick={() => handleSaveTheme({ themeId: selectedThemeId, overrides: themeOverrides })}
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <ThemeBuilder
            initialThemeId={wizard.theme || "modern"}
            portfolio={portfolioData}
            userTier={currentUser.plan === "PREMIUM" ? "premium" : "free"}
            onSave={handleSaveTheme}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}
