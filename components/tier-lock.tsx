"use client"

import { Lock, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TierLockProps {
  feature: string
  userTier: "free" | "premium"
  description?: string
}

export function TierLock({ feature, userTier, description }: TierLockProps) {
  if (userTier === "premium") {
    return null
  }

  return (
    <Card className="p-4 border-accent/30 bg-accent/5">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-accent/10">
          <Lock className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-foreground mb-1">{feature} - Premium Only</p>
          {description && <p className="text-xs text-muted-foreground mb-3">{description}</p>}
          <Link href="/dashboard/settings#upgrade">
            <Button size="sm" variant="default" className="gap-2 bg-accent hover:bg-accent/90">
              <Zap className="w-4 h-4" />
              Upgrade Now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
