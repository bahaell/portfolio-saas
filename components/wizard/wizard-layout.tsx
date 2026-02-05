"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { CheckCircle2, ChevronRight, Lock } from "lucide-react"

import { PlanType } from "@/lib/config/plans"

interface WizardStep {
  number: number
  title: string
  description?: string
  completed?: boolean
  locked?: boolean
}

interface WizardLayoutProps {
  currentStep: number
  totalSteps: number
  steps: WizardStep[]
  children: React.ReactNode
  onNext?: () => void
  onPrevious?: () => void
  userPlan: PlanType
}

export function WizardLayout({
  currentStep,
  totalSteps,
  steps,
  children,
  onNext,
  onPrevious,
  userPlan,
}: WizardLayoutProps) {
  const completionPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header with progress */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Create Your Portfolio</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete all steps to publish your professional showcase
                </p>
              </div>
              <span className="text-sm font-semibold text-accent px-3 py-1 bg-accent/10 rounded-full">
                {currentStep}/{totalSteps}
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2 bg-border/40" />
          </div>

          {/* Step indicator with animation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-xl font-semibold text-sm transition-all duration-300 hover-lift",
                    step.locked
                      ? "bg-muted/50 text-muted-foreground cursor-not-allowed border border-border/50"
                      : step.completed
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : step.number === currentStep
                          ? "bg-accent text-accent-foreground ring-2 ring-accent/50 shadow-lg shadow-accent/30 scale-110"
                          : "bg-muted/70 text-muted-foreground border border-border/50 hover:bg-muted hover:border-border",
                  )}
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : step.locked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    step.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 h-1 rounded-full transition-all duration-500",
                      step.number < currentStep ? "bg-gradient-to-r from-primary to-primary/50" : "bg-muted/40",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Step header */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-2">{steps[currentStep - 1]?.title}</h2>
          {steps[currentStep - 1]?.description && (
            <p className="text-lg text-muted-foreground leading-relaxed">{steps[currentStep - 1].description}</p>
          )}
        </div>

        {/* Step content */}
        <Card className="p-8 border-border/40 mb-8 shadow-premium bg-white/50 backdrop-blur-sm hover:shadow-premium-lg transition-all duration-300">
          {children}
        </Card>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-4 pt-6">
          <button
            onClick={onPrevious}
            disabled={currentStep === 1}
            className="px-6 py-3 text-sm font-medium rounded-xl border border-border/60 hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm active:scale-95"
          >
            Previous Step
          </button>

          <div className="text-sm font-medium text-muted-foreground bg-muted/40 px-4 py-2 rounded-lg">
            {currentStep} <span className="text-border/60 mx-1">/</span> {totalSteps}
          </div>

          <button
            onClick={onNext}
            disabled={currentStep === totalSteps}
            className="px-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:shadow-accent/30 active:scale-95 flex items-center gap-2"
          >
            Next Step <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
