"use client"

import { usePlan } from "@/hooks/use-plan";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Assuming we have these or will fallback
import { PLANS, PlanType } from "@/lib/config/plans";

interface FeatureLockProps {
    feature: keyof typeof PLANS["FREE"];
    children: React.ReactNode;
    showLock?: boolean; // Force show lock or rely on permission
    fallback?: React.ReactNode; // What to show if locked (e.g., nothing, or a disabled version)
    className?: string; // Class for wrapper
}

export function FeatureLock({ feature, children, showLock, fallback, className }: FeatureLockProps) {
    const { canAccess, plan } = usePlan();
    const allowed = canAccess(feature);

    // If allowed, just render children
    if (allowed && !showLock) {
        return <>{children}</>;
    }

    // If not allowed, show lock overlay or fallback
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={cn("relative group cursor-not-allowed opacity-70", className)}>
                        {/* Render children but maybe disabled via CSS pointer-events */}
                        <div className="pointer-events-none select-none grayscale-[0.5]">
                            {children}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px] rounded-md">
                            <Lock className="w-5 h-5 text-muted-foreground" />
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Available on PRO plan</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
