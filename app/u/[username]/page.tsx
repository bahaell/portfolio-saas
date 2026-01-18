// import { publicPortfolios } from "@/lib/public-mock-data"
// import { ClassicProTemplate } from "@/components/public/templates/classic-pro"
// import { ModernVisualTemplate } from "@/components/public/templates/modern-visual"
// import type { PublicPortfolioData } from "@/lib/public-types"
import Link from "next/link"

interface Props {
  params: Promise<{ username: string }>
}

export default async function PortfolioPage(props: Props) {
  const params = await props.params
  // API integration for public portfolio view is pending backend support.
  // Currently disabling mock data.

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-2">Portfolio System</h1>
        <p className="text-muted-foreground mb-6">
          Public portfolio view for '{params.username}' is currently unavailable while we upgrade our systems.
        </p>
        <Link href="/dashboard/home" className="text-primary hover:underline text-sm">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
