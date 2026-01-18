"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { UserPlan } from "@/lib/mock-data"
import { Plus, Eye, Lock, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

interface QuickActionsProps {
  userPlan: UserPlan
}

export function QuickActions({ userPlan }: QuickActionsProps) {
  const actions = [
    {
      title: "Create Portfolio",
      description: "Start building a new professional portfolio",
      icon: Plus,
      href: "/dashboard/portfolio/new",
      action: true,
    },
    {
      title: "View Portfolios",
      description: "Browse all your portfolio projects",
      icon: Eye,
      href: "/dashboard/portfolios",
    },
    {
      title: "Analytics",
      description: "Track your portfolio performance",
      icon: BarChart3,
      href: "/dashboard/analytics",
      premium: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {actions.map((action) => {
        const Icon = action.icon
        const isPremiumLocked = action.premium && userPlan === "FREE"

        return (
          <div key={action.title}>
            {isPremiumLocked ? (
              <Card className="p-6 hover:shadow-premium transition-shadow relative overflow-hidden border-border/50 opacity-60">
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-8 h-8 text-muted-foreground" />
                  <Lock className="w-4 h-4 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </Card>
            ) : action.action ? (
              <Link href={action.href}>
                <Card className="p-6 hover:shadow-premium transition-all hover-lift border-border/50 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </Card>
              </Link>
            ) : (
              <Link href={action.href}>
                <Card className="p-6 hover:shadow-premium transition-all hover-lift border-border/50 cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </Card>
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}
