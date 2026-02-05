export type PlanType = "FREE" | "PRO" | "ELITE";

export interface PlanFeatures {
    maxPortfolios: number;
    premiumTemplates: boolean;
    advancedCustomization: boolean; // Custom fonts, colors outside theme presets
    analytics: boolean;
    versioning: boolean;
    customDomain: boolean;
    branding: boolean; // true = Platform branding shown, false = removed
}

export const PLANS: Record<PlanType, PlanFeatures> = {
    FREE: {
        maxPortfolios: 1,
        premiumTemplates: false,
        advancedCustomization: false,
        analytics: false,
        versioning: false,
        customDomain: false,
        branding: true,
    },
    PRO: {
        maxPortfolios: 5,
        premiumTemplates: true,
        advancedCustomization: true,
        analytics: true,
        versioning: false,
        customDomain: false,
        branding: false,
    },
    ELITE: {
        maxPortfolios: Infinity,
        premiumTemplates: true,
        advancedCustomization: true,
        analytics: true,
        versioning: true,
        customDomain: true,
        branding: false,
    }
};

export const DEFAULT_PLAN: PlanType = "FREE";
