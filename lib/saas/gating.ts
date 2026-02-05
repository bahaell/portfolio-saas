import { PLANS, PlanType } from "@/lib/config/plans";
import User, { IUser } from "@/models/User";
import Portfolio from "@/models/Portfolio";

/**
 * Check if a plan has access to a specific feature.
 * @param plan User's plan
 * @param feature Key of the feature in PlanFeatures
 */
export function canAccessFeature(plan: PlanType, feature: keyof typeof PLANS["FREE"]): boolean {
    const planConfig = PLANS[plan] || PLANS["FREE"];
    return !!planConfig[feature];
}

/**
 * Check if a user can create a new portfolio based on their plan limits.
 * @param userId User's ID
 * @returns { Promise<{ allowed: boolean, max: number, current: number }> }
 */
export async function checkPortfolioLimit(userId: string) {
    const user = await User.findById(userId).lean() as IUser | null;
    if (!user) return { allowed: false, max: 0, current: 0 };

    const planConfig = PLANS[user.plan as PlanType] || PLANS["FREE"];
    const currentCount = await Portfolio.countDocuments({ userId });

    return {
        allowed: currentCount < planConfig.maxPortfolios,
        max: planConfig.maxPortfolios,
        current: currentCount
    };
}

/**
 * Verify if a template is allowed for the user's plan.
 * @param plan User's plan
 * @param isPremiumTemplate Whether the template is premium
 */
export function canUseTemplate(plan: PlanType, isPremiumTemplate: boolean): boolean {
    if (!isPremiumTemplate) return true;
    return canAccessFeature(plan, "premiumTemplates");
}
