"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { PortfolioWizard } from "@/lib/wizard-types"
import { CheckCircle2, Globe, MessageSquare, Eye, Lock, ArrowRight } from "lucide-react"
import { useState } from "react"

interface Step6ReviewProps {
  wizard?: PortfolioWizard
  userPlan: "FREE" | "PREMIUM"
  onPublish?: () => void
}

export function Step6Review({ wizard, userPlan, onPublish }: Step6ReviewProps) {
  const [isPublishing, setIsPublishing] = useState(false)
  const [toggles, setToggles] = useState({
    public: true,
    showContact: true,
    allowComments: false,
  })

  const checklist = [
    { label: "Template Selected", completed: !!wizard?.template },
    { label: "Profile Information", completed: !!wizard?.profile?.fullName },
    { label: "Skills Added", completed: (wizard?.skills?.length || 0) > 0 },
    { label: "Experience Added", completed: (wizard?.experiences?.length || 0) > 0 },
    { label: "Projects Added", completed: (wizard?.projects?.length || 0) > 0 },
  ]

  const completedCount = checklist.filter((item) => item.completed).length

  const handlePublish = async () => {
    setIsPublishing(true)
    // Simulate publishing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsPublishing(false)
    onPublish?.()
  }

  return (
    <div className="space-y-8">
      {/* Completion Checklist */}
      <Card className="p-6 bg-muted/50 border-border">
        <h3 className="font-semibold text-foreground mb-4">Completion Checklist</h3>
        <div className="space-y-3 mb-6">
          {checklist.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              {item.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
              )}
              <span className={`text-sm ${item.completed ? "text-foreground" : "text-muted-foreground line-through"}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-accent h-full transition-all"
            style={{ width: `${(completedCount / checklist.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          {completedCount}/{checklist.length} steps completed
        </p>
      </Card>

      {/* Portfolio Preview Info */}
      <Card className="p-6 bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">Preview Your Portfolio</h4>
            <p className="text-sm text-muted-foreground">
              Your portfolio will use the {wizard?.template || "selected"} template with your{" "}
              {wizard?.profile?.fullName || "profile information"}. You can always edit this later.
            </p>
          </div>
        </div>
      </Card>

      {/* Publishing Options */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Publishing Settings</h3>

        <label className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={toggles.public}
            onChange={(e) => setToggles({ ...toggles, public: e.target.checked })}
            className="w-4 h-4 rounded accent-accent"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Make Portfolio Public</span>
            </div>
            <p className="text-sm text-muted-foreground">Your portfolio will be visible to anyone with the link</p>
          </div>
        </label>

        <label className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={toggles.showContact}
            onChange={(e) => setToggles({ ...toggles, showContact: e.target.checked })}
            className="w-4 h-4 rounded accent-accent"
          />
          <div className="flex-1">
            <span className="font-medium text-foreground">Show Contact Information</span>
            <p className="text-sm text-muted-foreground">Display your email and phone on your portfolio</p>
          </div>
        </label>

        {userPlan === "PREMIUM" && (
          <label className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={toggles.allowComments}
              onChange={(e) => setToggles({ ...toggles, allowComments: e.target.checked })}
              className="w-4 h-4 rounded accent-accent"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">Allow Comments</span>
              </div>
              <p className="text-sm text-muted-foreground">Visitors can leave feedback on your work</p>
            </div>
          </label>
        )}
      </div>

      {/* Domain Connection (Premium) */}
      {userPlan === "PREMIUM" ? (
        <Card className="p-6 bg-accent/5 border border-accent/20">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Custom Domain
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Connect your custom domain to make your portfolio truly yours.
          </p>
          <Button variant="outline">Connect Domain</Button>
        </Card>
      ) : (
        <Card className="p-6 bg-accent/5 border border-accent/20">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">Custom Domain</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Premium feature: Connect your custom domain to your portfolio.
              </p>
              <Badge className="bg-accent text-accent-foreground">Premium Only</Badge>
            </div>
          </div>
        </Card>
      )}

      {/* Publish Button */}
      <Button
        onClick={handlePublish}
        disabled={isPublishing || completedCount < checklist.length}
        className={`w-full py-3 font-semibold gap-2 ${
          isPublishing || completedCount < checklist.length
            ? "opacity-50 cursor-not-allowed"
            : "bg-accent hover:bg-accent/90 text-accent-foreground"
        }`}
      >
        {isPublishing ? (
          <>
            <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            Publish Portfolio
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">You can save as draft and continue editing anytime</p>
    </div>
  )
}
