"use client"

import { useSession } from "next-auth/react";
import { PLANS, PlanType } from "@/lib/config/plans";

export function usePlan() {
    const { data: session } = useSession();

    // Default to FREE if no session or no plan
    const planName = (session?.user?.plan || "FREE") as PlanType;
    const planConfig = PLANS[planName] || PLANS["FREE"];

    const canAccess = (feature: keyof typeof PLANS["FREE"]) => {
        return !!planConfig[feature];
    };

    const getLimit = (feature: keyof typeof PLANS["FREE"]) => {
        return planConfig[feature];
    };

    return {
        plan: planName,
        features: planConfig,
        canAccess,
        getLimit,
        isLoading: !session,
    };
}
