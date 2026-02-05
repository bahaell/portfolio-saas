"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import apiService, { ApiUser } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await apiService.getMe();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Fallback if user fetch failed (e.g. not logged in) - typically handled by middleware or redirect
  // For now we render the layout with empty/default data or redirect
  if (!user) {
    // In a real app we might redirect to login here if not handled by middleware
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userPlan={user.plan} />
      <div className="flex-1 flex flex-col ml-0 lg:ml-0">
        <Topbar user={user} />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
