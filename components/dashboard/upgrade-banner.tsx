"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface UpgradeBannerProps {
  userTier: "free" | "premium"
}

export function UpgradeBanner({ userTier }: UpgradeBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (userTier === "premium" || dismissed) {
    return null
  }

  return (
    <Card className="border-accent/30 bg-gradient-to-r from-accent/10 to-accent/5 mb-6">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">Upgrade to Premium</p>
            <p className="text-xs text-muted-foreground mt-1">
              Unlock advanced customization, premium templates, and analytics for your portfolios
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/settings#upgrade">
            <Button size="sm" className="gap-2 bg-accent hover:bg-accent/90">
              <Zap className="w-4 h-4" />
              Upgrade
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setDismissed(true)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
