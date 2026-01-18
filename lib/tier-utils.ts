import type { UserTier } from "@/lib/types/theme"

export const TIER_FEATURES = {
  free: {
    maxPortfolios: 1,
    maxProjects: 5,
    maxSkills: 10,
    templates: ["modern", "minimal"],
    customization: ["colors"],
    analytics: false,
    customDomain: false,
    seo: false,
  },
  premium: {
    maxPortfolios: 5,
    maxProjects: 50,
    maxSkills: 100,
    templates: ["modern", "minimal", "premium"],
    customization: ["colors", "fonts", "spacing", "radius"],
    analytics: true,
    customDomain: true,
    seo: true,
  },
}

export function hasFeature(tier: UserTier, feature: keyof (typeof TIER_FEATURES)[UserTier]): boolean {
  const tierFeatures = TIER_FEATURES[tier]
  const value = tierFeatures[feature]

  // For array features, check if they exist
  if (Array.isArray(value)) {
    return value.length > 0
  }

  // For boolean features
  if (typeof value === "boolean") {
    return value
  }

  // For numeric features
  return (value as number) > 0
}

export function canAccessTemplate(tier: UserTier, templateId: string): boolean {
  const templates = TIER_FEATURES[tier].templates as string[]
  return templates.includes(templateId)
}

export function canUseFeature(tier: UserTier, feature: string): boolean {
  const premiumOnlyFeatures = ["customDomain", "analytics", "seo"]
  if (premiumOnlyFeatures.includes(feature)) {
    return tier === "premium"
  }
  return true
}
