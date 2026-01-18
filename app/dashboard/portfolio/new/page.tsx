"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { WizardLayout } from "@/components/wizard/wizard-layout";
import { Step1Template } from "@/components/wizard/step-1-template";
import { Step2Profile } from "@/components/wizard/step-2-profile";
import { Step3Skills } from "@/components/wizard/step-3-skills";
import { Step4Experience } from "@/components/wizard/step-4-experience";
import { Step5Projects } from "@/components/wizard/step-5-projects";
import { Step6Review } from "@/components/wizard/step-6-review";
import apiService, { ApiUser } from "@/lib/api";
import type { PortfolioWizard } from "@/lib/wizard-types";
import { Loader2 } from "lucide-react";

const TOTAL_STEPS = 6;

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
];

export default function NewPortfolioWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [user, setUser] = useState<ApiUser | null>(null);

  const [wizardData, setWizardData] = useState<Partial<PortfolioWizard>>({
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
  });

  useEffect(() => {
    const init = async () => {
      try {
        const userData = await apiService.getMe();
        setUser(userData);
        setWizardData((prev) => ({
          ...prev,
          userId: userData._id,
        }));
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      const completion = Math.round((currentStep / TOTAL_STEPS) * 100);
      setWizardData((prev) => ({
        ...prev,
        currentStep: currentStep + 1,
        completionPercentage: completion,
      }));
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = async () => {
    if (!user || publishing) return;
    setPublishing(true);

    try {
      // 1. Create Portfolio
      // Note: Wizard doesn't explicity ask for 'title' in screens?
      // Step6Review might have it or we generate it.
      // Usually Step 1 is Template.
      // Let's assume title is "My Portfolio" or derived from Name if missing.
      const title = wizardData.profile?.fullName
        ? `${wizardData.profile.fullName}'s Portfolio`
        : "My Portfolio";
      // Random slug for now or derived
      const slug =
        (wizardData.profile?.fullName?.toLowerCase().replace(/\s+/g, "-") ||
          "portfolio") +
        "-" +
        Date.now();

      // We need a valid templateId. Wizard passes `template`.
      // If template is just a string name, we might need to fetch real template ID?
      // For now, assuming provided template string needs mapping or is enough if backend adapts.
      // However, our backend `Portfolio` model expects `templateId` (ObjectId).
      // If `wizardData.template` is an ID, great. If string, we might fail validation.
      // Let's first fetch templates to find a match if safe?
      // For simplicity/robustness, let's look up a template or use a default if we can't find one.
      const templates = await apiService.getTemplates();
      const selectedTemplateId =
        templates.find((t: any) => t.name === wizardData.template)?._id ||
        templates[0]?._id; // Fallback

      // Need a theme too.
      const themes = await apiService.getThemes();
      const defaultThemeId = themes[0]?._id;

      const portfolioPayload = {
        userId: user._id,
        title: title,
        slug: slug,
        status: "published",
        templateId: selectedTemplateId,
        theme: {
          themeId: defaultThemeId,
          overrides: {},
        },
      };

      console.log("Creating portfolio...", portfolioPayload);
      const createdPortfolio = await apiService.createPortfolio(portfolioPayload);

      // 2. Create Skills
      if (wizardData.skills && wizardData.skills.length > 0) {
        await Promise.all(
          wizardData.skills.map((skill) =>
            apiService.createSkill({
              portfolioId: createdPortfolio._id,
              name: skill.name,
              level: getLevelString(skill.proficiency), // Map number to string
              category: skill.category || "Other",
            })
          )
        );
      }

      // 3. Create Projects
      if (wizardData.projects && wizardData.projects.length > 0) {
        await Promise.all(
          wizardData.projects.map((project) =>
            apiService.createProject({
              portfolioId: createdPortfolio._id,
              title: project.title,
              description: project.description,
              stack: project.technologies,
              demourl: project.link,
              // images? Wizard might have image urls?
            })
          )
        );
      }

      // 4. Create Experiences
      if (wizardData.experiences && wizardData.experiences.length > 0) {
        await Promise.all(
          wizardData.experiences.map((exp) =>
            apiService.createExperience({
              portfolioId: createdPortfolio._id,
              company: exp.company,
              role: exp.position,
              startDate: exp.startDate,
              endDate: exp.endDate,
              description: exp.description,
            })
          )
        );
      }

      // Redirect
      router.push("/dashboard/portfolios");
    } catch (error) {
      console.error("Failed to publish portfolio:", error);
      setPublishing(false);
    }
  };

  const getLevelString = (level: number) => {
    if (level <= 1) return "Beginner";
    if (level === 2) return "Intermediate";
    if (level === 3) return "Advanced";
    return "Expert";
  };

  const stepsWithCompletion = wizardSteps.map((step) => ({
    ...step,
    completed:
      step.number < currentStep ||
      (step.number === 1 && !!wizardData.template) ||
      (step.number === 2 && !!wizardData.profile?.fullName) ||
      (step.number === 3 && (wizardData.skills?.length || 0) > 0) ||
      (step.number === 4 && (wizardData.experiences?.length || 0) > 0) ||
      (step.number === 5 && (wizardData.projects?.length || 0) > 0),
  }));

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <WizardLayout
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
      steps={stepsWithCompletion}
      onNext={handleNext}
      onPrevious={handlePrevious}
      userPlan={user?.plan || "FREE"}
    >
      {currentStep === 1 && (
        <Step1Template
          selected={wizardData.template}
          onSelect={(template) =>
            setWizardData((prev) => ({ ...prev, template }))
          }
          userPlan={user?.plan || "FREE"}
        />
      )}

      {currentStep === 2 && (
        <Step2Profile
          profile={wizardData.profile}
          onUpdate={(profile) =>
            setWizardData((prev) => ({ ...prev, profile }))
          }
        />
      )}

      {currentStep === 3 && (
        <Step3Skills
          skills={wizardData.skills}
          onUpdate={(skills) => setWizardData((prev) => ({ ...prev, skills }))}
        />
      )}

      {currentStep === 4 && (
        <Step4Experience
          experiences={wizardData.experiences}
          onUpdate={(experiences) =>
            setWizardData((prev) => ({ ...prev, experiences }))
          }
        />
      )}

      {currentStep === 5 && (
        <Step5Projects
          projects={wizardData.projects}
          onUpdate={(projects) =>
            setWizardData((prev) => ({ ...prev, projects }))
          }
          userPlan={user?.plan || "FREE"}
        />
      )}

      {currentStep === 6 && (
        <Step6Review
          wizard={wizardData as PortfolioWizard}
          userPlan={user?.plan || "FREE"}
          onPublish={handlePublish}
          isPublishing={publishing}
        />
      )}
    </WizardLayout>
  );
}
