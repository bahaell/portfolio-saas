import { Badge } from "@/components/ui/badge";
import { PlanType } from "@/lib/config/plans";
import { cn } from "@/lib/utils";

interface PlanBadgeProps {
    plan: PlanType;
    className?: string;
}

export function PlanBadge({ plan, className }: PlanBadgeProps) {
    return (
        <Badge
            variant={plan === "FREE" ? "outline" : "default"}
            className={cn(
                "font-semibold text-xs",
                plan === "PRO" && "bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white",
                plan === "ELITE" && "bg-gradient-to-r from-purple-600 to-pink-600 border-none text-white",
                className
            )}
        >
            {plan}
        </Badge>
    );
}
