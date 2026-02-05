import { DefaultSession, DefaultUser } from "next-auth";
import { PlanType } from "@/lib/config/plans";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            plan: PlanType;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        plan?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        plan: PlanType;
    }
}
