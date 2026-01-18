import type { User } from "@/lib/mock-data"

interface WelcomeSectionProps {
  user: User
}

export function WelcomeSection({ user }: WelcomeSectionProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.name.split(" ")[0]}! 👋</h1>
      <p className="text-muted-foreground text-lg">
        Manage your portfolios, track performance, and publish your work to the world.
      </p>
    </div>
  )
}
