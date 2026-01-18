"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { WizardLayout } from "@/components/wizard/wizard-layout"
import { Step1Template } from "@/components/wizard/step-1-template"
import { Step2Profile } from "@/components/wizard/step-2-profile"
import { Step3Skills } from "@/components/wizard/step-3-skills"
import { Step4Experience } from "@/components/wizard/step-4-experience"
import { Step5Projects } from "@/components/wizard/step-5-projects"
import { Step6Review } from "@/components/wizard/step-6-review"
import { currentUser, mockPortfolioWizards } from "@/lib/mock-data"
import type { PortfolioWizard } from "@/lib/wizard-types"

const TOTAL_STEPS = 6

const wizardSteps = [
  {
    number: 1,
    title: "Choose Template",
    description: "Select a design that matches your professional style",
  },
  {
    number: 2,
    title: "Profile Information",
    description: "Tell us about yourself and your professional summary",
  },
  {
    number: 3,
    title: "Skills & Certifications",
    description: "Showcase your expertise and credentials",
  },
  {
    number: 4,
    title: "Work Experience",
    description: "Add your professional background and roles",
  },
  {
    number: 5,
    title: "Projects",
    description: "Highlight your best work and achievements",
  },
  {
    number: 6,
    title: "Review & Publish",
    description: "Review everything and publish your portfolio",
  },
]

export default function NewPortfolioWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState<Partial<PortfolioWizard>>(
    mockPortfolioWizards[0] || {
      userId: currentUser.id,
      currentStep: 1,
      completionPercentage: 0,
      published: false,
      skills: [],
      experiences: [],
      projects: [],
      profile: {
        fullName: "",
        title: "",
        location: "",
        email: "",
        bio: "",
        socialLinks: [],
      },
    },
  )

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
      // Calculate completion percentage
      const completion = Math.round((currentStep / TOTAL_STEPS) * 100)
      setWizardData((prev) => ({
        ...prev,
        currentStep: currentStep + 1,
        completionPercentage: completion,
      }))
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePublish = () => {
    // Mark as published and redirect
    setWizardData((prev) => ({
      ...prev,
      published: true,
      completionPercentage: 100,
    }))
    // Redirect to portfolios page
    setTimeout(() => {
      router.push("/dashboard/portfolios")
    }, 500)
  }

  const stepsWithCompletion = wizardSteps.map((step) => ({
    ...step,
    completed:
      step.number < currentStep ||
      (step.number === 1 && !!wizardData.template) ||
      (step.number === 2 && !!wizardData.profile?.fullName) ||
      (step.number === 3 && (wizardData.skills?.length || 0) > 0) ||
      (step.number === 4 && (wizardData.experiences?.length || 0) > 0) ||
      (step.number === 5 && (wizardData.projects?.length || 0) > 0),
  }))

  return (
    <WizardLayout
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
      steps={stepsWithCompletion}
      onNext={handleNext}
      onPrevious={handlePrevious}
      userPlan={currentUser.plan}
    >
      {currentStep === 1 && (
        <Step1Template
          selected={wizardData.template}
          onSelect={(template) => setWizardData((prev) => ({ ...prev, template }))}
          userPlan={currentUser.plan}
        />
      )}

      {currentStep === 2 && (
        <Step2Profile
          profile={wizardData.profile}
          onUpdate={(profile) => setWizardData((prev) => ({ ...prev, profile }))}
        />
      )}

      {currentStep === 3 && (
        <Step3Skills skills={wizardData.skills} onUpdate={(skills) => setWizardData((prev) => ({ ...prev, skills }))} />
      )}

      {currentStep === 4 && (
        <Step4Experience
          experiences={wizardData.experiences}
          onUpdate={(experiences) => setWizardData((prev) => ({ ...prev, experiences }))}
        />
      )}

      {currentStep === 5 && (
        <Step5Projects
          projects={wizardData.projects}
          onUpdate={(projects) => setWizardData((prev) => ({ ...prev, projects }))}
          userPlan={currentUser.plan}
        />
      )}

      {currentStep === 6 && (
        <Step6Review wizard={wizardData as PortfolioWizard} userPlan={currentUser.plan} onPublish={handlePublish} />
      )}
    </WizardLayout>
  )
}
