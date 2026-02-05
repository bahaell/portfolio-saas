"use client"

import { cn } from "@/lib/utils"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PORTFOLIO_TEMPLATES } from "@/lib/wizard-types"
import type { TemplateType } from "@/lib/wizard-types"
import { CheckCircle2, Eye, Lock, Sparkles } from "lucide-react"
import { useState } from "react"
import { PlanType, PLANS } from "@/lib/config/plans"

interface Step1TemplateProps {
  selected?: TemplateType
  onSelect: (template: TemplateType) => void
  userPlan: PlanType
}

export function Step1Template({ selected, onSelect, userPlan }: Step1TemplateProps) {
  const [previewModal, setPreviewModal] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          Choose your template
        </h3>
        <p className="text-muted-foreground">
          Select a design that matches your style. You can customize colors and layout later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PORTFOLIO_TEMPLATES.map((template) => {
          // Check if plan allows premium templates
          const allowsPremium = PLANS[userPlan].premiumTemplates;
          const isLocked = template.premium && !allowsPremium;
          const isSelected = selected === template.id

          return (
            <div key={template.id} onClick={() => !isLocked && onSelect(template.id)} className="cursor-pointer group">
              <Card
                className={cn(
                  `overflow-hidden border-2 transition-all duration-300 hover-lift ${isSelected
                    ? "border-accent shadow-premium-lg bg-accent/5 scale-105"
                    : "border-border/50 hover:border-accent/50 hover:shadow-lg"
                  } ${isLocked ? "opacity-60" : ""}`,
                )}
              >
                {/* Template preview image */}
                <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {isLocked && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <Lock className="w-8 h-8 text-white mx-auto mb-2" />
                        <p className="text-white text-xs font-medium">Premium</p>
                      </div>
                    </div>
                  )}
                  {template.featured && (
                    <Badge className="absolute top-3 right-3 bg-accent shadow-lg scale-105">Featured</Badge>
                  )}
                </div>

                {/* Template info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground text-base">{template.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    </div>
                    {isSelected && (
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-6 h-6 text-accent shadow-lg shadow-accent/50" />
                      </div>
                    )}
                  </div>

                  {template.premium && !PLANS[userPlan].premiumTemplates && (
                    <Badge variant="outline" className="mb-3">
                      Premium
                    </Badge>
                  )}

                  <div className="flex gap-2 pt-3 border-t border-border/30">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent hover:bg-muted/50"
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreviewModal(template.id)
                      }}
                      disabled={isLocked}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    {!isLocked && (
                      <Button
                        size="sm"
                        className={`flex-1 ${isSelected
                          ? "bg-accent text-accent-foreground hover:bg-accent/90"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                          }`}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )
        })}
      </div>

      {previewModal && (
        <Card className="p-6 bg-accent/5 border border-accent/20 animate-slide-up">
          <p className="text-sm text-muted-foreground">
            Preview functionality coming soon. You can customize this template in the next steps!
          </p>
        </Card>
      )}
    </div>
  )
}
