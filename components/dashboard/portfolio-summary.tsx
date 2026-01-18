"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Portfolio } from "@/lib/mock-data"
import Link from "next/link"
import { BookOpen, Globe } from "lucide-react"

interface PortfolioSummaryProps {
  portfolios: Portfolio[]
}

export function PortfolioSummary({ portfolios }: PortfolioSummaryProps) {
  const publishedCount = portfolios.filter((p) => p.published).length
  const avgCompletion = Math.round(portfolios.reduce((sum, p) => sum + p.completionPercentage, 0) / portfolios.length)

  if (portfolios.length === 0) {
    return (
      <Card className="p-8 text-center border-border/50">
        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No portfolios yet</h3>
        <p className="text-muted-foreground mb-4">Create your first portfolio to get started.</p>
        <Link href="/dashboard/portfolios">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            Create Portfolio
          </button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Stats cards */}
      <Card className="p-6 border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Portfolios</p>
            <p className="text-3xl font-bold text-foreground">{portfolios.length}</p>
          </div>
          <BookOpen className="w-8 h-8 text-primary/20" />
        </div>
      </Card>

      <Card className="p-6 border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Published</p>
            <p className="text-3xl font-bold text-foreground">{publishedCount}</p>
          </div>
          <Globe className="w-8 h-8 text-accent/20" />
        </div>
      </Card>

      <Card className="p-6 border-border/50">
        <div>
          <p className="text-sm text-muted-foreground mb-3">Avg. Completion</p>
          <div className="flex items-center gap-3">
            <Progress value={avgCompletion} className="flex-1" />
            <span className="text-lg font-bold text-foreground">{avgCompletion}%</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
