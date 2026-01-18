import type React from "react"
import type { Metadata } from "next"
// import { publicPortfolios, publicUsers } from "@/lib/public-mock-data"
// import { PublicPortfolioHeader } from "@/components/public/header"
import { PublicPortfolioFooter } from "@/components/public/footer"

interface Props {
  params: Promise<{ username: string }>
  children: React.ReactNode
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  return {
    title: `${params.username} | Portfora`,
    description: "Portfora Portfolio",
  }
}

export default async function PublicPortfolioLayout(props: Props) {
  // Mock data removed. API integration pending.
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* <PublicPortfolioHeader portfolio={portfolio} /> */}
      <main className="flex-1">{props.children}</main>
      <PublicPortfolioFooter />
    </div>
  )
}
