"use client"

import { Card } from "@/components/ui/card"
import { Eye, Users, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function AnalyticsPage() {
  // In a real implementation, we would fetch analytics data here
  const analyticsData = {
    views: 0,
    uniqueVisitors: 0,
    monthlyStats: [] as any[]
  }

  // Placeholder for plan check - assuming free for now or checking via hook
  const isFreePlan = true; // TODO: Check actual user plan

  if (isFreePlan) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">Track your portfolio performance</p>
        </div>

        <Card className="p-12 text-center border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Analytics are Premium Only</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Unlock detailed insights into your portfolio performance, visitor trends, and engagement metrics.
            </p>
            <button className="px-6 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold">
              Upgrade to Premium
            </button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your portfolio performance and visitor insights</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Views</p>
              <p className="text-3xl font-bold text-foreground">{analyticsData.views.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-primary/20" />
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Unique Visitors</p>
              <p className="text-3xl font-bold text-foreground">{analyticsData.uniqueVisitors}</p>
            </div>
            <Users className="w-8 h-8 text-accent/20" />
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Bounce Rate</p>
              <p className="text-3xl font-bold text-foreground">0%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500/20" />
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6 border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-6">Monthly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData.monthlyStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="var(--color-primary)" name="Views" strokeWidth={2} />
            <Line type="monotone" dataKey="visitors" stroke="var(--color-accent)" name="Visitors" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
